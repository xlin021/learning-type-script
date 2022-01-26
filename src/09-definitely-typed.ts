export {}

import { camelCase } from 'lodash'
// declare function camelCase(input:string): string
import qs from 'query-string'

const res = camelCase('hello typed')

qs.parse(`?key=12131`)
