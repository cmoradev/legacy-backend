import { Borders, Workbook } from 'exceljs';
import * as Excel from 'exceljs';
import { getDaysArray } from '../../../common/date';
import { ListQuery } from '../types/listQuery';

export async function reportInscriptionList(resultData: ListQuery, options: { year: number, month: number }): Promise<string | any> {
        const days = getDaysArray(options.year, options.month, 'es');
        const workbook = new Excel.Workbook();
        workbook.views = [
            {
                x: 0, y: 0, width: 10000, height: 20000,
                firstSheet: 0, activeTab: 2, visibility: 'visible',
            },
        ];
        resultData.classroom.forEach(group => {
                const groupSheet = workbook.addWorksheet(group.name, {
                    properties:
                        {
                            tabColor: {
                                argb: '359c5b',
                            },
                        },
                });
                const bussinessNameCell = groupSheet.getCell('C2');
                const reportTypeCell = groupSheet.getCell('C3');
                const dateRangeCell = groupSheet.getCell('C4');
                const dateOfIssueCell = groupSheet.getCell('C5');

                const borders = {
                    right: { style: 'thin' },
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                };

                bussinessNameCell.value = resultData.branchOffice.name;
                reportTypeCell.value = 'Listado de alumnos '+ resultData.name;
                dateOfIssueCell.value = 'Grupo ' + group.name;

                ['C2', 'C3', 'C4', 'C5'].map(key => {
                    groupSheet.getCell(key).style = { alignment: { horizontal: 'center' } };
                    if (key === 'C2') {
                        groupSheet.getCell(key).border = {
                            top: { style: 'thin' },
                            left: { style: 'thin' },
                            right: { style: 'thin' },
                        };
                    } else {
                        groupSheet.getCell(key).border = {
                            right: { style: 'thin' },
                            top: { style: 'thin' },
                            bottom: { style: 'thin' },
                            left: { style: 'thin' },
                        };
                    }
                });
                dateOfIssueCell.border = {
                    left: { style: 'thin' },
                    right: { style: 'thin' },
                    bottom: { style: 'thin' },
                };

                const rows = [['', '', '', ''], ['', '', '', '']];
                let lengthDays = 0;
                for (const day of days) {
                    if (day.day !== 'Domingo' && day.day !== 'Sabado') {
                        rows[0].push(day.day.charAt(0));
                        rows[1].push(day.dayNum);
                        lengthDays++;
                    } else if (day.day === 'Domingo') {
                        rows[0].push('');
                        rows[1].push('');
                        lengthDays++;
                    }
                }
                const headers = ['No', 'MATRICULA', 'NOMBRE'];
                groupSheet.spliceRows(13, 0, rows[0]);
                groupSheet.spliceRows(14, 0, rows[1]);
                groupSheet.spliceRows(15, 0, headers);
                const start = 16;
                group.students.forEach((student, i) => {
                    const dataStudent = Object.values(student);
                    groupSheet.spliceRows(start + i, 0, dataStudent);
                });
                const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'AA', 'AB', 'AC', 'AD', 'AE', 'AF', 'AG', 'AH', 'AI', 'AJ', 'AK', 'AL', 'AM', 'AN', 'AO', 'AP', 'AQ', 'AR', 'AS', 'AT', 'AU'];
                const horizontal = 5 + lengthDays;

                const verticalEnd = 13 + 3 + group.students.length;
                const dynamicKeys = Array.from(Array(horizontal + 1).keys());
                dynamicKeys.map((colNumber, index) => {
                    if (colNumber === 1 || colNumber >= 4 && colNumber <= horizontal) {
                        groupSheet.getColumn(colNumber).width = 3;
                    }
                    if (colNumber > 1 && colNumber <= 3) {
                        if (colNumber === 3) {
                            groupSheet.getColumn(colNumber).width = 40;
                        } else {
                            groupSheet.getColumn(colNumber).width = 15;
                        }
                    }
                });
                for (let i = 0; i < horizontal; i++) {
                    const letter = letters[i];
                    for (let j = 13; j < verticalEnd; j++) {
                        const key = letter + '' + j;
                        groupSheet.getCell(key).border = {
                            right: { style: 'thin' },
                            top: { style: 'thin' },
                            bottom: { style: 'thin' },
                            left: { style: 'thin' },
                        };

                        if (i >= 0 && i <= 3 && j === 15) {
                            groupSheet.getCell(key).style = {
                                border: borders as Partial<Borders>,
                                alignment: { horizontal: 'center' },
                                font: {
                                    name: 'Calibri',
                                    color: { argb: 'FFFFFF' },
                                    size: 14,
                                },
                                fill: {
                                    type: 'pattern',
                                    pattern: 'solid',
                                    fgColor: { argb: '1E88E5' },
                                    bgColor: { argb: '1E88E5' },
                                },
                            };
                        }

                        if (i >= 3 && i <= horizontal && j === 13) {
                            groupSheet.getCell(key).style = {
                                border: borders as Partial<Borders>,
                                alignment: { horizontal: 'center' },
                                font: {
                                    name: 'Calibri',
                                    color: { argb: 'FFFFFF' },
                                    size: 14,
                                },
                                fill: {
                                    type: 'pattern',
                                    pattern: 'solid',
                                    fgColor: { argb: '1E88E5' },
                                    bgColor: { argb: '1E88E5' },
                                },
                            };
                        }
                    }
                }

            });


        const result = await workbook.xlsx.writeBuffer({
                filename: (+new Date()).toString() + '.xlsx',
            },
        );
        const buffer = Buffer.from(result);
        const b64Encoding = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,';
        return b64Encoding + buffer.toString('base64');
    }

