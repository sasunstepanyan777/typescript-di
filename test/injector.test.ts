import { expect } from "chai";

import { Injector } from "../src/Injector";
import { Injectable } from "../src/injectable";

// Fixtures
@Injectable()
export class Service1 {}

@Injectable()
export class Service2 {
  constructor(public service1: Service1) {}
}

@Injectable()
export class Example {
  constructor(public service1: Service1, public service2: Service2) {}
}

@Injectable()
export class ExtendedExample {
  constructor(public example: Example) {}
}

describe("Injector", () => {
  it("should create simple instances", () => {
    let service1 = Injector.resolve<Service1>(Service1);
    expect(service1).to.be.an.instanceof(Service1);
  });

  it("should create dependency injected instances", () => {
    let example = Injector.resolve<Example>(Example);
    expect(example.service1).to.be.an.instanceof(Service1);
    expect(example.service2).to.be.an.instanceof(Service2);
  });

  it("should create deep dependency injected instances", () => {
    let extendedExample = Injector.resolve<ExtendedExample>(ExtendedExample);
    expect(extendedExample.example).to.be.an.instanceof(Example);
    expect(extendedExample.example.service1).to.be.an.instanceof(Service1);
    expect(extendedExample.example.service2).to.be.an.instanceof(Service2);
  });
});
