import { timboxApi } from "../../../../../api/timboxApi";

interface RespuestaURLApi {
  ok?: boolean;
  data?: {
    url?: string;
  };
}

export async function solicitarURLApi(clave: string): Promise<string | null> {
  const { data } = await timboxApi.get<RespuestaURLApi>(
    `/solicitud-url/${encodeURIComponent(clave)}`
  );
  const url = data.data?.url?.trim();

  return data.ok && url ? url : null;
}
