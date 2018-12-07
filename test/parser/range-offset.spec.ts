import {ParserWithCaching} from "../../src/parser/ParserWithCaching";
import {absoluteCellAddress, relativeCellAddress} from "../../src/Cell";
import {AstNodeType, CellRangeAst, CellReferenceAst, ErrorAst, ParsingErrorType} from "../../src/parser/Ast";

describe('Parser - range offset', () => {
  it('OFFSET - usage with range', () => {
    const parser = new ParserWithCaching('parser')

    const ast = parser.parse('=A1:OFFSET(A1; 1; 1; 1; 1)', absoluteCellAddress(0, 0)).ast as CellRangeAst
    const ast2 = parser.parse('=OFFSET(A1; 1; 1; 1; 1):OFFSET(B2; 1; 1; 1; 1)', absoluteCellAddress(0, 0)).ast as CellRangeAst
    const ast3 = parser.parse('=OFFSET(A1; 1; 1; 1; 1):B3', absoluteCellAddress(0, 0)).ast as CellRangeAst
    expect(ast.type).toBe(AstNodeType.CELL_RANGE)
    expect(ast2.type).toBe(AstNodeType.CELL_RANGE)
    expect(ast3.type).toBe(AstNodeType.CELL_RANGE)
  })

  it('OFFSET - range offset not allowed', () => {
    const parser = new ParserWithCaching('parser')

    const ast = parser.parse('=A1:OFFSET(B2; 0; 0; 2; 2)', absoluteCellAddress(0, 0)).ast as ErrorAst
    const ast2 = parser.parse('=OFFSET(A1;0;0;2;2):A2', absoluteCellAddress(0, 0)).ast as ErrorAst
    expect(ast2.type).toBe(AstNodeType.ERROR)
    expect(ast2.args[0].type).toBe(ParsingErrorType.RangeOffsetNotAllowed)
  })
})