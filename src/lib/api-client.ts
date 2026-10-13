export interface ApiFailure {
  ok: false;
  status: number;
  code: string;
  /** 可以直接显示给用户的中文 */
  message: string;
  /** 错误响应里除 error 之外的字段，例如 unansweredCount */
  extra: Record<string, unknown>;
}

export interface ApiSuccess<T> {
  ok: true;
  status: number;
  data: T;
}

export type ApiResult<T> = ApiSuccess<T> | ApiFailure;

/** 浏览器里调用本站接口。网络错误和非 2xx 响应都转成 ApiFailure，不抛异常。 */
export async function api<T = unknown>(
  path: string,
  options: { method?: string; body?: unknown } = {},
): Promise<ApiResult<T>> {
  let response: Response;
  try {
    response = await fetch(path, {
      method: options.method ?? "GET",
      headers: options.body === undefined ? undefined : { "Content-Type": "application/json" },
      body: options.body === undefined ? undefined : JSON.stringify(options.body),
      credentials: "same-origin",
      cache: "no-store",
    });
  } catch {
    return {
      ok: false,
      status: 0,
      code: "network_error",
      message: "网络连接出了问题，请检查后重试",
      extra: {},
    };
  }

  const payload: unknown =
    response.status === 204 ? null : await response.json().catch(() => null);

  if (response.ok) return { ok: true, status: response.status, data: payload as T };

  const { error, ...extra } = (payload ?? {}) as {
    error?: { code?: string; message?: string };
  } & Record<string, unknown>;
  return {
    ok: false,
    status: response.status,
    code: error?.code ?? "unknown_error",
    message: error?.message ?? "操作没有成功，请稍后再试",
    extra,
  };
}
