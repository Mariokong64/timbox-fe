export const REQUISITOS_CONTRASENA =
  "Mínimo 8 caracteres, con mayúscula, minúscula, número y carácter especial.";

export function validarSeguridadContrasena(contrasena: string): string {
  if (contrasena.length > 150) {
    return "No debe superar 150 caracteres.";
  }

  const requisitosPendientes: string[] = [];

  if (contrasena.length < 8) {
    const faltantes = 8 - contrasena.length;
    requisitosPendientes.push(
      `${faltantes} ${faltantes === 1 ? "carácter" : "caracteres"} para alcanzar el mínimo`
    );
  }

  const tieneMayuscula = /\p{Lu}/u.test(contrasena);
  const tieneMinuscula = /\p{Ll}/u.test(contrasena);
  const tieneNumero = /\p{N}/u.test(contrasena);
  const tieneCaracterEspecial = /[\p{P}\p{S}]/u.test(contrasena);

  if (!tieneMayuscula) requisitosPendientes.push("una letra mayúscula");
  if (!tieneMinuscula) requisitosPendientes.push("una letra minúscula");
  if (!tieneNumero) requisitosPendientes.push("un número");
  if (!tieneCaracterEspecial) requisitosPendientes.push("un carácter especial");

  if (requisitosPendientes.length === 0) return "";

  const ultimoRequisito = requisitosPendientes.at(-1);
  const requisitosAnteriores = requisitosPendientes.slice(0, -1);
  const lista = requisitosAnteriores.length
    ? `${requisitosAnteriores.join(", ")} y ${ultimoRequisito}`
    : ultimoRequisito;

  return `Requisitos pendientes: ${lista}.`;
}
