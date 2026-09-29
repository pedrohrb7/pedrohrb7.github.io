import { currentSlide, fillTemplate, formatCounter, formatPosition } from "./carousel";

describe("currentSlide", () => {
  const slideOffsets = [0, 300, 600];

  it("is the slide nearest to the scroll position", () => {
    expect(currentSlide({ scrollLeft: 0, maxScrollLeft: 700, slideOffsets })).toBe(0);
    expect(currentSlide({ scrollLeft: 140, maxScrollLeft: 700, slideOffsets })).toBe(0);
    expect(currentSlide({ scrollLeft: 160, maxScrollLeft: 700, slideOffsets })).toBe(1);
    expect(currentSlide({ scrollLeft: 600, maxScrollLeft: 700, slideOffsets })).toBe(2);
  });

  it("is the last slide at the end of the track, even if it never reached the start", () => {
    // Narrow screen: the last slide starts at 600 but the track can only scroll to 540.
    expect(currentSlide({ scrollLeft: 540, maxScrollLeft: 540, slideOffsets })).toBe(2);
  });

  it("is 0 without slides", () => {
    expect(currentSlide({ scrollLeft: 0, maxScrollLeft: 0, slideOffsets: [] })).toBe(0);
  });
});

describe("formatPosition", () => {
  it("is 1-based and padded like the counter", () => {
    expect(formatPosition(0, 3)).toBe("01");
    expect(formatPosition(9, 120)).toBe("010");
  });
});

describe("formatCounter", () => {
  it("pads to at least two digits", () => {
    expect(formatCounter(0, 3)).toBe("01 / 03");
    expect(formatCounter(6, 12)).toBe("07 / 12");
  });

  it("pads to the width of the total", () => {
    expect(formatCounter(9, 120)).toBe("010 / 120");
  });
});

describe("fillTemplate", () => {
  it("replaces known placeholders and keeps unknown ones", () => {
    expect(fillTemplate("{n} de {total}", { n: 2, total: 3 })).toBe("2 de 3");
    expect(fillTemplate("Ir para {x}", { n: 1 })).toBe("Ir para {x}");
  });
});
