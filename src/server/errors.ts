/**
 * 业务规则被违反时抛出。code 是给程序看的稳定标识，message 是可以直接显示给用户的中文，
 * status 是对应的 HTTP 状态码。
 */
export class AppError extends Error {
  constructor(
    readonly code: string,
    message: string,
    readonly status: number,
    readonly extra?: Record<string, unknown>,
  ) {
    super(message);
    this.name = "AppError";
  }
}

export const notFound = (message = "内容不存在") => new AppError("not_found", message, 404);
