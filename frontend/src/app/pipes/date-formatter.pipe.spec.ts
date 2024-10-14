import { DateFormatterPipe } from "./date-formatter.pipe"

describe('test date formatter pipe',()=>{
  it('formats LocalDateString',()=>{
    const formatter = new DateFormatterPipe();
    const result = formatter.transform( [2024, 9, 29, 10, 49, 26, 443448000]);
    expect(result).toEqual("29.09.2024, 10:49:26")
  })
})
