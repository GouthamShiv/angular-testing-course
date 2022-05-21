import { TestBed } from "@angular/core/testing";
import { CalculatorService } from "./calculator.service";
import { LoggerService } from "./logger.service";

describe("CalculatorService", () => {
  let calculator: CalculatorService, loggerSpy: any;

  beforeEach(() => {
    console.log("Calling beforeEach()");

    loggerSpy = jasmine.createSpyObj("LoggerService", ["log"]);

    TestBed.configureTestingModule({
      providers: [
        CalculatorService,
        {
          provide: LoggerService,
          useValue: loggerSpy,
        },
      ],
    });

    calculator = TestBed.inject(CalculatorService);
  });

  it("should add two numbers", () => {
    console.log("Testing add()");

    const calculator = new CalculatorService(loggerSpy);
    const sum = calculator.add(2, 2);

    expect(sum).toBe(4);
    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  });

  it("should subtract two numbers", () => {
    console.log("Testing subtract()");

    const calculator = new CalculatorService(loggerSpy);
    const diff = calculator.subtract(2, 2);

    expect(diff).toBe(0, "unexpected subtraction result");
    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  });
});
