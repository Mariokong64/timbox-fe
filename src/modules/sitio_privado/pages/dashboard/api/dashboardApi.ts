import { apiPrivada } from "../../../api/apiPrivada";

const BASE_URL = "/dashboard";

export async function obtenerResumenDashboardApi(): Promise<unknown> {
  const { data } = await apiPrivada.get(`${BASE_URL}/resumen`);

  return data;
}
