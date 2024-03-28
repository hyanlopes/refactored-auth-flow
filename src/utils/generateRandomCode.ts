export const generateRandomCode = (): number => {
  let codigo: number = 0;
  for (let i = 0; i < 4; i++) {
    codigo = codigo * 10 + Math.floor(Math.random() * 10);
  }
  return codigo;
};
