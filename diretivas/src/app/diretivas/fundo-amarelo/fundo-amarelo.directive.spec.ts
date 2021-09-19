import { asNativeElements, ElementRef } from "@angular/core";
import { FundoAmareloDirective } from "./fundo-amarelo.directive";

describe('FundoAmareloDirective', () => {
  it('should create an instance', () => {
    const el = new ElementRef({})
    const directive = new FundoAmareloDirective(el);
    expect(directive).toBeTruthy();
  });
});
