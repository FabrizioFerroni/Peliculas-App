export function extraerErrores(obj: any): string[] {
  const err = obj.error.errors;

  let mensajesDeError: string[] = [];

  for (let llave in err) {
    let campo = llave;
    const mensajeConCampos = err[llave].map(
      (mensaje: string) => `${campo}: ${mensaje}`
    );
    mensajesDeError = mensajesDeError.concat(mensajeConCampos);
  }

  if (obj.error && typeof obj.error === 'object') {
    for (let llave in obj.error) {
      const mensajes = obj.error[llave];

      if (mensajes && typeof mensajes === 'string') {
        mensajesDeError = mensajesDeError.concat(`${mensajes}`);
      }
    }
  }

  return mensajesDeError;
}
