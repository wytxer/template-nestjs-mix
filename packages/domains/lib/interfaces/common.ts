// 文件接口
export interface IFile {
  fileName: string
  filePath: string
}

// 默认的常量枚举接口
export interface IConstValueNumber {
  label: string
  value: number
}

// 值为字符串的常量枚举接口
export interface IConstValue {
  label: string
  value: string
}
