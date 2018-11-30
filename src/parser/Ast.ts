import {CellAddress, CellDependency} from '../Cell'

export type Ast =
    NumberAst
    | StringAst
    | CellReferenceAst
    | CellRangeAst
    | MinusUnaryOpAst
    | EqualsOpAst
    | PlusOpAst
    | MinusOpAst
    | TimesOpAst
    | DivOpAst
    | ProcedureAst
    | ErrorAst

export interface ParsingError {
  type: ParsingErrorType,
  message: string
}

export enum ParsingErrorType {
  LexingError = 'LexingError',
  ParserError = 'ParsingError',
  StaticOffsetError = 'StaticOffsetError',
  StaticOffsetOutOfRangeError = 'StaticOffsetOutOfRangeError',
}

export enum AstNodeType {
  NUMBER = 'NUMBER',
  STRING = 'STRING',

  MINUS_UNARY_OP = 'MINUS_UNARY_OP',

  EQUALS_OP = 'EQUALS_OP',

  PLUS_OP = 'PLUS_OP',
  MINUS_OP = 'MINUS_OP',
  TIMES_OP = 'TIMES_OP',
  DIV_OP = 'DIV_OP',

  FUNCTION_CALL = 'FUNCTION_CALL',

  CELL_REFERENCE = 'CELL_REFERENCE',

  CELL_RANGE = 'CELL_RANGE',

  ERROR = 'ERROR',
}

export interface NumberAst {
  type: AstNodeType.NUMBER,
  value: number,
}

export const buildNumberAst = (value: number): NumberAst => ({type: AstNodeType.NUMBER, value})

export interface StringAst {
  type: AstNodeType.STRING,
  value: string,
}
export const buildStringAst = (value: string): StringAst => ({type: AstNodeType.STRING, value})

export interface CellReferenceAst {
  type: AstNodeType.CELL_REFERENCE,
  reference: CellAddress
}
export const buildCellReferenceAst = (reference: CellAddress): CellReferenceAst => ({
  type: AstNodeType.CELL_REFERENCE,
  reference,
})

export interface CellRangeAst {
  type: AstNodeType.CELL_RANGE,
  start: CellAddress,
  end: CellAddress
}

export const buildCellRangeAst = (start: CellAddress, end: CellAddress): CellRangeAst => ({type: AstNodeType.CELL_RANGE, start, end})

export interface BinaryOpAst {
  left: Ast,
  right: Ast,
}

export interface EqualsOpAst extends BinaryOpAst {
  type: AstNodeType.EQUALS_OP
}

export const buildEqualsOpAst = (left: Ast, right: Ast): EqualsOpAst => ({
  type: AstNodeType.EQUALS_OP,
  left,
  right,
})

export interface PlusOpAst extends BinaryOpAst {
  type: AstNodeType.PLUS_OP,
}

export const buildPlusOpAst = (left: Ast, right: Ast): PlusOpAst => ({
  type: AstNodeType.PLUS_OP,
  left,
  right,
})

export interface MinusOpAst extends BinaryOpAst {
  type: AstNodeType.MINUS_OP,
}

export const buildMinusOpAst = (left: Ast, right: Ast): MinusOpAst => ({
  type: AstNodeType.MINUS_OP,
  left,
  right,
})

export interface MinusUnaryOpAst {
  type: AstNodeType.MINUS_UNARY_OP,
  value: Ast,
}

export const buildMinusUnaryOpAst = (value: Ast): MinusUnaryOpAst => ({
  type: AstNodeType.MINUS_UNARY_OP,
  value,
})

export interface TimesOpAst extends BinaryOpAst {
  type: AstNodeType.TIMES_OP,
}

export const buildTimesOpAst = (left: Ast, right: Ast): TimesOpAst => ({
  type: AstNodeType.TIMES_OP,
  left,
  right,
})

export interface DivOpAst extends BinaryOpAst {
  type: AstNodeType.DIV_OP,
}

export const buildDivOpAst = (left: Ast, right: Ast): DivOpAst => ({
  type: AstNodeType.DIV_OP,
  left,
  right,
})

export interface ProcedureAst {
  type: AstNodeType.FUNCTION_CALL,
  procedureName: string,
  args: Ast[]
}

export const buildProcedureAst = (procedureName: string, args: Ast[]): ProcedureAst => ({
  type: AstNodeType.FUNCTION_CALL,
  procedureName,
  args,
})

export interface ErrorAst {
  type: AstNodeType.ERROR,
  args: ParsingError[]
}

export const buildErrorAst = (args: ParsingError[]): ErrorAst => ({type: AstNodeType.ERROR, args})
