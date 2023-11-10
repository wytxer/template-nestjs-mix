import type { Request } from 'express'
import type { IncomingMessage } from 'http'
import type { ReqId } from 'pino-http'
import type { Params } from 'nestjs-pino'
import * as moment from 'moment'
import { v4 } from 'uuid'
import { multistream } from 'pino'

import { IS_ONLINE } from 'helpers'

export const loggerOptions: Params = {
  pinoHttp: [
    {
      // https://getpino.io/#/docs/api?id=timestamp-boolean-function
      quietReqLogger: true,
      timestamp: () => `,"time":"${moment().format('YYYY-MM-DD HH:mm:ss')}"`,
      genReqId: (req: IncomingMessage): ReqId => (<Request>req).header('X-Request-Id') || v4(),
      ...(IS_ONLINE
        ? {}
        : {
            // https://github.com/pinojs/pino-pretty
            level: 'debug',
            transport: {
              target: 'pino-pretty',
              options: { sync: true, singleLine: true }
            }
          })
      /**
       * 将日志输出到指定文件
       * @link https://getpino.io/#/docs/api?id=pino-destination
       */
      // stream: destination({
      //   dest: `./logs/${moment().format('YYYY-MM-DD')}.log`,
      //   minLength: 4096,
      //   mkdir: true,
      //   sync: false
      // })
    },
    // https://getpino.io/#/docs/help?id=log-to-different-streams
    multistream(
      [
        { level: 'debug', stream: process.stdout },
        { level: 'error', stream: process.stderr },
        { level: 'fatal', stream: process.stderr }
      ],
      { dedupe: true }
    )
  ]
}
