declare module 'pubchem' {
  declare class Compound {
    public static fromSmiles(smiles: string): Promise<Compound>;
    public getData: any;
  }
}
