export const cobrosCiclo5 = [
    {
        "id": 5075,
        "createdAt": "2020-12-09 11:38:40",
        "updatedAt": "2020-12-09 11:38:52",
        "version": 1,
        "uuid": "bd97a9a0-6b0c-11eb-872a-436f754c1e4c",
        "folio": "NTKBCR-5075",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 567
        },
        "chargesDetails": [
            {
                "id": 7733,
                "createdAt": "2020-12-09 11:38:40",
                "updatedAt": "2020-12-09 11:38:40",
                "version": 1,
                "uuid": "bdd86950-6b0c-11eb-be8f-cf9ccbbaf545",
                "codeConcept": "86121601",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n o Reinscripci\u00f3n Preparatoria",
                "quantity": 1,
                "price": 1330,
                "schoolCharge": {
                    "id": 5075
                },
                "schoolPlanPayment": {
                    "id": 13672
                }
            },
            {
                "id": 7734,
                "createdAt": "2020-12-09 11:38:40",
                "updatedAt": "2020-12-09 11:38:40",
                "version": 1,
                "uuid": "bdd86df0-6b0c-11eb-92cc-957b89b6bd98",
                "codeConcept": "86121601",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota Seyc",
                "quantity": 1,
                "price": 200,
                "schoolCharge": {
                    "id": 5075
                },
                "schoolPlanPayment": {
                    "id": 13673
                }
            },
            {
                "id": 7735,
                "createdAt": "2020-12-09 11:38:40",
                "updatedAt": "2020-12-09 11:38:40",
                "version": 1,
                "uuid": "bdd87240-6b0c-11eb-bb20-a1ddbce89b7c",
                "codeConcept": "86121601",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para Padres",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5075
                },
                "schoolPlanPayment": {
                    "id": 13684
                }
            },
            {
                "id": 7736,
                "createdAt": "2020-12-09 11:38:40",
                "updatedAt": "2020-12-09 11:38:40",
                "version": 1,
                "uuid": "bdd87680-6b0c-11eb-9369-b152c853c81d",
                "codeConcept": "86121601",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5075
                },
                "schoolPlanPayment": {
                    "id": 13685
                }
            },
            {
                "id": 7737,
                "createdAt": "2020-12-09 11:38:40",
                "updatedAt": "2020-12-09 11:38:40",
                "version": 1,
                "uuid": "bdd87ab0-6b0c-11eb-a782-53f875e5ffbb",
                "codeConcept": "86121601",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de Orfandad",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5075
                },
                "schoolPlanPayment": {
                    "id": 13686
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2020-12-09 11:38:40",
                "updatedAt": "2020-12-09 11:38:52",
                "version": 1,
                "uuid": "bdd87d60-6b0c-11eb-95ce-7d9ef3265a69",
                "folio": "NTKBCR-5075",
                "change": 0,
                "quantity": 2530,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5075
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5081,
                        "createdAt": "2020-12-09 11:38:40",
                        "updatedAt": "2020-12-09 11:38:40",
                        "version": 1,
                        "uuid": "bdd88170-6b0c-11eb-8625-17026a06151b",
                        "codePaymentMethod": "03",
                        "quantity": 2530,
                        "date": "2020-12-09",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5367,
                        "createdAt": "2020-12-09 11:38:49",
                        "updatedAt": "2020-12-09 11:38:52",
                        "version": 1,
                        "folio": "ACAKMCR-5367",
                        "uuid": "04595B38-3A3D-11EB-BDFD-EDED6FA4B3EA",
                        "businessName": "DIEGO ROSADO GONZALEZ",
                        "rfc": "XAXX010101000",
                        "total": 2530,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5075
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5139,
        "createdAt": "2020-12-14 11:28:02",
        "updatedAt": "2020-12-14 11:29:16",
        "version": 1,
        "uuid": "bdd887f0-6b0c-11eb-8f8c-1fdf2e5e5fbb",
        "folio": "NTKBCR-5139",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 597
        },
        "chargesDetails": [
            {
                "id": 7801,
                "createdAt": "2020-12-14 11:28:02",
                "updatedAt": "2020-12-14 11:28:02",
                "version": 1,
                "uuid": "be1b12e0-6b0c-11eb-80dd-b96cc2bf18b3",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n primaria",
                "quantity": 1,
                "price": 1225,
                "schoolCharge": {
                    "id": 5139
                },
                "schoolPlanPayment": {
                    "id": 13720
                }
            },
            {
                "id": 7802,
                "createdAt": "2020-12-14 11:28:02",
                "updatedAt": "2020-12-14 11:28:02",
                "version": 1,
                "uuid": "be1b1890-6b0c-11eb-b2c1-81a8715405c4",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Primaria",
                "quantity": 1,
                "price": 160,
                "schoolCharge": {
                    "id": 5139
                },
                "schoolPlanPayment": {
                    "id": 13731
                }
            },
            {
                "id": 7803,
                "createdAt": "2020-12-14 11:28:02",
                "updatedAt": "2020-12-14 11:28:02",
                "version": 1,
                "uuid": "be1b1cf0-6b0c-11eb-be3c-4506a4532085",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5139
                },
                "schoolPlanPayment": {
                    "id": 13732
                }
            },
            {
                "id": 7804,
                "createdAt": "2020-12-14 11:28:02",
                "updatedAt": "2020-12-14 11:28:02",
                "version": 1,
                "uuid": "be1b2140-6b0c-11eb-af23-0708f365acdc",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Primaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5139
                },
                "schoolPlanPayment": {
                    "id": 13733
                }
            },
            {
                "id": 7805,
                "createdAt": "2020-12-14 11:28:02",
                "updatedAt": "2020-12-14 11:28:02",
                "version": 1,
                "uuid": "be1b2580-6b0c-11eb-a31e-814a35576d88",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Primaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5139
                },
                "schoolPlanPayment": {
                    "id": 13734
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2020-12-14 11:28:02",
                "updatedAt": "2020-12-14 11:29:16",
                "version": 1,
                "uuid": "be1b2840-6b0c-11eb-b95f-0f0c71468bf3",
                "folio": "NTKBCR-5139",
                "change": 0,
                "quantity": 2385,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5139
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5145,
                        "createdAt": "2020-12-14 11:28:02",
                        "updatedAt": "2020-12-14 11:28:02",
                        "version": 1,
                        "uuid": "be1b2c20-6b0c-11eb-80e1-21d2ceba76d9",
                        "codePaymentMethod": "03",
                        "quantity": 2385,
                        "date": "2020-12-14",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5433,
                        "createdAt": "2020-12-14 11:29:14",
                        "updatedAt": "2020-12-14 11:29:16",
                        "version": 1,
                        "folio": "ACAKMCR-5433",
                        "uuid": "81BB65C2-3E29-11EB-A6E8-F18C3665110E",
                        "businessName": "MICHELLE CRUZ MANJARREZ GILES",
                        "rfc": "CUGM8010269Z8",
                        "total": 2385,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5139
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5140,
        "createdAt": "2020-12-14 11:34:03",
        "updatedAt": "2020-12-14 11:34:13",
        "version": 1,
        "uuid": "be1b3240-6b0c-11eb-ae86-dfef2c58089e",
        "folio": "NTKBCR-5140",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 586
        },
        "chargesDetails": [
            {
                "id": 7806,
                "createdAt": "2020-12-14 11:34:03",
                "updatedAt": "2020-12-14 11:34:03",
                "version": 1,
                "uuid": "be5da1f0-6b0c-11eb-a5ee-c9e9f989cfd2",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "inscripci\u00f3n o Reinscripci\u00f3n Secundaria",
                "quantity": 1,
                "price": 970,
                "schoolCharge": {
                    "id": 5140
                },
                "schoolPlanPayment": {
                    "id": 13735
                }
            },
            {
                "id": 7807,
                "createdAt": "2020-12-14 11:34:03",
                "updatedAt": "2020-12-14 11:34:03",
                "version": 1,
                "uuid": "be5da8d0-6b0c-11eb-9e6c-93adb50deebd",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "CUOTA SEQ",
                "quantity": 1,
                "price": 200,
                "schoolCharge": {
                    "id": 5140
                },
                "schoolPlanPayment": {
                    "id": 13746
                }
            },
            {
                "id": 7808,
                "createdAt": "2020-12-14 11:34:03",
                "updatedAt": "2020-12-14 11:34:03",
                "version": 1,
                "uuid": "be5daea0-6b0c-11eb-94b3-ad9f380b2c2d",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "ESCUELA PARA PADRES",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5140
                },
                "schoolPlanPayment": {
                    "id": 13747
                }
            },
            {
                "id": 7809,
                "createdAt": "2020-12-14 11:34:03",
                "updatedAt": "2020-12-14 11:34:03",
                "version": 1,
                "uuid": "be5db390-6b0c-11eb-ac1e-635951958e51",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Secundaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5140
                },
                "schoolPlanPayment": {
                    "id": 13748
                }
            },
            {
                "id": 7810,
                "createdAt": "2020-12-14 11:34:03",
                "updatedAt": "2020-12-14 11:34:03",
                "version": 1,
                "uuid": "be5db8c0-6b0c-11eb-b7ca-e71f41b0e0dc",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Secundaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5140
                },
                "schoolPlanPayment": {
                    "id": 13749
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2020-12-14 11:34:03",
                "updatedAt": "2020-12-14 11:34:13",
                "version": 1,
                "uuid": "be5dbc40-6b0c-11eb-8da4-57609ca685ea",
                "folio": "NTKBCR-5140",
                "change": 0,
                "quantity": 2170,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5140
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5146,
                        "createdAt": "2020-12-14 11:34:03",
                        "updatedAt": "2020-12-14 11:34:03",
                        "version": 1,
                        "uuid": "be5dc0a0-6b0c-11eb-b997-613e4140a180",
                        "codePaymentMethod": "01",
                        "quantity": 2170,
                        "date": "2020-12-14",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 1
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5434,
                        "createdAt": "2020-12-14 11:34:11",
                        "updatedAt": "2020-12-14 11:34:13",
                        "version": 1,
                        "folio": "ACAKMCR-5434",
                        "uuid": "3292117A-3E2A-11EB-AE09-F1742F03EFDD",
                        "businessName": "SANTIAGO CABALLERO ZU\u00d1IGA",
                        "rfc": "XAXX010101000",
                        "total": 2170,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5140
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5141,
        "createdAt": "2020-12-14 11:53:27",
        "updatedAt": "2020-12-14 11:53:37",
        "version": 1,
        "uuid": "be5dc740-6b0c-11eb-a558-f30471930af3",
        "folio": "NTKBCR-5141",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 621
        },
        "chargesDetails": [
            {
                "id": 7811,
                "createdAt": "2020-12-14 11:53:27",
                "updatedAt": "2020-12-14 11:53:27",
                "version": 1,
                "uuid": "be9f3e80-6b0c-11eb-a2a4-df811c8a41d8",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "inscripci\u00f3n o Reinscripci\u00f3n Secundaria",
                "quantity": 1,
                "price": 970,
                "schoolCharge": {
                    "id": 5141
                },
                "schoolPlanPayment": {
                    "id": 13752
                }
            },
            {
                "id": 7812,
                "createdAt": "2020-12-14 11:53:27",
                "updatedAt": "2020-12-14 11:53:27",
                "version": 1,
                "uuid": "be9f42e0-6b0c-11eb-99bd-836728c7eb22",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "CUOTA SEQ",
                "quantity": 1,
                "price": 200,
                "schoolCharge": {
                    "id": 5141
                },
                "schoolPlanPayment": {
                    "id": 13763
                }
            },
            {
                "id": 7813,
                "createdAt": "2020-12-14 11:53:27",
                "updatedAt": "2020-12-14 11:53:27",
                "version": 1,
                "uuid": "be9f4620-6b0c-11eb-8243-f9b80f8d6d60",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "ESCUELA PARA PADRES",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5141
                },
                "schoolPlanPayment": {
                    "id": 13764
                }
            },
            {
                "id": 7814,
                "createdAt": "2020-12-14 11:53:27",
                "updatedAt": "2020-12-14 11:53:27",
                "version": 1,
                "uuid": "be9f48e0-6b0c-11eb-baa8-3391f53b17db",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Secundaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5141
                },
                "schoolPlanPayment": {
                    "id": 13765
                }
            },
            {
                "id": 7815,
                "createdAt": "2020-12-14 11:53:27",
                "updatedAt": "2020-12-14 11:53:27",
                "version": 1,
                "uuid": "be9f4b90-6b0c-11eb-9625-33fbd90b1426",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Secundaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5141
                },
                "schoolPlanPayment": {
                    "id": 13766
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2020-12-14 11:53:27",
                "updatedAt": "2020-12-14 11:53:37",
                "version": 1,
                "uuid": "be9f4e60-6b0c-11eb-8f80-e9b53c107446",
                "folio": "NTKBCR-5141",
                "change": 0,
                "quantity": 2170,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5141
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5147,
                        "createdAt": "2020-12-14 11:53:27",
                        "updatedAt": "2020-12-14 11:53:27",
                        "version": 1,
                        "uuid": "be9f5300-6b0c-11eb-8a33-71fd8a1d2d4b",
                        "codePaymentMethod": "01",
                        "quantity": 2170,
                        "date": "2020-12-14",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 1
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5435,
                        "createdAt": "2020-12-14 11:53:35",
                        "updatedAt": "2020-12-14 11:53:37",
                        "version": 1,
                        "folio": "ACAKMCR-5435",
                        "uuid": "E8738DD2-3E2C-11EB-BFE1-252464B32661",
                        "businessName": "MICHELLE DAYANA CABELLERO ZU\u00d1IGA",
                        "rfc": "XAXX010101000",
                        "total": 2170,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5141
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5142,
        "createdAt": "2020-12-14 11:56:27",
        "updatedAt": "2020-12-14 11:56:40",
        "version": 1,
        "uuid": "be9f5a50-6b0c-11eb-a0ef-3bc21d79a097",
        "folio": "NTKBCR-5142",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 621
        },
        "chargesDetails": [
            {
                "id": 7816,
                "createdAt": "2020-12-14 11:56:27",
                "updatedAt": "2020-12-14 11:56:27",
                "version": 1,
                "uuid": "bee0f900-6b0c-11eb-97b6-932fdd790696",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Prueba de Antidoping (Tercer grado)",
                "quantity": 1,
                "price": 200,
                "schoolCharge": {
                    "id": 5142
                },
                "schoolPlanPayment": {
                    "id": 13787
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2020-12-14 11:56:27",
                "updatedAt": "2020-12-14 11:56:40",
                "version": 1,
                "uuid": "bee0fd80-6b0c-11eb-bc95-2f4b892ce7b3",
                "folio": "NTKBCR-5142",
                "change": 0,
                "quantity": 200,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5142
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5148,
                        "createdAt": "2020-12-14 11:56:27",
                        "updatedAt": "2020-12-14 11:56:27",
                        "version": 1,
                        "uuid": "bee10270-6b0c-11eb-8231-5900d99a11c9",
                        "codePaymentMethod": "01",
                        "quantity": 200,
                        "date": "2020-12-14",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 1
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5436,
                        "createdAt": "2020-12-14 11:56:34",
                        "updatedAt": "2020-12-14 11:56:39",
                        "version": 1,
                        "folio": "ACAKMCR-5436",
                        "uuid": "555DE168-3E2D-11EB-89DF-775D55B39215",
                        "businessName": "MICHELLE DAYANA CABELLERO ZU\u00d1IGA",
                        "rfc": "XAXX010101000",
                        "total": 200,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5142
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5143,
        "createdAt": "2020-12-14 12:02:01",
        "updatedAt": "2020-12-14 12:02:11",
        "version": 1,
        "uuid": "bee10a30-6b0c-11eb-816c-ad596420153a",
        "folio": "NTKBCR-5143",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 424
        },
        "chargesDetails": [
            {
                "id": 7817,
                "createdAt": "2020-12-14 12:02:01",
                "updatedAt": "2020-12-14 12:02:01",
                "version": 1,
                "uuid": "bf2419c0-6b0c-11eb-99c6-d3d0825c1a1c",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "inscripci\u00f3n o Reinscripci\u00f3n Secundaria",
                "quantity": 1,
                "price": 1100,
                "schoolCharge": {
                    "id": 5143
                },
                "schoolPlanPayment": {
                    "id": 13702
                }
            },
            {
                "id": 7818,
                "createdAt": "2020-12-14 12:02:01",
                "updatedAt": "2020-12-14 12:02:01",
                "version": 1,
                "uuid": "bf241e30-6b0c-11eb-affc-5d9b2cdfc848",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "CUOTA SEQ",
                "quantity": 1,
                "price": 200,
                "schoolCharge": {
                    "id": 5143
                },
                "schoolPlanPayment": {
                    "id": 13713
                }
            },
            {
                "id": 7819,
                "createdAt": "2020-12-14 12:02:01",
                "updatedAt": "2020-12-14 12:02:01",
                "version": 1,
                "uuid": "bf242120-6b0c-11eb-a9f1-fdb5ecaf99f3",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "ESCUELA PARA PADRES",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5143
                },
                "schoolPlanPayment": {
                    "id": 13714
                }
            },
            {
                "id": 7820,
                "createdAt": "2020-12-14 12:02:01",
                "updatedAt": "2020-12-14 12:02:01",
                "version": 1,
                "uuid": "bf2423d0-6b0c-11eb-9566-7fe968314e95",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Secundaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5143
                },
                "schoolPlanPayment": {
                    "id": 13715
                }
            },
            {
                "id": 7821,
                "createdAt": "2020-12-14 12:02:01",
                "updatedAt": "2020-12-14 12:02:01",
                "version": 1,
                "uuid": "bf242660-6b0c-11eb-b7f3-eb9776d77db0",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Secundaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5143
                },
                "schoolPlanPayment": {
                    "id": 13716
                }
            },
            {
                "id": 7822,
                "createdAt": "2020-12-14 12:02:02",
                "updatedAt": "2020-12-14 12:02:02",
                "version": 1,
                "uuid": "bf242900-6b0c-11eb-bb7e-e3126ef37575",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Prueba de Antidoping (Tercer grado)",
                "quantity": 1,
                "price": 200,
                "schoolCharge": {
                    "id": 5143
                },
                "schoolPlanPayment": {
                    "id": 13717
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2020-12-14 12:02:01",
                "updatedAt": "2020-12-14 12:02:11",
                "version": 1,
                "uuid": "bf242ac0-6b0c-11eb-a7ec-35635fbdea90",
                "folio": "NTKBCR-5143",
                "change": 0,
                "quantity": 2500,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5143
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5149,
                        "createdAt": "2020-12-14 12:02:02",
                        "updatedAt": "2020-12-14 12:02:02",
                        "version": 1,
                        "uuid": "bf242d50-6b0c-11eb-91b9-4ffacbb586ae",
                        "codePaymentMethod": "01",
                        "quantity": 2500,
                        "date": "2020-12-14",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 1
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5437,
                        "createdAt": "2020-12-14 12:02:09",
                        "updatedAt": "2020-12-14 12:02:11",
                        "version": 1,
                        "folio": "ACAKMCR-5437",
                        "uuid": "1AB0DAEC-3E2E-11EB-B39A-EF19EC3FE43D",
                        "businessName": "JOSE IVAN MARTINEZ CASTILLO",
                        "rfc": "XAXX010101000",
                        "total": 2500,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5143
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5144,
        "createdAt": "2020-12-14 12:10:26",
        "updatedAt": "2020-12-14 12:10:39",
        "version": 1,
        "uuid": "bf243220-6b0c-11eb-a554-f52f5539d64d",
        "folio": "NTKBCR-5144",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 122
        },
        "chargesDetails": [
            {
                "id": 7823,
                "createdAt": "2020-12-14 12:10:26",
                "updatedAt": "2020-12-14 12:10:26",
                "version": 1,
                "uuid": "bf65d7c0-6b0c-11eb-8fbf-2b5b023311fe",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n primaria",
                "quantity": 1,
                "price": 700,
                "schoolCharge": {
                    "id": 5144
                },
                "schoolPlanPayment": {
                    "id": 13788
                }
            },
            {
                "id": 7824,
                "createdAt": "2020-12-14 12:10:26",
                "updatedAt": "2020-12-14 12:10:26",
                "version": 1,
                "uuid": "bf65dbf0-6b0c-11eb-ad5b-fbfa363706df",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Primaria",
                "quantity": 1,
                "price": 160,
                "schoolCharge": {
                    "id": 5144
                },
                "schoolPlanPayment": {
                    "id": 13799
                }
            },
            {
                "id": 7825,
                "createdAt": "2020-12-14 12:10:26",
                "updatedAt": "2020-12-14 12:10:26",
                "version": 1,
                "uuid": "bf65def0-6b0c-11eb-8745-2dd304e74991",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5144
                },
                "schoolPlanPayment": {
                    "id": 13800
                }
            },
            {
                "id": 7826,
                "createdAt": "2020-12-14 12:10:26",
                "updatedAt": "2020-12-14 12:10:26",
                "version": 1,
                "uuid": "bf65e200-6b0c-11eb-8378-8db5d80c6214",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Primaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5144
                },
                "schoolPlanPayment": {
                    "id": 13801
                }
            },
            {
                "id": 7827,
                "createdAt": "2020-12-14 12:10:27",
                "updatedAt": "2020-12-14 12:10:27",
                "version": 1,
                "uuid": "bf65e4b0-6b0c-11eb-b391-f9d7b6932efb",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Primaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5144
                },
                "schoolPlanPayment": {
                    "id": 13802
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2020-12-14 12:10:26",
                "updatedAt": "2020-12-14 12:10:39",
                "version": 1,
                "uuid": "bf65e670-6b0c-11eb-9cfb-d9d529d130f8",
                "folio": "NTKBCR-5144",
                "change": 0,
                "quantity": 1860,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5144
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5150,
                        "createdAt": "2020-12-14 12:10:27",
                        "updatedAt": "2020-12-14 12:10:27",
                        "version": 1,
                        "uuid": "bf65e930-6b0c-11eb-a8df-71d3c53e378f",
                        "codePaymentMethod": "03",
                        "quantity": 1860,
                        "date": "2020-12-14",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5438,
                        "createdAt": "2020-12-14 12:10:34",
                        "updatedAt": "2020-12-14 12:10:39",
                        "version": 1,
                        "folio": "ACAKMCR-5438",
                        "uuid": "49FE274A-3E2F-11EB-BC77-4B7295483202",
                        "businessName": "Gabriel Acevedo Noguez",
                        "rfc": "AENG800227KN7",
                        "total": 1860,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5144
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5146,
        "createdAt": "2020-12-14 12:15:14",
        "updatedAt": "2020-12-14 12:15:21",
        "version": 1,
        "uuid": "bf65ed00-6b0c-11eb-8bc7-331bdf49b38f",
        "folio": "NTKBCR-5146",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 630
        },
        "chargesDetails": [
            {
                "id": 7829,
                "createdAt": "2020-12-14 12:15:14",
                "updatedAt": "2020-12-14 12:15:14",
                "version": 1,
                "uuid": "bfa92540-6b0c-11eb-9fc8-01f28794d50b",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n primaria",
                "quantity": 1,
                "price": 1225,
                "schoolCharge": {
                    "id": 5146
                },
                "schoolPlanPayment": {
                    "id": 13769
                }
            },
            {
                "id": 7830,
                "createdAt": "2020-12-14 12:15:14",
                "updatedAt": "2020-12-14 12:15:14",
                "version": 1,
                "uuid": "bfa92c30-6b0c-11eb-958e-1de439211615",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Primaria",
                "quantity": 1,
                "price": 160,
                "schoolCharge": {
                    "id": 5146
                },
                "schoolPlanPayment": {
                    "id": 13780
                }
            },
            {
                "id": 7831,
                "createdAt": "2020-12-14 12:15:14",
                "updatedAt": "2020-12-14 12:15:14",
                "version": 1,
                "uuid": "bfa93240-6b0c-11eb-b95c-cfe24d898422",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5146
                },
                "schoolPlanPayment": {
                    "id": 13781
                }
            },
            {
                "id": 7832,
                "createdAt": "2020-12-14 12:15:14",
                "updatedAt": "2020-12-14 12:15:14",
                "version": 1,
                "uuid": "bfa93700-6b0c-11eb-85aa-49f00c4048cd",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Primaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5146
                },
                "schoolPlanPayment": {
                    "id": 13782
                }
            },
            {
                "id": 7833,
                "createdAt": "2020-12-14 12:15:14",
                "updatedAt": "2020-12-14 12:15:14",
                "version": 1,
                "uuid": "bfa93b50-6b0c-11eb-806f-df2a2b5b1e4a",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Primaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5146
                },
                "schoolPlanPayment": {
                    "id": 13783
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2020-12-14 12:15:14",
                "updatedAt": "2020-12-14 12:15:21",
                "version": 1,
                "uuid": "bfa93e80-6b0c-11eb-9ef3-a534eac88eda",
                "folio": "NTKBCR-5146",
                "change": 0,
                "quantity": 2385,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5146
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5152,
                        "createdAt": "2020-12-14 12:15:14",
                        "updatedAt": "2020-12-14 12:15:14",
                        "version": 1,
                        "uuid": "bfa941a0-6b0c-11eb-9b2d-b772d0d58163",
                        "codePaymentMethod": "03",
                        "quantity": 2385,
                        "date": "2020-12-14",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5440,
                        "createdAt": "2020-12-14 12:15:19",
                        "updatedAt": "2020-12-14 12:15:21",
                        "version": 1,
                        "folio": "ACAKMCR-5440",
                        "uuid": "F1A62718-3E2F-11EB-BA14-4DAF913306C4",
                        "businessName": "HOWARD SAAVEDRA MONROY",
                        "rfc": "SAMH7809186D6",
                        "total": 2385,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5146
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5147,
        "createdAt": "2020-12-14 12:28:44",
        "updatedAt": "2020-12-14 12:29:00",
        "version": 1,
        "uuid": "bfa945f0-6b0c-11eb-91c6-9d4d97ce1b1d",
        "folio": "NTKBCR-5147",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 581
        },
        "chargesDetails": [
            {
                "id": 7834,
                "createdAt": "2020-12-14 12:28:44",
                "updatedAt": "2020-12-14 12:28:44",
                "version": 1,
                "uuid": "c15745a0-6b0c-11eb-b65b-858705b18c45",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n preescolar",
                "quantity": 1,
                "price": 840,
                "schoolCharge": {
                    "id": 5147
                },
                "schoolPlanPayment": {
                    "id": 13805
                }
            },
            {
                "id": 7835,
                "createdAt": "2020-12-14 12:28:44",
                "updatedAt": "2020-12-14 12:28:44",
                "version": 1,
                "uuid": "c1574900-6b0c-11eb-819d-8dbc40f8800d",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Preescolar",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5147
                },
                "schoolPlanPayment": {
                    "id": 13816
                }
            },
            {
                "id": 7836,
                "createdAt": "2020-12-14 12:28:44",
                "updatedAt": "2020-12-14 12:28:44",
                "version": 1,
                "uuid": "c1574b80-6b0c-11eb-84a8-1b8b9864e4d9",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5147
                },
                "schoolPlanPayment": {
                    "id": 13817
                }
            },
            {
                "id": 7837,
                "createdAt": "2020-12-14 12:28:44",
                "updatedAt": "2020-12-14 12:28:44",
                "version": 1,
                "uuid": "c1574de0-6b0c-11eb-81cd-09d33c472a3f",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Preescolar",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5147
                },
                "schoolPlanPayment": {
                    "id": 13818
                }
            },
            {
                "id": 7838,
                "createdAt": "2020-12-14 12:28:44",
                "updatedAt": "2020-12-14 12:28:44",
                "version": 1,
                "uuid": "c1575050-6b0c-11eb-afbb-394c0cd6eb98",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Preescolar",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5147
                },
                "schoolPlanPayment": {
                    "id": 13821
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2020-12-14 12:28:44",
                "updatedAt": "2020-12-14 12:29:00",
                "version": 1,
                "uuid": "c15751f0-6b0c-11eb-affc-912f006c4e9b",
                "folio": "NTKBCR-5147",
                "change": 0,
                "quantity": 1990,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5147
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5153,
                        "createdAt": "2020-12-14 12:28:44",
                        "updatedAt": "2020-12-14 12:28:44",
                        "version": 1,
                        "uuid": "c1575460-6b0c-11eb-9682-a3defa7fe98f",
                        "codePaymentMethod": "03",
                        "quantity": 1990,
                        "date": "2020-12-14",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5441,
                        "createdAt": "2020-12-14 12:28:58",
                        "updatedAt": "2020-12-14 12:29:00",
                        "version": 1,
                        "folio": "ACAKMCR-5441",
                        "uuid": "D9F74A5A-3E31-11EB-B177-9773A574A336",
                        "businessName": "WALMER PACHECO GOMEZ",
                        "rfc": "XAXX010101000",
                        "total": 1990,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5147
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5148,
        "createdAt": "2020-12-14 12:44:09",
        "updatedAt": "2020-12-14 12:44:20",
        "version": 1,
        "uuid": "c1575800-6b0c-11eb-be8f-d594e48fdb12",
        "folio": "NTKBCR-5148",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 556
        },
        "chargesDetails": [
            {
                "id": 7839,
                "createdAt": "2020-12-14 12:44:09",
                "updatedAt": "2020-12-14 12:44:09",
                "version": 1,
                "uuid": "c198ff10-6b0c-11eb-8ce8-7f795813e058",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n primaria",
                "quantity": 1,
                "price": 1225,
                "schoolCharge": {
                    "id": 5148
                },
                "schoolPlanPayment": {
                    "id": 13822
                }
            },
            {
                "id": 7840,
                "createdAt": "2020-12-14 12:44:09",
                "updatedAt": "2020-12-14 12:44:09",
                "version": 1,
                "uuid": "c19902a0-6b0c-11eb-8a69-070b61d68a59",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Primaria",
                "quantity": 1,
                "price": 160,
                "schoolCharge": {
                    "id": 5148
                },
                "schoolPlanPayment": {
                    "id": 13833
                }
            },
            {
                "id": 7841,
                "createdAt": "2020-12-14 12:44:09",
                "updatedAt": "2020-12-14 12:44:09",
                "version": 1,
                "uuid": "c1990530-6b0c-11eb-bfcf-b3c21085eb28",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5148
                },
                "schoolPlanPayment": {
                    "id": 13834
                }
            },
            {
                "id": 7842,
                "createdAt": "2020-12-14 12:44:09",
                "updatedAt": "2020-12-14 12:44:09",
                "version": 1,
                "uuid": "c19907d0-6b0c-11eb-a56c-59018b368904",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Primaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5148
                },
                "schoolPlanPayment": {
                    "id": 13835
                }
            },
            {
                "id": 7843,
                "createdAt": "2020-12-14 12:44:09",
                "updatedAt": "2020-12-14 12:44:09",
                "version": 1,
                "uuid": "c1990a50-6b0c-11eb-aa4e-e19861960f8e",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Primaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5148
                },
                "schoolPlanPayment": {
                    "id": 13836
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2020-12-14 12:44:09",
                "updatedAt": "2020-12-14 12:44:20",
                "version": 1,
                "uuid": "c1990bf0-6b0c-11eb-b91a-2913486c1126",
                "folio": "NTKBCR-5148",
                "change": 0,
                "quantity": 2385,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5148
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5154,
                        "createdAt": "2020-12-14 12:44:09",
                        "updatedAt": "2020-12-14 12:44:09",
                        "version": 1,
                        "uuid": "c1990e60-6b0c-11eb-afb1-1963bbf56c63",
                        "codePaymentMethod": "03",
                        "quantity": 2385,
                        "date": "2020-12-14",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5442,
                        "createdAt": "2020-12-14 12:44:14",
                        "updatedAt": "2020-12-14 12:44:20",
                        "version": 1,
                        "folio": "ACAKMCR-5442",
                        "uuid": "FD619FB6-3E33-11EB-A80B-659FD46D4F57",
                        "businessName": "MANUEL ADRIAN GONZALEZ RODRIGUEZ",
                        "rfc": "GORM831220AS5",
                        "total": 2385,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5148
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5159,
        "createdAt": "2020-12-15 11:21:30",
        "updatedAt": "2020-12-15 11:21:39",
        "version": 1,
        "uuid": "c19911f0-6b0c-11eb-b51a-ffd956729efc",
        "folio": "NTKBCR-5159",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 459
        },
        "chargesDetails": [
            {
                "id": 7854,
                "createdAt": "2020-12-15 11:21:30",
                "updatedAt": "2020-12-15 11:21:30",
                "version": 1,
                "uuid": "c1d95240-6b0c-11eb-8719-ed51b2eedfab",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n preescolar",
                "quantity": 1,
                "price": 700,
                "schoolCharge": {
                    "id": 5159
                },
                "schoolPlanPayment": {
                    "id": 13873
                }
            },
            {
                "id": 7855,
                "createdAt": "2020-12-15 11:21:30",
                "updatedAt": "2020-12-15 11:21:30",
                "version": 1,
                "uuid": "c1d95600-6b0c-11eb-80bb-071925f3d7cd",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Preescolar",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5159
                },
                "schoolPlanPayment": {
                    "id": 13884
                }
            },
            {
                "id": 7856,
                "createdAt": "2020-12-15 11:21:30",
                "updatedAt": "2020-12-15 11:21:30",
                "version": 1,
                "uuid": "c1d958a0-6b0c-11eb-bd1d-f777de2d7b31",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5159
                },
                "schoolPlanPayment": {
                    "id": 13885
                }
            },
            {
                "id": 7857,
                "createdAt": "2020-12-15 11:21:30",
                "updatedAt": "2020-12-15 11:21:30",
                "version": 1,
                "uuid": "c1d95b30-6b0c-11eb-9c93-39e244873a47",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Preescolar",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5159
                },
                "schoolPlanPayment": {
                    "id": 13886
                }
            },
            {
                "id": 7858,
                "createdAt": "2020-12-15 11:21:30",
                "updatedAt": "2020-12-15 11:21:30",
                "version": 1,
                "uuid": "c1d95db0-6b0c-11eb-9dda-59138f212dc0",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Preescolar",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5159
                },
                "schoolPlanPayment": {
                    "id": 13887
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2020-12-15 11:21:30",
                "updatedAt": "2020-12-15 11:21:39",
                "version": 1,
                "uuid": "c1d95f60-6b0c-11eb-b76b-9f18eb210974",
                "folio": "NTKBCR-5159",
                "change": 0,
                "quantity": 1850,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5159
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5165,
                        "createdAt": "2020-12-15 11:21:30",
                        "updatedAt": "2020-12-15 11:21:30",
                        "version": 1,
                        "uuid": "c1d96200-6b0c-11eb-8d85-57d02549026c",
                        "codePaymentMethod": "03",
                        "quantity": 1850,
                        "date": "2020-12-15",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5453,
                        "createdAt": "2020-12-15 11:21:38",
                        "updatedAt": "2020-12-15 11:21:39",
                        "version": 1,
                        "folio": "ACAKMCR-5453",
                        "uuid": "9BFBB93C-3EF1-11EB-BD3D-B75B72296C28",
                        "businessName": "MARIA JOSE GARCIA CRUZ",
                        "rfc": "XAXX010101000",
                        "total": 1850,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5159
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5160,
        "createdAt": "2020-12-15 11:22:27",
        "updatedAt": "2020-12-15 11:22:34",
        "version": 1,
        "uuid": "c1d965b0-6b0c-11eb-87aa-51acebd17410",
        "folio": "NTKBCR-5160",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 458
        },
        "chargesDetails": [
            {
                "id": 7859,
                "createdAt": "2020-12-15 11:22:27",
                "updatedAt": "2020-12-15 11:22:27",
                "version": 1,
                "uuid": "c21b9880-6b0c-11eb-b3be-bf8e22b30daf",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "inscripci\u00f3n o Reinscripci\u00f3n Secundaria",
                "quantity": 1,
                "price": 770,
                "schoolCharge": {
                    "id": 5160
                },
                "schoolPlanPayment": {
                    "id": 13839
                }
            },
            {
                "id": 7860,
                "createdAt": "2020-12-15 11:22:27",
                "updatedAt": "2020-12-15 11:22:27",
                "version": 1,
                "uuid": "c21b9c70-6b0c-11eb-ab60-8b438bee7905",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "CUOTA SEQ",
                "quantity": 1,
                "price": 200,
                "schoolCharge": {
                    "id": 5160
                },
                "schoolPlanPayment": {
                    "id": 13850
                }
            },
            {
                "id": 7861,
                "createdAt": "2020-12-15 11:22:27",
                "updatedAt": "2020-12-15 11:22:27",
                "version": 1,
                "uuid": "c21b9f60-6b0c-11eb-8d6a-718ea7bea450",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "ESCUELA PARA PADRES",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5160
                },
                "schoolPlanPayment": {
                    "id": 13851
                }
            },
            {
                "id": 7862,
                "createdAt": "2020-12-15 11:22:27",
                "updatedAt": "2020-12-15 11:22:27",
                "version": 1,
                "uuid": "c21ba200-6b0c-11eb-9cf5-cf9d5f496f88",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Secundaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5160
                },
                "schoolPlanPayment": {
                    "id": 13852
                }
            },
            {
                "id": 7863,
                "createdAt": "2020-12-15 11:22:27",
                "updatedAt": "2020-12-15 11:22:27",
                "version": 1,
                "uuid": "c21ba4c0-6b0c-11eb-acbc-bf52876e99ef",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Secundaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5160
                },
                "schoolPlanPayment": {
                    "id": 13853
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2020-12-15 11:22:27",
                "updatedAt": "2020-12-15 11:22:34",
                "version": 1,
                "uuid": "c21ba680-6b0c-11eb-b338-013491ae5d4d",
                "folio": "NTKBCR-5160",
                "change": 0,
                "quantity": 1970,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5160
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5166,
                        "createdAt": "2020-12-15 11:22:27",
                        "updatedAt": "2020-12-15 11:22:27",
                        "version": 1,
                        "uuid": "c21ba960-6b0c-11eb-a557-0bff9d3dd3b9",
                        "codePaymentMethod": "03",
                        "quantity": 1970,
                        "date": "2020-12-15",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5454,
                        "createdAt": "2020-12-15 11:22:32",
                        "updatedAt": "2020-12-15 11:22:34",
                        "version": 1,
                        "folio": "ACAKMCR-5454",
                        "uuid": "BCBA0688-3EF1-11EB-A0F2-AF6095ABCEA5",
                        "businessName": "RAUL EMANUEL GARCIA CRUZ",
                        "rfc": "XAXX010101000",
                        "total": 1970,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5160
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5161,
        "createdAt": "2020-12-15 11:35:16",
        "updatedAt": "2020-12-15 11:35:26",
        "version": 1,
        "uuid": "c21bad10-6b0c-11eb-830a-3b3e13fb1059",
        "folio": "NTKBCR-5161",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 491
        },
        "chargesDetails": [
            {
                "id": 7864,
                "createdAt": "2020-12-15 11:35:16",
                "updatedAt": "2020-12-15 11:35:16",
                "version": 1,
                "uuid": "c261ee70-6b0c-11eb-beb8-f710fdfd3489",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n primaria",
                "quantity": 1,
                "price": 210,
                "schoolCharge": {
                    "id": 5161
                },
                "schoolPlanPayment": {
                    "id": 13908
                }
            },
            {
                "id": 7865,
                "createdAt": "2020-12-15 11:35:16",
                "updatedAt": "2020-12-15 11:35:16",
                "version": 1,
                "uuid": "c261f290-6b0c-11eb-9710-c1be1f6b138f",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Primaria",
                "quantity": 1,
                "price": 160,
                "schoolCharge": {
                    "id": 5161
                },
                "schoolPlanPayment": {
                    "id": 13919
                }
            },
            {
                "id": 7866,
                "createdAt": "2020-12-15 11:35:16",
                "updatedAt": "2020-12-15 11:35:16",
                "version": 1,
                "uuid": "c261f560-6b0c-11eb-b53b-59b25c4181eb",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5161
                },
                "schoolPlanPayment": {
                    "id": 13920
                }
            },
            {
                "id": 7867,
                "createdAt": "2020-12-15 11:35:16",
                "updatedAt": "2020-12-15 11:35:16",
                "version": 1,
                "uuid": "c261f7e0-6b0c-11eb-ab30-f9cf84e2ffea",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Primaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5161
                },
                "schoolPlanPayment": {
                    "id": 13921
                }
            },
            {
                "id": 7868,
                "createdAt": "2020-12-15 11:35:16",
                "updatedAt": "2020-12-15 11:35:16",
                "version": 1,
                "uuid": "c261fa70-6b0c-11eb-96f6-554d449c0190",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Primaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5161
                },
                "schoolPlanPayment": {
                    "id": 13922
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2020-12-15 11:35:16",
                "updatedAt": "2020-12-15 11:35:26",
                "version": 1,
                "uuid": "c261fc30-6b0c-11eb-8e7b-1525c65b03e2",
                "folio": "NTKBCR-5161",
                "change": 0,
                "quantity": 1370,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5161
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5167,
                        "createdAt": "2020-12-15 11:35:16",
                        "updatedAt": "2020-12-15 11:35:16",
                        "version": 1,
                        "uuid": "c261feb0-6b0c-11eb-a303-9da1631249f3",
                        "codePaymentMethod": "03",
                        "quantity": 1370,
                        "date": "2020-12-15",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5455,
                        "createdAt": "2020-12-15 11:35:24",
                        "updatedAt": "2020-12-15 11:35:26",
                        "version": 1,
                        "folio": "ACAKMCR-5455",
                        "uuid": "88C1C7CE-3EF3-11EB-848F-E9C3DFCABB6E",
                        "businessName": "IKER VALENTINO HERNANDEZ MARQUEZ",
                        "rfc": "XAXX010101000",
                        "total": 1370,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5161
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5162,
        "createdAt": "2020-12-15 11:38:47",
        "updatedAt": "2020-12-15 11:38:56",
        "version": 1,
        "uuid": "c2620250-6b0c-11eb-95fc-27a974419948",
        "folio": "NTKBCR-5162",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 492
        },
        "chargesDetails": [
            {
                "id": 7869,
                "createdAt": "2020-12-15 11:38:47",
                "updatedAt": "2020-12-15 11:38:47",
                "version": 1,
                "uuid": "c2a32920-6b0c-11eb-831f-272210433709",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n primaria",
                "quantity": 1,
                "price": 210,
                "schoolCharge": {
                    "id": 5162
                },
                "schoolPlanPayment": {
                    "id": 13925
                }
            },
            {
                "id": 7870,
                "createdAt": "2020-12-15 11:38:47",
                "updatedAt": "2020-12-15 11:38:47",
                "version": 1,
                "uuid": "c2a32d00-6b0c-11eb-ae4c-878c75ad1026",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Primaria",
                "quantity": 1,
                "price": 160,
                "schoolCharge": {
                    "id": 5162
                },
                "schoolPlanPayment": {
                    "id": 13936
                }
            },
            {
                "id": 7871,
                "createdAt": "2020-12-15 11:38:47",
                "updatedAt": "2020-12-15 11:38:47",
                "version": 1,
                "uuid": "c2a33020-6b0c-11eb-af22-0149de2bcfea",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5162
                },
                "schoolPlanPayment": {
                    "id": 13937
                }
            },
            {
                "id": 7872,
                "createdAt": "2020-12-15 11:38:47",
                "updatedAt": "2020-12-15 11:38:47",
                "version": 1,
                "uuid": "c2a33310-6b0c-11eb-a531-0338357b2318",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Primaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5162
                },
                "schoolPlanPayment": {
                    "id": 13938
                }
            },
            {
                "id": 7873,
                "createdAt": "2020-12-15 11:38:47",
                "updatedAt": "2020-12-15 11:38:47",
                "version": 1,
                "uuid": "c2a335a0-6b0c-11eb-9cfa-b19e1493a640",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Primaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5162
                },
                "schoolPlanPayment": {
                    "id": 13939
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2020-12-15 11:38:47",
                "updatedAt": "2020-12-15 11:38:56",
                "version": 1,
                "uuid": "c2a33780-6b0c-11eb-ba12-ad51b0cdbb1c",
                "folio": "NTKBCR-5162",
                "change": 0,
                "quantity": 1370,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5162
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5168,
                        "createdAt": "2020-12-15 11:38:47",
                        "updatedAt": "2020-12-15 11:38:47",
                        "version": 1,
                        "uuid": "c2a33a10-6b0c-11eb-96a7-dfc20bfcc9b2",
                        "codePaymentMethod": "03",
                        "quantity": 1370,
                        "date": "2020-12-15",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5456,
                        "createdAt": "2020-12-15 11:38:54",
                        "updatedAt": "2020-12-15 11:38:56",
                        "version": 1,
                        "folio": "ACAKMCR-5456",
                        "uuid": "05BA908A-3EF4-11EB-BCA1-7FB75A1184A1",
                        "businessName": "MATIAS ALEXANDER HERNANDEZ MARQUEZ",
                        "rfc": "XAXX010101000",
                        "total": 1370,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5162
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5163,
        "createdAt": "2020-12-15 12:08:41",
        "updatedAt": "2020-12-15 12:08:53",
        "version": 1,
        "uuid": "c2a33dd0-6b0c-11eb-b58f-41dbcbcbbe57",
        "folio": "NTKBCR-5163",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 443
        },
        "chargesDetails": [
            {
                "id": 7874,
                "createdAt": "2020-12-15 12:08:41",
                "updatedAt": "2020-12-15 12:08:41",
                "version": 1,
                "uuid": "c2e56f20-6b0c-11eb-974f-433759e00720",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "inscripci\u00f3n o Reinscripci\u00f3n Secundaria",
                "quantity": 1,
                "price": 1130.5,
                "schoolCharge": {
                    "id": 5163
                },
                "schoolPlanPayment": {
                    "id": 13976
                }
            },
            {
                "id": 7875,
                "createdAt": "2020-12-15 12:08:41",
                "updatedAt": "2020-12-15 12:08:41",
                "version": 1,
                "uuid": "c2e57290-6b0c-11eb-8cd8-17f53987c768",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "CUOTA SEQ",
                "quantity": 1,
                "price": 200,
                "schoolCharge": {
                    "id": 5163
                },
                "schoolPlanPayment": {
                    "id": 13987
                }
            },
            {
                "id": 7876,
                "createdAt": "2020-12-15 12:08:41",
                "updatedAt": "2020-12-15 12:08:41",
                "version": 1,
                "uuid": "c2e57500-6b0c-11eb-955b-db0119cb0ba1",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "ESCUELA PARA PADRES",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5163
                },
                "schoolPlanPayment": {
                    "id": 13988
                }
            },
            {
                "id": 7877,
                "createdAt": "2020-12-15 12:08:41",
                "updatedAt": "2020-12-15 12:08:41",
                "version": 1,
                "uuid": "c2e57770-6b0c-11eb-84a4-4da9dc5d15cb",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Secundaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5163
                },
                "schoolPlanPayment": {
                    "id": 13989
                }
            },
            {
                "id": 7878,
                "createdAt": "2020-12-15 12:08:41",
                "updatedAt": "2020-12-15 12:08:41",
                "version": 1,
                "uuid": "c2e579d0-6b0c-11eb-acab-43ee74d9f983",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Prueba de Antidoping (Tercer grado)",
                "quantity": 1,
                "price": 200,
                "schoolCharge": {
                    "id": 5163
                },
                "schoolPlanPayment": {
                    "id": 13990
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2020-12-15 12:08:41",
                "updatedAt": "2020-12-15 12:08:53",
                "version": 1,
                "uuid": "c2e57b70-6b0c-11eb-b42a-379d2470baa7",
                "folio": "NTKBCR-5163",
                "change": 0,
                "quantity": 2030.5,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5163
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5169,
                        "createdAt": "2020-12-15 12:08:42",
                        "updatedAt": "2020-12-15 12:08:42",
                        "version": 1,
                        "uuid": "c2e57de0-6b0c-11eb-a3fe-7b6b90a6d970",
                        "codePaymentMethod": "03",
                        "quantity": 2030.5,
                        "date": "2020-12-15",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5457,
                        "createdAt": "2020-12-15 12:08:48",
                        "updatedAt": "2020-12-15 12:08:53",
                        "version": 1,
                        "folio": "ACAKMCR-5457",
                        "uuid": "34E16B32-3EF8-11EB-B9B1-DD3AB0CFB1B2",
                        "businessName": "DIEGO HERNANDEZ CAMPOS",
                        "rfc": "XAXX010101000",
                        "total": 2030.5,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5163
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5164,
        "createdAt": "2020-12-15 12:12:26",
        "updatedAt": "2020-12-15 12:12:49",
        "version": 1,
        "uuid": "c2e58180-6b0c-11eb-806b-9174ea03319d",
        "folio": "NTKBCR-5164",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 634
        },
        "chargesDetails": [
            {
                "id": 7879,
                "createdAt": "2020-12-15 12:12:27",
                "updatedAt": "2020-12-15 12:12:27",
                "version": 1,
                "uuid": "c32948f0-6b0c-11eb-94ca-5581497470f9",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n primaria",
                "quantity": 1,
                "price": 735,
                "schoolCharge": {
                    "id": 5164
                },
                "schoolPlanPayment": {
                    "id": 13959
                }
            },
            {
                "id": 7880,
                "createdAt": "2020-12-15 12:12:27",
                "updatedAt": "2020-12-15 12:12:27",
                "version": 1,
                "uuid": "c3294cd0-6b0c-11eb-ac0c-9793920d9fd7",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Primaria",
                "quantity": 1,
                "price": 160,
                "schoolCharge": {
                    "id": 5164
                },
                "schoolPlanPayment": {
                    "id": 13970
                }
            },
            {
                "id": 7881,
                "createdAt": "2020-12-15 12:12:27",
                "updatedAt": "2020-12-15 12:12:27",
                "version": 1,
                "uuid": "c3294f90-6b0c-11eb-9099-cb18adb4f2bb",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5164
                },
                "schoolPlanPayment": {
                    "id": 13971
                }
            },
            {
                "id": 7882,
                "createdAt": "2020-12-15 12:12:27",
                "updatedAt": "2020-12-15 12:12:27",
                "version": 1,
                "uuid": "c3295230-6b0c-11eb-8606-3b6704b05c7e",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Primaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5164
                },
                "schoolPlanPayment": {
                    "id": 13972
                }
            },
            {
                "id": 7883,
                "createdAt": "2020-12-15 12:12:27",
                "updatedAt": "2020-12-15 12:12:27",
                "version": 1,
                "uuid": "c32954c0-6b0c-11eb-abdb-fdbb25df11b5",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Primaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5164
                },
                "schoolPlanPayment": {
                    "id": 13973
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2020-12-15 12:12:26",
                "updatedAt": "2020-12-15 12:12:49",
                "version": 1,
                "uuid": "c3295670-6b0c-11eb-ad71-4fe1253d8f8f",
                "folio": "NTKBCR-5164",
                "change": 0,
                "quantity": 1895,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5164
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5170,
                        "createdAt": "2020-12-15 12:12:27",
                        "updatedAt": "2020-12-15 12:12:27",
                        "version": 1,
                        "uuid": "c3295910-6b0c-11eb-af7b-e9f904b04bae",
                        "codePaymentMethod": "03",
                        "quantity": 1895,
                        "date": "2020-12-15",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5458,
                        "createdAt": "2020-12-15 12:12:47",
                        "updatedAt": "2020-12-15 12:12:49",
                        "version": 1,
                        "folio": "ACAKMCR-5458",
                        "uuid": "C1821CEE-3EF8-11EB-B9DD-1BE6F782DE4C",
                        "businessName": "EMMANUEL ALCANTARA EULOPA",
                        "rfc": "XAXX010101000",
                        "total": 1895,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5164
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5165,
        "createdAt": "2020-12-15 12:34:49",
        "updatedAt": "2020-12-15 12:35:00",
        "version": 1,
        "uuid": "c3295d20-6b0c-11eb-9429-dbddfb086ead",
        "folio": "NTKBCR-5165",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 505
        },
        "chargesDetails": [
            {
                "id": 7884,
                "createdAt": "2020-12-15 12:34:49",
                "updatedAt": "2020-12-15 12:34:49",
                "version": 1,
                "uuid": "c36bb9e0-6b0c-11eb-bda3-8b6af7094a74",
                "codeConcept": "86121601",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n o Reinscripci\u00f3n Preparatoria",
                "quantity": 1,
                "price": 1470,
                "schoolCharge": {
                    "id": 5165
                },
                "schoolPlanPayment": {
                    "id": 13890
                }
            },
            {
                "id": 7885,
                "createdAt": "2020-12-15 12:34:49",
                "updatedAt": "2020-12-15 12:34:49",
                "version": 1,
                "uuid": "c36bbf80-6b0c-11eb-90e0-7f2c8674d1b5",
                "codeConcept": "86121601",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota Seyc",
                "quantity": 1,
                "price": 200,
                "schoolCharge": {
                    "id": 5165
                },
                "schoolPlanPayment": {
                    "id": 13891
                }
            },
            {
                "id": 7886,
                "createdAt": "2020-12-15 12:34:49",
                "updatedAt": "2020-12-15 12:34:49",
                "version": 1,
                "uuid": "c36bc2c0-6b0c-11eb-81a9-dbcde02abb5a",
                "codeConcept": "86121601",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para Padres",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5165
                },
                "schoolPlanPayment": {
                    "id": 13902
                }
            },
            {
                "id": 7887,
                "createdAt": "2020-12-15 12:34:49",
                "updatedAt": "2020-12-15 12:34:49",
                "version": 1,
                "uuid": "c36bc570-6b0c-11eb-89f0-e7c50f0e2a97",
                "codeConcept": "86121601",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5165
                },
                "schoolPlanPayment": {
                    "id": 13903
                }
            },
            {
                "id": 7888,
                "createdAt": "2020-12-15 12:34:49",
                "updatedAt": "2020-12-15 12:34:49",
                "version": 1,
                "uuid": "c36bc820-6b0c-11eb-96c5-e7a5484d4fed",
                "codeConcept": "86121601",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de Orfandad",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5165
                },
                "schoolPlanPayment": {
                    "id": 13904
                }
            },
            {
                "id": 7889,
                "createdAt": "2020-12-15 12:34:49",
                "updatedAt": "2020-12-15 12:34:49",
                "version": 1,
                "uuid": "c36bcac0-6b0c-11eb-8f26-5b7af0625ca7",
                "codeConcept": "86121601",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Prueba de Antidoping",
                "quantity": 1,
                "price": 200,
                "schoolCharge": {
                    "id": 5165
                },
                "schoolPlanPayment": {
                    "id": 13905
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2020-12-15 12:34:49",
                "updatedAt": "2020-12-15 12:35:00",
                "version": 1,
                "uuid": "c36bcc80-6b0c-11eb-8287-0d414b4af42a",
                "folio": "NTKBCR-5165",
                "change": 0,
                "quantity": 2870,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5165
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5171,
                        "createdAt": "2020-12-15 12:34:49",
                        "updatedAt": "2020-12-15 12:34:49",
                        "version": 1,
                        "uuid": "c36bcf60-6b0c-11eb-8760-512c9514117e",
                        "codePaymentMethod": "03",
                        "quantity": 2870,
                        "date": "2020-12-15",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5459,
                        "createdAt": "2020-12-15 12:34:58",
                        "updatedAt": "2020-12-15 12:35:00",
                        "version": 1,
                        "folio": "ACAKMCR-5459",
                        "uuid": "DAE388FA-3EFB-11EB-83FC-05E5F336B5A8",
                        "businessName": "Jorge Hugo Rincon Moises",
                        "rfc": "RIMJ591222HM4",
                        "total": 2870,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5165
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5201,
        "createdAt": "2020-12-22 12:03:01",
        "updatedAt": "2020-12-22 12:03:58",
        "version": 1,
        "uuid": "c36bd3b0-6b0c-11eb-8596-311b218e4dc1",
        "folio": "NTKBCR-5201",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 489
        },
        "chargesDetails": [
            {
                "id": 7928,
                "createdAt": "2020-12-22 12:03:01",
                "updatedAt": "2020-12-22 12:03:01",
                "version": 1,
                "uuid": "c3aec060-6b0c-11eb-935a-edf5c6b163b7",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "inscripci\u00f3n o Reinscripci\u00f3n Secundaria",
                "quantity": 1,
                "price": 840,
                "schoolCharge": {
                    "id": 5201
                },
                "schoolPlanPayment": {
                    "id": 14009
                }
            },
            {
                "id": 7929,
                "createdAt": "2020-12-22 12:03:01",
                "updatedAt": "2020-12-22 12:03:01",
                "version": 1,
                "uuid": "c3aec430-6b0c-11eb-9b75-911a092e4686",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "CUOTA SEQ",
                "quantity": 1,
                "price": 200,
                "schoolCharge": {
                    "id": 5201
                },
                "schoolPlanPayment": {
                    "id": 14020
                }
            },
            {
                "id": 7930,
                "createdAt": "2020-12-22 12:03:01",
                "updatedAt": "2020-12-22 12:03:01",
                "version": 1,
                "uuid": "c3aec6f0-6b0c-11eb-bb8b-1733f0e99d58",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "ESCUELA PARA PADRES",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5201
                },
                "schoolPlanPayment": {
                    "id": 14021
                }
            },
            {
                "id": 7931,
                "createdAt": "2020-12-22 12:03:02",
                "updatedAt": "2020-12-22 12:03:02",
                "version": 1,
                "uuid": "c3aec990-6b0c-11eb-9616-d145c14c166a",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Secundaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5201
                },
                "schoolPlanPayment": {
                    "id": 14022
                }
            },
            {
                "id": 7932,
                "createdAt": "2020-12-22 12:03:02",
                "updatedAt": "2020-12-22 12:03:02",
                "version": 1,
                "uuid": "c3aecc70-6b0c-11eb-8477-f5198218c590",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Secundaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5201
                },
                "schoolPlanPayment": {
                    "id": 14023
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2020-12-22 12:03:01",
                "updatedAt": "2020-12-22 12:03:58",
                "version": 1,
                "uuid": "c3aece40-6b0c-11eb-b44e-1b90b3087c59",
                "folio": "NTKBCR-5201",
                "change": 0,
                "quantity": 2040,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5201
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5207,
                        "createdAt": "2020-12-22 12:03:02",
                        "updatedAt": "2020-12-22 12:03:02",
                        "version": 1,
                        "uuid": "c3aed0e0-6b0c-11eb-9a74-35f9bc9a639c",
                        "codePaymentMethod": "01",
                        "quantity": 2040,
                        "date": "2020-12-22",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 1
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5495,
                        "createdAt": "2020-12-22 12:03:56",
                        "updatedAt": "2020-12-22 12:03:58",
                        "version": 1,
                        "folio": "ACAKMCR-5495",
                        "uuid": "AE2D0C38-4477-11EB-B384-FDC929B53686",
                        "businessName": "ODRY CAMILA AVILA JIMENEZ",
                        "rfc": "XAXX010101000",
                        "total": 2040,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5201
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5202,
        "createdAt": "2020-12-22 12:08:55",
        "updatedAt": "2020-12-22 12:09:04",
        "version": 1,
        "uuid": "c3aed4c0-6b0c-11eb-936a-099d368717ea",
        "folio": "NTKBCR-5202",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 170
        },
        "chargesDetails": [
            {
                "id": 7933,
                "createdAt": "2020-12-22 12:08:56",
                "updatedAt": "2020-12-22 12:08:56",
                "version": 1,
                "uuid": "c3efe9c0-6b0c-11eb-bc21-e7ede33eed4a",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "inscripci\u00f3n o Reinscripci\u00f3n Secundaria",
                "quantity": 1,
                "price": 612.5,
                "schoolCharge": {
                    "id": 5202
                },
                "schoolPlanPayment": {
                    "id": 13942
                }
            },
            {
                "id": 7934,
                "createdAt": "2020-12-22 12:08:56",
                "updatedAt": "2020-12-22 12:08:56",
                "version": 1,
                "uuid": "c3efed20-6b0c-11eb-9296-db50fafba4ef",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "CUOTA SEQ",
                "quantity": 1,
                "price": 200,
                "schoolCharge": {
                    "id": 5202
                },
                "schoolPlanPayment": {
                    "id": 13953
                }
            },
            {
                "id": 7935,
                "createdAt": "2020-12-22 12:08:56",
                "updatedAt": "2020-12-22 12:08:56",
                "version": 1,
                "uuid": "c3efefa0-6b0c-11eb-998c-d57fa7b2a1ce",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "ESCUELA PARA PADRES",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5202
                },
                "schoolPlanPayment": {
                    "id": 13954
                }
            },
            {
                "id": 7936,
                "createdAt": "2020-12-22 12:08:56",
                "updatedAt": "2020-12-22 12:08:56",
                "version": 1,
                "uuid": "c3eff260-6b0c-11eb-8789-35ac3e539a68",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Secundaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5202
                },
                "schoolPlanPayment": {
                    "id": 13955
                }
            },
            {
                "id": 7937,
                "createdAt": "2020-12-22 12:08:56",
                "updatedAt": "2020-12-22 12:08:56",
                "version": 1,
                "uuid": "c3eff550-6b0c-11eb-8268-7b461009f3a0",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Secundaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5202
                },
                "schoolPlanPayment": {
                    "id": 13956
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2020-12-22 12:08:55",
                "updatedAt": "2020-12-22 12:09:04",
                "version": 1,
                "uuid": "c3eff710-6b0c-11eb-928d-f55d99a3e76f",
                "folio": "NTKBCR-5202",
                "change": 0,
                "quantity": 1812.5,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5202
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5208,
                        "createdAt": "2020-12-22 12:08:56",
                        "updatedAt": "2020-12-22 12:08:56",
                        "version": 1,
                        "uuid": "c3eff9a0-6b0c-11eb-a53a-79e857ba28e5",
                        "codePaymentMethod": "01",
                        "quantity": 1812.5,
                        "date": "2020-12-22",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 1
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5496,
                        "createdAt": "2020-12-22 12:09:02",
                        "updatedAt": "2020-12-22 12:09:04",
                        "version": 1,
                        "folio": "ACAKMCR-5496",
                        "uuid": "64711D0E-4478-11EB-99F6-7566CCC363DE",
                        "businessName": "VALERY CELESTE CAN HOIL",
                        "rfc": "XAXX010101000",
                        "total": 1812.5,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5202
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5203,
        "createdAt": "2020-12-22 12:30:20",
        "updatedAt": "2020-12-22 12:30:29",
        "version": 1,
        "uuid": "c3effd40-6b0c-11eb-99da-e96e4560c5b7",
        "folio": "NTKBCR-5203",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 606
        },
        "chargesDetails": [
            {
                "id": 7938,
                "createdAt": "2020-12-22 12:30:20",
                "updatedAt": "2020-12-22 12:30:20",
                "version": 1,
                "uuid": "c431c5e0-6b0c-11eb-a134-79e18a4c110a",
                "codeConcept": "86121601",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n o Reinscripci\u00f3n Preparatoria",
                "quantity": 1,
                "price": 210,
                "schoolCharge": {
                    "id": 5203
                },
                "schoolPlanPayment": {
                    "id": 14026
                }
            },
            {
                "id": 7939,
                "createdAt": "2020-12-22 12:30:20",
                "updatedAt": "2020-12-22 12:30:20",
                "version": 1,
                "uuid": "c431cab0-6b0c-11eb-9e61-cd401cb7ef17",
                "codeConcept": "86121601",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota Seyc",
                "quantity": 1,
                "price": 200,
                "schoolCharge": {
                    "id": 5203
                },
                "schoolPlanPayment": {
                    "id": 14027
                }
            },
            {
                "id": 7940,
                "createdAt": "2020-12-22 12:30:20",
                "updatedAt": "2020-12-22 12:30:20",
                "version": 1,
                "uuid": "c431cf80-6b0c-11eb-b567-cbeb52fb6c9f",
                "codeConcept": "86121601",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de Orfandad",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5203
                },
                "schoolPlanPayment": {
                    "id": 14041
                }
            },
            {
                "id": 7941,
                "createdAt": "2020-12-22 12:30:20",
                "updatedAt": "2020-12-22 12:30:20",
                "version": 1,
                "uuid": "c431d400-6b0c-11eb-bbb2-5f22587f5916",
                "codeConcept": "86121601",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Prueba de Antidoping",
                "quantity": 1,
                "price": 200,
                "schoolCharge": {
                    "id": 5203
                },
                "schoolPlanPayment": {
                    "id": 14038
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2020-12-22 12:30:20",
                "updatedAt": "2020-12-22 12:30:29",
                "version": 1,
                "uuid": "c431d6f0-6b0c-11eb-beab-d1cd67e719dd",
                "folio": "NTKBCR-5203",
                "change": 0,
                "quantity": 960,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5203
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5209,
                        "createdAt": "2020-12-22 12:30:20",
                        "updatedAt": "2020-12-22 12:30:20",
                        "version": 1,
                        "uuid": "c431db00-6b0c-11eb-b813-cd75b438e0b7",
                        "codePaymentMethod": "03",
                        "quantity": 960,
                        "date": "2020-12-22",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5497,
                        "createdAt": "2020-12-22 12:30:27",
                        "updatedAt": "2020-12-22 12:30:29",
                        "version": 1,
                        "folio": "ACAKMCR-5497",
                        "uuid": "627091C6-447B-11EB-8F7E-CBE1DA284016",
                        "businessName": "MARCOS TUYUB GALERA",
                        "rfc": "XAXX010101000",
                        "total": 960,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5203
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5204,
        "createdAt": "2020-12-22 12:37:31",
        "updatedAt": "2020-12-22 12:37:59",
        "version": 1,
        "uuid": "c431e140-6b0c-11eb-a8ae-95862602b221",
        "folio": "NTKBCR-5204",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 605
        },
        "chargesDetails": [
            {
                "id": 7942,
                "createdAt": "2020-12-22 12:37:31",
                "updatedAt": "2020-12-22 12:37:31",
                "version": 1,
                "uuid": "c5063c00-6b0c-11eb-8bf6-a7a01a0ac952",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n preescolar",
                "quantity": 1,
                "price": 210,
                "schoolCharge": {
                    "id": 5204
                },
                "schoolPlanPayment": {
                    "id": 14042
                }
            },
            {
                "id": 7943,
                "createdAt": "2020-12-22 12:37:31",
                "updatedAt": "2020-12-22 12:37:31",
                "version": 1,
                "uuid": "c5064120-6b0c-11eb-af19-0b2f5e057722",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Preescolar",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5204
                },
                "schoolPlanPayment": {
                    "id": 14043
                }
            },
            {
                "id": 7944,
                "createdAt": "2020-12-22 12:37:31",
                "updatedAt": "2020-12-22 12:37:31",
                "version": 1,
                "uuid": "c5064500-6b0c-11eb-8f0a-e35ab94a37e8",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Preescolar",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5204
                },
                "schoolPlanPayment": {
                    "id": 14044
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2020-12-22 12:37:31",
                "updatedAt": "2020-12-22 12:37:59",
                "version": 1,
                "uuid": "c5064820-6b0c-11eb-971a-a5be3d6ce15a",
                "folio": "NTKBCR-5204",
                "change": 0,
                "quantity": 710,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5204
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5210,
                        "createdAt": "2020-12-22 12:37:31",
                        "updatedAt": "2020-12-22 12:37:31",
                        "version": 1,
                        "uuid": "c5064c40-6b0c-11eb-a835-87af940d41ed",
                        "codePaymentMethod": "03",
                        "quantity": 710,
                        "date": "2020-12-22",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5498,
                        "createdAt": "2020-12-22 12:37:57",
                        "updatedAt": "2020-12-22 12:37:59",
                        "version": 1,
                        "folio": "ACAKMCR-5498",
                        "uuid": "6EC88DD8-447C-11EB-9341-B5CADCE80BEB",
                        "businessName": "BENJAMIN TUYUB GALERA",
                        "rfc": "XAXX010101000",
                        "total": 710,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5204
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5205,
        "createdAt": "2020-12-22 12:44:40",
        "updatedAt": "2020-12-22 12:44:55",
        "version": 1,
        "uuid": "c5065290-6b0c-11eb-9521-b78b74f4ce01",
        "folio": "NTKBCR-5205",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 448
        },
        "chargesDetails": [
            {
                "id": 7945,
                "createdAt": "2020-12-22 12:44:40",
                "updatedAt": "2020-12-22 12:44:40",
                "version": 1,
                "uuid": "c5472ef0-6b0c-11eb-a59c-a7e07324d096",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n primaria",
                "quantity": 1,
                "price": 1050,
                "schoolCharge": {
                    "id": 5205
                },
                "schoolPlanPayment": {
                    "id": 14057
                }
            },
            {
                "id": 7946,
                "createdAt": "2020-12-22 12:44:40",
                "updatedAt": "2020-12-22 12:44:40",
                "version": 1,
                "uuid": "c54734a0-6b0c-11eb-88d2-6f5f973fbd90",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Primaria",
                "quantity": 1,
                "price": 160,
                "schoolCharge": {
                    "id": 5205
                },
                "schoolPlanPayment": {
                    "id": 14068
                }
            },
            {
                "id": 7947,
                "createdAt": "2020-12-22 12:44:40",
                "updatedAt": "2020-12-22 12:44:40",
                "version": 1,
                "uuid": "c5473800-6b0c-11eb-ad7a-7f4ff298e0ea",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5205
                },
                "schoolPlanPayment": {
                    "id": 14069
                }
            },
            {
                "id": 7948,
                "createdAt": "2020-12-22 12:44:40",
                "updatedAt": "2020-12-22 12:44:40",
                "version": 1,
                "uuid": "c5473ae0-6b0c-11eb-83ec-fbe0028f2baf",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Primaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5205
                },
                "schoolPlanPayment": {
                    "id": 14070
                }
            },
            {
                "id": 7949,
                "createdAt": "2020-12-22 12:44:40",
                "updatedAt": "2020-12-22 12:44:40",
                "version": 1,
                "uuid": "c5473da0-6b0c-11eb-965f-0be88c60f27e",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Primaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5205
                },
                "schoolPlanPayment": {
                    "id": 14071
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2020-12-22 12:44:40",
                "updatedAt": "2020-12-22 12:44:55",
                "version": 1,
                "uuid": "c5473f90-6b0c-11eb-9ade-379271ffba08",
                "folio": "NTKBCR-5205",
                "change": 0,
                "quantity": 2210,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5205
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5211,
                        "createdAt": "2020-12-22 12:44:40",
                        "updatedAt": "2020-12-22 12:44:40",
                        "version": 1,
                        "uuid": "c5474270-6b0c-11eb-83bb-17323f795c7f",
                        "codePaymentMethod": "03",
                        "quantity": 2210,
                        "date": "2020-12-22",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5499,
                        "createdAt": "2020-12-22 12:44:53",
                        "updatedAt": "2020-12-22 12:44:55",
                        "version": 1,
                        "folio": "ACAKMCR-5499",
                        "uuid": "667FFF34-447D-11EB-AB45-75F89EE97E50",
                        "businessName": "JUVENCIO FRANCISCO BLANCO JUAN",
                        "rfc": "BAJJ8306286A6",
                        "total": 2210,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5205
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5206,
        "createdAt": "2020-12-22 13:01:51",
        "updatedAt": "2020-12-22 13:02:44",
        "version": 1,
        "uuid": "c5474690-6b0c-11eb-b4ab-596d3c751174",
        "folio": "NTKBCR-5206",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 664
        },
        "chargesDetails": [
            {
                "id": 7950,
                "createdAt": "2020-12-22 13:01:51",
                "updatedAt": "2020-12-22 13:01:51",
                "version": 1,
                "uuid": "c5930660-6b0c-11eb-97f4-b725d6c33407",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n primaria",
                "quantity": 1,
                "price": 367.5,
                "schoolCharge": {
                    "id": 5206
                },
                "schoolPlanPayment": {
                    "id": 14074
                }
            },
            {
                "id": 7951,
                "createdAt": "2020-12-22 13:01:51",
                "updatedAt": "2020-12-22 13:01:51",
                "version": 1,
                "uuid": "c5930ad0-6b0c-11eb-b1c4-d953f8b74ae3",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Primaria",
                "quantity": 1,
                "price": 160,
                "schoolCharge": {
                    "id": 5206
                },
                "schoolPlanPayment": {
                    "id": 14085
                }
            },
            {
                "id": 7952,
                "createdAt": "2020-12-22 13:01:51",
                "updatedAt": "2020-12-22 13:01:51",
                "version": 1,
                "uuid": "c5930df0-6b0c-11eb-b848-f9ca421ec016",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5206
                },
                "schoolPlanPayment": {
                    "id": 14086
                }
            },
            {
                "id": 7953,
                "createdAt": "2020-12-22 13:01:51",
                "updatedAt": "2020-12-22 13:01:51",
                "version": 1,
                "uuid": "c59310c0-6b0c-11eb-aee9-fb72e3e70d53",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Primaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5206
                },
                "schoolPlanPayment": {
                    "id": 14087
                }
            },
            {
                "id": 7954,
                "createdAt": "2020-12-22 13:01:51",
                "updatedAt": "2020-12-22 13:01:51",
                "version": 1,
                "uuid": "c5931560-6b0c-11eb-bc5d-559d73d1ce54",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Primaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5206
                },
                "schoolPlanPayment": {
                    "id": 14088
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2020-12-22 13:01:51",
                "updatedAt": "2020-12-22 13:02:44",
                "version": 1,
                "uuid": "c5931860-6b0c-11eb-afd9-2b64826ac4b7",
                "folio": "NTKBCR-5206",
                "change": 0,
                "quantity": 1527.5,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5206
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5212,
                        "createdAt": "2020-12-22 13:01:51",
                        "updatedAt": "2020-12-22 13:01:51",
                        "version": 1,
                        "uuid": "c5931b80-6b0c-11eb-9622-b39fffc4ef95",
                        "codePaymentMethod": "03",
                        "quantity": 1527.5,
                        "date": "2020-12-22",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5500,
                        "createdAt": "2020-12-22 13:02:42",
                        "updatedAt": "2020-12-22 13:02:44",
                        "version": 1,
                        "folio": "ACAKMCR-5500",
                        "uuid": "E3E4CAE8-447F-11EB-AAF4-FDECB444A950",
                        "businessName": "FERNANDO ALONSO GARCIA RAMIREZ",
                        "rfc": "XAXX010101000",
                        "total": 1527.5,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5206
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5207,
        "createdAt": "2020-12-23 09:55:59",
        "updatedAt": "2020-12-23 09:56:10",
        "version": 1,
        "uuid": "c5931fa0-6b0c-11eb-a04a-c986e812876e",
        "folio": "NTKBCR-5207",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 587
        },
        "chargesDetails": [
            {
                "id": 7955,
                "createdAt": "2020-12-23 09:55:59",
                "updatedAt": "2020-12-23 09:55:59",
                "version": 1,
                "uuid": "c5e9e010-6b0c-11eb-8781-5bfead194cc3",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n preescolar",
                "quantity": 1,
                "price": 710,
                "schoolCharge": {
                    "id": 5207
                },
                "schoolPlanPayment": {
                    "id": 14125
                }
            },
            {
                "id": 7956,
                "createdAt": "2020-12-23 09:55:59",
                "updatedAt": "2020-12-23 09:55:59",
                "version": 1,
                "uuid": "c5e9e460-6b0c-11eb-9feb-93186234a46e",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Preescolar",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5207
                },
                "schoolPlanPayment": {
                    "id": 14136
                }
            },
            {
                "id": 7957,
                "createdAt": "2020-12-23 09:55:59",
                "updatedAt": "2020-12-23 09:55:59",
                "version": 1,
                "uuid": "c5e9e780-6b0c-11eb-a17d-477ed00e663e",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Preescolar",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5207
                },
                "schoolPlanPayment": {
                    "id": 14137
                }
            },
            {
                "id": 7958,
                "createdAt": "2020-12-23 09:55:59",
                "updatedAt": "2020-12-23 09:55:59",
                "version": 1,
                "uuid": "c5e9ea90-6b0c-11eb-aa89-6b7a06ab783f",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Preescolar",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5207
                },
                "schoolPlanPayment": {
                    "id": 14138
                }
            },
            {
                "id": 7959,
                "createdAt": "2020-12-23 09:55:59",
                "updatedAt": "2020-12-23 09:55:59",
                "version": 1,
                "uuid": "c5e9ed90-6b0c-11eb-a604-d5d6ec45e55e",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5207
                },
                "schoolPlanPayment": {
                    "id": 14330
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2020-12-23 09:55:59",
                "updatedAt": "2020-12-23 09:56:10",
                "version": 1,
                "uuid": "c5e9ef80-6b0c-11eb-a649-ff3fc449d4e2",
                "folio": "NTKBCR-5207",
                "change": 0,
                "quantity": 1860,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5207
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5213,
                        "createdAt": "2020-12-23 09:55:59",
                        "updatedAt": "2020-12-23 09:55:59",
                        "version": 1,
                        "uuid": "c5e9f260-6b0c-11eb-8790-a77468b748f9",
                        "codePaymentMethod": "03",
                        "quantity": 1860,
                        "date": "2020-12-23",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5501,
                        "createdAt": "2020-12-23 09:56:08",
                        "updatedAt": "2020-12-23 09:56:10",
                        "version": 1,
                        "folio": "ACAKMCR-5501",
                        "uuid": "FDB08AA2-452E-11EB-8C47-DDA211125C1B",
                        "businessName": "MARIO EMILIANO MANZANILLA PONCE",
                        "rfc": "XAXX010101000",
                        "total": 1860,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5207
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5208,
        "createdAt": "2020-12-23 10:07:07",
        "updatedAt": "2020-12-23 10:07:15",
        "version": 1,
        "uuid": "c5e9f770-6b0c-11eb-a6d5-1f65e7bac7c0",
        "folio": "NTKBCR-5208",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 564
        },
        "chargesDetails": [
            {
                "id": 7960,
                "createdAt": "2020-12-23 10:07:07",
                "updatedAt": "2020-12-23 10:07:07",
                "version": 1,
                "uuid": "c63cf910-6b0c-11eb-95ac-679d75ebc42e",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n primaria",
                "quantity": 1,
                "price": 613,
                "schoolCharge": {
                    "id": 5208
                },
                "schoolPlanPayment": {
                    "id": 14141
                }
            },
            {
                "id": 7961,
                "createdAt": "2020-12-23 10:07:07",
                "updatedAt": "2020-12-23 10:07:07",
                "version": 1,
                "uuid": "c63cfee0-6b0c-11eb-abde-75332b8f1f78",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Primaria",
                "quantity": 1,
                "price": 160,
                "schoolCharge": {
                    "id": 5208
                },
                "schoolPlanPayment": {
                    "id": 14152
                }
            },
            {
                "id": 7962,
                "createdAt": "2020-12-23 10:07:07",
                "updatedAt": "2020-12-23 10:07:07",
                "version": 1,
                "uuid": "c63d0470-6b0c-11eb-aa02-57f1e646f827",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5208
                },
                "schoolPlanPayment": {
                    "id": 14153
                }
            },
            {
                "id": 7963,
                "createdAt": "2020-12-23 10:07:07",
                "updatedAt": "2020-12-23 10:07:07",
                "version": 1,
                "uuid": "c63d0990-6b0c-11eb-a45f-bb8324798d3c",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Primaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5208
                },
                "schoolPlanPayment": {
                    "id": 14154
                }
            },
            {
                "id": 7964,
                "createdAt": "2020-12-23 10:07:07",
                "updatedAt": "2020-12-23 10:07:07",
                "version": 1,
                "uuid": "c63d0ec0-6b0c-11eb-b0b5-47e2f87becf8",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Primaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5208
                },
                "schoolPlanPayment": {
                    "id": 14155
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2020-12-23 10:07:07",
                "updatedAt": "2020-12-23 10:07:15",
                "version": 1,
                "uuid": "c63d11d0-6b0c-11eb-9089-370fcbbe0538",
                "folio": "NTKBCR-5208",
                "change": 0,
                "quantity": 1773,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5208
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5214,
                        "createdAt": "2020-12-23 10:07:07",
                        "updatedAt": "2020-12-23 10:07:07",
                        "version": 1,
                        "uuid": "c63d14a0-6b0c-11eb-a635-e746cf2c57b1",
                        "codePaymentMethod": "01",
                        "quantity": 1773,
                        "date": "2020-12-23",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 1
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5502,
                        "createdAt": "2020-12-23 10:07:13",
                        "updatedAt": "2020-12-23 10:07:15",
                        "version": 1,
                        "folio": "ACAKMCR-5502",
                        "uuid": "8A96C958-4530-11EB-8759-F1CDECA790E6",
                        "businessName": "LEONARDO ARTURO OCAMPO MARQUEZ",
                        "rfc": "XAXX010101000",
                        "total": 1773,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5208
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5209,
        "createdAt": "2020-12-23 10:12:05",
        "updatedAt": "2020-12-23 10:12:13",
        "version": 1,
        "uuid": "c63d1860-6b0c-11eb-9a3d-b1695f6fc320",
        "folio": "NTKBCR-5209",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 562
        },
        "chargesDetails": [
            {
                "id": 7965,
                "createdAt": "2020-12-23 10:12:05",
                "updatedAt": "2020-12-23 10:12:05",
                "version": 1,
                "uuid": "c69a9f30-6b0c-11eb-88c2-f9f5b25be6d4",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n preescolar",
                "quantity": 1,
                "price": 560,
                "schoolCharge": {
                    "id": 5209
                },
                "schoolPlanPayment": {
                    "id": 14158
                }
            },
            {
                "id": 7966,
                "createdAt": "2020-12-23 10:12:05",
                "updatedAt": "2020-12-23 10:12:05",
                "version": 1,
                "uuid": "c69aa2e0-6b0c-11eb-a704-c75c08b64dc6",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Preescolar",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5209
                },
                "schoolPlanPayment": {
                    "id": 14169
                }
            },
            {
                "id": 7967,
                "createdAt": "2020-12-23 10:12:05",
                "updatedAt": "2020-12-23 10:12:05",
                "version": 1,
                "uuid": "c69aa670-6b0c-11eb-b14a-b7b4f6c9a8ea",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5209
                },
                "schoolPlanPayment": {
                    "id": 14170
                }
            },
            {
                "id": 7968,
                "createdAt": "2020-12-23 10:12:05",
                "updatedAt": "2020-12-23 10:12:05",
                "version": 1,
                "uuid": "c69aab00-6b0c-11eb-a44d-0db3bbc59638",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Preescolar",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5209
                },
                "schoolPlanPayment": {
                    "id": 14171
                }
            },
            {
                "id": 7969,
                "createdAt": "2020-12-23 10:12:05",
                "updatedAt": "2020-12-23 10:12:05",
                "version": 1,
                "uuid": "c69aaff0-6b0c-11eb-8c9c-292104530119",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Preescolar",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5209
                },
                "schoolPlanPayment": {
                    "id": 14172
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2020-12-23 10:12:05",
                "updatedAt": "2020-12-23 10:12:13",
                "version": 1,
                "uuid": "c69ab210-6b0c-11eb-a7a7-f57b56172ef2",
                "folio": "NTKBCR-5209",
                "change": 0,
                "quantity": 1710,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5209
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5215,
                        "createdAt": "2020-12-23 10:12:05",
                        "updatedAt": "2020-12-23 10:12:05",
                        "version": 1,
                        "uuid": "c69ab4e0-6b0c-11eb-8c9e-cffdd0e92cea",
                        "codePaymentMethod": "03",
                        "quantity": 1710,
                        "date": "2020-12-23",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5503,
                        "createdAt": "2020-12-23 10:12:11",
                        "updatedAt": "2020-12-23 10:12:12",
                        "version": 1,
                        "folio": "ACAKMCR-5503",
                        "uuid": "3B94FBF8-4531-11EB-8E13-59061A164630",
                        "businessName": "GUSTAVO TADEO LIZARRAGA ANDRADE",
                        "rfc": "XAXX010101000",
                        "total": 1710,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5209
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5210,
        "createdAt": "2020-12-23 10:13:00",
        "updatedAt": "2020-12-23 10:13:08",
        "version": 1,
        "uuid": "c69ab9d0-6b0c-11eb-ab9e-255acbdea083",
        "folio": "NTKBCR-5210",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 439
        },
        "chargesDetails": [
            {
                "id": 7970,
                "createdAt": "2020-12-23 10:13:00",
                "updatedAt": "2020-12-23 10:13:00",
                "version": 1,
                "uuid": "c6f863f0-6b0c-11eb-9153-5b0521083b42",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n primaria",
                "quantity": 1,
                "price": 560,
                "schoolCharge": {
                    "id": 5210
                },
                "schoolPlanPayment": {
                    "id": 14175
                }
            },
            {
                "id": 7971,
                "createdAt": "2020-12-23 10:13:00",
                "updatedAt": "2020-12-23 10:13:00",
                "version": 1,
                "uuid": "c6f867d0-6b0c-11eb-90e6-b18668d1791a",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Primaria",
                "quantity": 1,
                "price": 160,
                "schoolCharge": {
                    "id": 5210
                },
                "schoolPlanPayment": {
                    "id": 14186
                }
            },
            {
                "id": 7972,
                "createdAt": "2020-12-23 10:13:00",
                "updatedAt": "2020-12-23 10:13:00",
                "version": 1,
                "uuid": "c6f86aa0-6b0c-11eb-99dc-c11ecd7f0884",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5210
                },
                "schoolPlanPayment": {
                    "id": 14187
                }
            },
            {
                "id": 7973,
                "createdAt": "2020-12-23 10:13:00",
                "updatedAt": "2020-12-23 10:13:00",
                "version": 1,
                "uuid": "c6f86d60-6b0c-11eb-97f5-777d24708a2e",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Primaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5210
                },
                "schoolPlanPayment": {
                    "id": 14188
                }
            },
            {
                "id": 7974,
                "createdAt": "2020-12-23 10:13:00",
                "updatedAt": "2020-12-23 10:13:00",
                "version": 1,
                "uuid": "c6f87010-6b0c-11eb-8010-516d95ba6946",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Primaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5210
                },
                "schoolPlanPayment": {
                    "id": 14189
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2020-12-23 10:13:00",
                "updatedAt": "2020-12-23 10:13:08",
                "version": 1,
                "uuid": "c6f87210-6b0c-11eb-8c54-fd48c98b6ee7",
                "folio": "NTKBCR-5210",
                "change": 0,
                "quantity": 1720,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5210
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5216,
                        "createdAt": "2020-12-23 10:13:00",
                        "updatedAt": "2020-12-23 10:13:00",
                        "version": 1,
                        "uuid": "c6f87580-6b0c-11eb-a176-6165f52752dd",
                        "codePaymentMethod": "03",
                        "quantity": 1720,
                        "date": "2020-12-23",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5504,
                        "createdAt": "2020-12-23 10:13:07",
                        "updatedAt": "2020-12-23 10:13:08",
                        "version": 1,
                        "folio": "ACAKMCR-5504",
                        "uuid": "5CDC1C6A-4531-11EB-9874-7DC95725CFDD",
                        "businessName": "JIMENA LIZARRAGA ANDRADE",
                        "rfc": "XAXX010101000",
                        "total": 1720,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5210
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5211,
        "createdAt": "2020-12-23 10:14:44",
        "updatedAt": "2020-12-23 10:14:59",
        "version": 1,
        "uuid": "c6f87980-6b0c-11eb-b9d4-c31a7cc74253",
        "folio": "NTKBCR-5211",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 27
        },
        "chargesDetails": [
            {
                "id": 7975,
                "createdAt": "2020-12-23 10:14:44",
                "updatedAt": "2020-12-23 10:14:44",
                "version": 1,
                "uuid": "c7562d80-6b0c-11eb-a713-4794199fb024",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n primaria",
                "quantity": 1,
                "price": 210,
                "schoolCharge": {
                    "id": 5211
                },
                "schoolPlanPayment": {
                    "id": 14192
                }
            },
            {
                "id": 7976,
                "createdAt": "2020-12-23 10:14:44",
                "updatedAt": "2020-12-23 10:14:44",
                "version": 1,
                "uuid": "c7563340-6b0c-11eb-a30f-d5db94214b43",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Primaria",
                "quantity": 1,
                "price": 160,
                "schoolCharge": {
                    "id": 5211
                },
                "schoolPlanPayment": {
                    "id": 14203
                }
            },
            {
                "id": 7977,
                "createdAt": "2020-12-23 10:14:44",
                "updatedAt": "2020-12-23 10:14:44",
                "version": 1,
                "uuid": "c7563800-6b0c-11eb-9118-95ae638a9894",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5211
                },
                "schoolPlanPayment": {
                    "id": 14204
                }
            },
            {
                "id": 7978,
                "createdAt": "2020-12-23 10:14:44",
                "updatedAt": "2020-12-23 10:14:44",
                "version": 1,
                "uuid": "c7563bd0-6b0c-11eb-a69e-27cfa333dd9d",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Primaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5211
                },
                "schoolPlanPayment": {
                    "id": 14205
                }
            },
            {
                "id": 7979,
                "createdAt": "2020-12-23 10:14:44",
                "updatedAt": "2020-12-23 10:14:44",
                "version": 1,
                "uuid": "c7563f70-6b0c-11eb-a4ed-f9fa79551bcd",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Primaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5211
                },
                "schoolPlanPayment": {
                    "id": 14206
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2020-12-23 10:14:44",
                "updatedAt": "2020-12-23 10:14:59",
                "version": 1,
                "uuid": "c75641e0-6b0c-11eb-ace2-3b950cb6a3e8",
                "folio": "NTKBCR-5211",
                "change": 0,
                "quantity": 1370,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5211
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5217,
                        "createdAt": "2020-12-23 10:14:44",
                        "updatedAt": "2020-12-23 10:14:44",
                        "version": 1,
                        "uuid": "c7564560-6b0c-11eb-aac5-dbda47502ed6",
                        "codePaymentMethod": "03",
                        "quantity": 1370,
                        "date": "2020-12-23",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5505,
                        "createdAt": "2020-12-23 10:14:57",
                        "updatedAt": "2020-12-23 10:14:59",
                        "version": 1,
                        "folio": "ACAKMCR-5505",
                        "uuid": "9EAE4BA4-4531-11EB-AE8D-672650F77F57",
                        "businessName": "ALEJANDRA CARBAJAL HERNANDEZ",
                        "rfc": "XAXX010101000",
                        "total": 1370,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5211
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5212,
        "createdAt": "2020-12-23 10:18:53",
        "updatedAt": "2020-12-23 10:19:05",
        "version": 1,
        "uuid": "c7564a50-6b0c-11eb-9c9d-8d48086a55b3",
        "folio": "NTKBCR-5212",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 274
        },
        "chargesDetails": [
            {
                "id": 7980,
                "createdAt": "2020-12-23 10:18:53",
                "updatedAt": "2020-12-23 10:18:53",
                "version": 1,
                "uuid": "c7b40680-6b0c-11eb-aea3-99ff823cc178",
                "codeConcept": "86121601",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n o Reinscripci\u00f3n Preparatoria",
                "quantity": 1,
                "price": 266,
                "schoolCharge": {
                    "id": 5212
                },
                "schoolPlanPayment": {
                    "id": 14312
                }
            },
            {
                "id": 7981,
                "createdAt": "2020-12-23 10:18:53",
                "updatedAt": "2020-12-23 10:18:53",
                "version": 1,
                "uuid": "c7b409f0-6b0c-11eb-8941-d583b273c4e1",
                "codeConcept": "86121601",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota Seyc",
                "quantity": 1,
                "price": 200,
                "schoolCharge": {
                    "id": 5212
                },
                "schoolPlanPayment": {
                    "id": 14313
                }
            },
            {
                "id": 7982,
                "createdAt": "2020-12-23 10:18:53",
                "updatedAt": "2020-12-23 10:18:53",
                "version": 1,
                "uuid": "c7b40ca0-6b0c-11eb-80aa-dd0b87015d59",
                "codeConcept": "86121601",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para Padres",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5212
                },
                "schoolPlanPayment": {
                    "id": 14324
                }
            },
            {
                "id": 7983,
                "createdAt": "2020-12-23 10:18:53",
                "updatedAt": "2020-12-23 10:18:53",
                "version": 1,
                "uuid": "c7b40f40-6b0c-11eb-99e9-3d2b73649ab1",
                "codeConcept": "86121601",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5212
                },
                "schoolPlanPayment": {
                    "id": 14325
                }
            },
            {
                "id": 7984,
                "createdAt": "2020-12-23 10:18:54",
                "updatedAt": "2020-12-23 10:18:54",
                "version": 1,
                "uuid": "c7b411e0-6b0c-11eb-a0ab-5b20ea7a3164",
                "codeConcept": "86121601",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de Orfandad",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5212
                },
                "schoolPlanPayment": {
                    "id": 14326
                }
            },
            {
                "id": 7985,
                "createdAt": "2020-12-23 10:18:54",
                "updatedAt": "2020-12-23 10:18:54",
                "version": 1,
                "uuid": "c7b41480-6b0c-11eb-9ab0-97ddd3557d2f",
                "codeConcept": "86121601",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Prueba de Antidoping",
                "quantity": 1,
                "price": 200,
                "schoolCharge": {
                    "id": 5212
                },
                "schoolPlanPayment": {
                    "id": 14327
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2020-12-23 10:18:53",
                "updatedAt": "2020-12-23 10:19:05",
                "version": 1,
                "uuid": "c7b41630-6b0c-11eb-b31f-330bed31633b",
                "folio": "NTKBCR-5212",
                "change": 0,
                "quantity": 1666,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5212
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5218,
                        "createdAt": "2020-12-23 10:18:54",
                        "updatedAt": "2020-12-23 10:18:54",
                        "version": 1,
                        "uuid": "c7b418e0-6b0c-11eb-af05-cdcedfec1c82",
                        "codePaymentMethod": "03",
                        "quantity": 1666,
                        "date": "2020-12-23",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5506,
                        "createdAt": "2020-12-23 10:19:03",
                        "updatedAt": "2020-12-23 10:19:05",
                        "version": 1,
                        "folio": "ACAKMCR-5506",
                        "uuid": "316E0768-4532-11EB-9026-EF91D957A746",
                        "businessName": "AMERICA SUSANA ORTIZ ELIAS",
                        "rfc": "OIEA750409638",
                        "total": 1666,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5212
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5213,
        "createdAt": "2020-12-23 10:19:51",
        "updatedAt": "2020-12-23 10:19:58",
        "version": 1,
        "uuid": "c7b41d20-6b0c-11eb-9858-e17f0fa02507",
        "folio": "NTKBCR-5213",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 142
        },
        "chargesDetails": [
            {
                "id": 7986,
                "createdAt": "2020-12-23 10:19:51",
                "updatedAt": "2020-12-23 10:19:51",
                "version": 1,
                "uuid": "c81209c0-6b0c-11eb-a8f7-0feaefcc4183",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n primaria",
                "quantity": 1,
                "price": 245,
                "schoolCharge": {
                    "id": 5213
                },
                "schoolPlanPayment": {
                    "id": 14295
                }
            },
            {
                "id": 7987,
                "createdAt": "2020-12-23 10:19:51",
                "updatedAt": "2020-12-23 10:19:51",
                "version": 1,
                "uuid": "c8120da0-6b0c-11eb-ac0c-25e9b64355cb",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Primaria",
                "quantity": 1,
                "price": 160,
                "schoolCharge": {
                    "id": 5213
                },
                "schoolPlanPayment": {
                    "id": 14306
                }
            },
            {
                "id": 7988,
                "createdAt": "2020-12-23 10:19:51",
                "updatedAt": "2020-12-23 10:19:51",
                "version": 1,
                "uuid": "c8121090-6b0c-11eb-a4c3-3f264f16c09f",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5213
                },
                "schoolPlanPayment": {
                    "id": 14307
                }
            },
            {
                "id": 7989,
                "createdAt": "2020-12-23 10:19:51",
                "updatedAt": "2020-12-23 10:19:51",
                "version": 1,
                "uuid": "c8121350-6b0c-11eb-b300-d92ec95da8ca",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Primaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5213
                },
                "schoolPlanPayment": {
                    "id": 14308
                }
            },
            {
                "id": 7990,
                "createdAt": "2020-12-23 10:19:51",
                "updatedAt": "2020-12-23 10:19:51",
                "version": 1,
                "uuid": "c8121610-6b0c-11eb-9fbf-2588a7c3df08",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Primaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5213
                },
                "schoolPlanPayment": {
                    "id": 14309
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2020-12-23 10:19:51",
                "updatedAt": "2020-12-23 10:19:58",
                "version": 1,
                "uuid": "c81217e0-6b0c-11eb-b023-a99472547bfb",
                "folio": "NTKBCR-5213",
                "change": 0,
                "quantity": 1405,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5213
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5219,
                        "createdAt": "2020-12-23 10:19:51",
                        "updatedAt": "2020-12-23 10:19:51",
                        "version": 1,
                        "uuid": "c8121a90-6b0c-11eb-9cd9-d343d03a16d3",
                        "codePaymentMethod": "03",
                        "quantity": 1405,
                        "date": "2020-12-23",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5507,
                        "createdAt": "2020-12-23 10:19:56",
                        "updatedAt": "2020-12-23 10:19:58",
                        "version": 1,
                        "folio": "ACAKMCR-5507",
                        "uuid": "50E4AF34-4532-11EB-8AF0-4B5B361E1727",
                        "businessName": "AMERICA SUSANA ORTIZ ELIAS",
                        "rfc": "OIEA750409638",
                        "total": 1405,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5213
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5214,
        "createdAt": "2020-12-23 10:20:57",
        "updatedAt": "2020-12-23 10:21:06",
        "version": 1,
        "uuid": "c8121e90-6b0c-11eb-a527-ff9460299408",
        "folio": "NTKBCR-5214",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 7
        },
        "chargesDetails": [
            {
                "id": 7991,
                "createdAt": "2020-12-23 10:20:57",
                "updatedAt": "2020-12-23 10:20:57",
                "version": 1,
                "uuid": "c90b9e90-6b0c-11eb-80b8-c578fecd1273",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n primaria",
                "quantity": 1,
                "price": 210,
                "schoolCharge": {
                    "id": 5214
                },
                "schoolPlanPayment": {
                    "id": 14278
                }
            },
            {
                "id": 7992,
                "createdAt": "2020-12-23 10:20:57",
                "updatedAt": "2020-12-23 10:20:57",
                "version": 1,
                "uuid": "c90ba320-6b0c-11eb-9203-ef763d435850",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Primaria",
                "quantity": 1,
                "price": 160,
                "schoolCharge": {
                    "id": 5214
                },
                "schoolPlanPayment": {
                    "id": 14289
                }
            },
            {
                "id": 7993,
                "createdAt": "2020-12-23 10:20:58",
                "updatedAt": "2020-12-23 10:20:58",
                "version": 1,
                "uuid": "c90ba6c0-6b0c-11eb-91f4-3bf31800eced",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5214
                },
                "schoolPlanPayment": {
                    "id": 14290
                }
            },
            {
                "id": 7994,
                "createdAt": "2020-12-23 10:20:58",
                "updatedAt": "2020-12-23 10:20:58",
                "version": 1,
                "uuid": "c90baa20-6b0c-11eb-ba14-e95a67ec6ce8",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Primaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5214
                },
                "schoolPlanPayment": {
                    "id": 14291
                }
            },
            {
                "id": 7995,
                "createdAt": "2020-12-23 10:20:58",
                "updatedAt": "2020-12-23 10:20:58",
                "version": 1,
                "uuid": "c90bad90-6b0c-11eb-884a-05ad4ab4b9c6",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Primaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5214
                },
                "schoolPlanPayment": {
                    "id": 14292
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2020-12-23 10:20:57",
                "updatedAt": "2020-12-23 10:21:06",
                "version": 1,
                "uuid": "c90baff0-6b0c-11eb-8e43-ffbfe94e2951",
                "folio": "NTKBCR-5214",
                "change": 0,
                "quantity": 1370,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5214
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5220,
                        "createdAt": "2020-12-23 10:20:58",
                        "updatedAt": "2020-12-23 10:20:58",
                        "version": 1,
                        "uuid": "c90bb350-6b0c-11eb-9e9c-c51a6b6a2306",
                        "codePaymentMethod": "03",
                        "quantity": 1370,
                        "date": "2020-12-23",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5508,
                        "createdAt": "2020-12-23 10:21:04",
                        "updatedAt": "2020-12-23 10:21:06",
                        "version": 1,
                        "folio": "ACAKMCR-5508",
                        "uuid": "79CE3D5C-4532-11EB-AA52-7F55B36DF522",
                        "businessName": "AMERICA SUSANA ORTIZ ELIAS",
                        "rfc": "OIEA750409638",
                        "total": 1370,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5214
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5215,
        "createdAt": "2020-12-23 10:26:19",
        "updatedAt": "2020-12-23 10:26:29",
        "version": 1,
        "uuid": "c90bb860-6b0c-11eb-b151-1995510cb97a",
        "folio": "NTKBCR-5215",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 432
        },
        "chargesDetails": [
            {
                "id": 7996,
                "createdAt": "2020-12-23 10:26:19",
                "updatedAt": "2020-12-23 10:26:19",
                "version": 1,
                "uuid": "c94d90e0-6b0c-11eb-ad39-b5039f76c426",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "inscripci\u00f3n o Reinscripci\u00f3n Secundaria",
                "quantity": 1,
                "price": 1330,
                "schoolCharge": {
                    "id": 5215
                },
                "schoolPlanPayment": {
                    "id": 14260
                }
            },
            {
                "id": 7997,
                "createdAt": "2020-12-23 10:26:19",
                "updatedAt": "2020-12-23 10:26:19",
                "version": 1,
                "uuid": "c94d97f0-6b0c-11eb-a3f4-6de72cd988a3",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "CUOTA SEQ",
                "quantity": 1,
                "price": 200,
                "schoolCharge": {
                    "id": 5215
                },
                "schoolPlanPayment": {
                    "id": 14271
                }
            },
            {
                "id": 7998,
                "createdAt": "2020-12-23 10:26:19",
                "updatedAt": "2020-12-23 10:26:19",
                "version": 1,
                "uuid": "c94d9c90-6b0c-11eb-9b6d-01cdc930064d",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "ESCUELA PARA PADRES",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5215
                },
                "schoolPlanPayment": {
                    "id": 14272
                }
            },
            {
                "id": 7999,
                "createdAt": "2020-12-23 10:26:19",
                "updatedAt": "2020-12-23 10:26:19",
                "version": 1,
                "uuid": "c94da150-6b0c-11eb-9f5e-2d8c5efe3ad8",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Secundaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5215
                },
                "schoolPlanPayment": {
                    "id": 14273
                }
            },
            {
                "id": 8000,
                "createdAt": "2020-12-23 10:26:19",
                "updatedAt": "2020-12-23 10:26:19",
                "version": 1,
                "uuid": "c94da5d0-6b0c-11eb-a421-3d7b947562e4",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Secundaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5215
                },
                "schoolPlanPayment": {
                    "id": 14274
                }
            },
            {
                "id": 8001,
                "createdAt": "2020-12-23 10:26:19",
                "updatedAt": "2020-12-23 10:26:19",
                "version": 1,
                "uuid": "c94daa60-6b0c-11eb-ae77-7fed9794a9ef",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Prueba de Antidoping (Tercer grado)",
                "quantity": 1,
                "price": 200,
                "schoolCharge": {
                    "id": 5215
                },
                "schoolPlanPayment": {
                    "id": 14275
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2020-12-23 10:26:19",
                "updatedAt": "2020-12-23 10:26:29",
                "version": 1,
                "uuid": "c94dad40-6b0c-11eb-9268-7709566592f4",
                "folio": "NTKBCR-5215",
                "change": 0,
                "quantity": 2730,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5215
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5221,
                        "createdAt": "2020-12-23 10:26:19",
                        "updatedAt": "2020-12-23 10:26:19",
                        "version": 1,
                        "uuid": "c94db1b0-6b0c-11eb-be6d-b732222303ff",
                        "codePaymentMethod": "03",
                        "quantity": 2730,
                        "date": "2020-12-23",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5509,
                        "createdAt": "2020-12-23 10:26:27",
                        "updatedAt": "2020-12-23 10:26:29",
                        "version": 1,
                        "folio": "ACAKMCR-5509",
                        "uuid": "3A5AFFB0-4533-11EB-91FC-C18EDB284E2F",
                        "businessName": "JAVIER CARRERA FLORES",
                        "rfc": "XAXX010101000",
                        "total": 2730,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5215
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5216,
        "createdAt": "2020-12-23 10:27:49",
        "updatedAt": "2020-12-23 10:28:57",
        "version": 1,
        "uuid": "c94db810-6b0c-11eb-8bdd-7fc6ae5dc29d",
        "folio": "NTKBCR-5216",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 442
        },
        "chargesDetails": [
            {
                "id": 8002,
                "createdAt": "2020-12-23 10:27:49",
                "updatedAt": "2020-12-23 10:27:49",
                "version": 1,
                "uuid": "c99105a0-6b0c-11eb-b641-699411bd0800",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n primaria",
                "quantity": 1,
                "price": 1225,
                "schoolCharge": {
                    "id": 5216
                },
                "schoolPlanPayment": {
                    "id": 14243
                }
            },
            {
                "id": 8003,
                "createdAt": "2020-12-23 10:27:49",
                "updatedAt": "2020-12-23 10:27:49",
                "version": 1,
                "uuid": "c9910e50-6b0c-11eb-8f8d-35ff32489ee5",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Primaria",
                "quantity": 1,
                "price": 160,
                "schoolCharge": {
                    "id": 5216
                },
                "schoolPlanPayment": {
                    "id": 14254
                }
            },
            {
                "id": 8004,
                "createdAt": "2020-12-23 10:27:49",
                "updatedAt": "2020-12-23 10:27:49",
                "version": 1,
                "uuid": "c99115c0-6b0c-11eb-b2be-1f2b406d4877",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5216
                },
                "schoolPlanPayment": {
                    "id": 14255
                }
            },
            {
                "id": 8005,
                "createdAt": "2020-12-23 10:27:49",
                "updatedAt": "2020-12-23 10:27:49",
                "version": 1,
                "uuid": "c9911e20-6b0c-11eb-9fac-0dd24f8b9560",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Primaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5216
                },
                "schoolPlanPayment": {
                    "id": 14256
                }
            },
            {
                "id": 8006,
                "createdAt": "2020-12-23 10:27:49",
                "updatedAt": "2020-12-23 10:27:49",
                "version": 1,
                "uuid": "c9912510-6b0c-11eb-b05e-47081b25e41b",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Primaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5216
                },
                "schoolPlanPayment": {
                    "id": 14257
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2020-12-23 10:27:49",
                "updatedAt": "2020-12-23 10:28:57",
                "version": 1,
                "uuid": "c99129e0-6b0c-11eb-a901-71756954990a",
                "folio": "NTKBCR-5216",
                "change": 0,
                "quantity": 2385,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5216
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5222,
                        "createdAt": "2020-12-23 10:27:49",
                        "updatedAt": "2020-12-23 10:27:49",
                        "version": 1,
                        "uuid": "c9912f80-6b0c-11eb-aaeb-7f1e067090b2",
                        "codePaymentMethod": "03",
                        "quantity": 2385,
                        "date": "2020-12-23",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5510,
                        "createdAt": "2020-12-23 10:28:55",
                        "updatedAt": "2020-12-23 10:28:57",
                        "version": 1,
                        "folio": "ACAKMCR-5510",
                        "uuid": "924D54FC-4533-11EB-92DF-59F6050954F0",
                        "businessName": "JAVIER CARRERA FLORES",
                        "rfc": "CAFJ850131MV4",
                        "total": 2385,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5216
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5217,
        "createdAt": "2020-12-23 10:32:58",
        "updatedAt": "2020-12-23 10:33:05",
        "version": 1,
        "uuid": "c9913e30-6b0c-11eb-a11e-c19adff727d1",
        "folio": "NTKBCR-5217",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 638
        },
        "chargesDetails": [
            {
                "id": 8007,
                "createdAt": "2020-12-23 10:32:58",
                "updatedAt": "2020-12-23 10:32:58",
                "version": 1,
                "uuid": "c9d21f20-6b0c-11eb-859f-8537864b2151",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n primaria",
                "quantity": 1,
                "price": 1050,
                "schoolCharge": {
                    "id": 5217
                },
                "schoolPlanPayment": {
                    "id": 14226
                }
            },
            {
                "id": 8008,
                "createdAt": "2020-12-23 10:32:58",
                "updatedAt": "2020-12-23 10:32:58",
                "version": 1,
                "uuid": "c9d222c0-6b0c-11eb-8ac6-ff61d0f68357",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Primaria",
                "quantity": 1,
                "price": 160,
                "schoolCharge": {
                    "id": 5217
                },
                "schoolPlanPayment": {
                    "id": 14237
                }
            },
            {
                "id": 8009,
                "createdAt": "2020-12-23 10:32:58",
                "updatedAt": "2020-12-23 10:32:58",
                "version": 1,
                "uuid": "c9d22620-6b0c-11eb-84ae-73a77dcf18d4",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5217
                },
                "schoolPlanPayment": {
                    "id": 14238
                }
            },
            {
                "id": 8010,
                "createdAt": "2020-12-23 10:32:58",
                "updatedAt": "2020-12-23 10:32:58",
                "version": 1,
                "uuid": "c9d22880-6b0c-11eb-a171-ef10bec937b2",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Primaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5217
                },
                "schoolPlanPayment": {
                    "id": 14239
                }
            },
            {
                "id": 8011,
                "createdAt": "2020-12-23 10:32:58",
                "updatedAt": "2020-12-23 10:32:58",
                "version": 1,
                "uuid": "c9d22bb0-6b0c-11eb-8d98-654b2274ecdf",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Primaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5217
                },
                "schoolPlanPayment": {
                    "id": 14240
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2020-12-23 10:32:58",
                "updatedAt": "2020-12-23 10:33:05",
                "version": 1,
                "uuid": "c9d22d60-6b0c-11eb-bb67-0f99890c68cb",
                "folio": "NTKBCR-5217",
                "change": 0,
                "quantity": 2210,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5217
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5223,
                        "createdAt": "2020-12-23 10:32:58",
                        "updatedAt": "2020-12-23 10:32:58",
                        "version": 1,
                        "uuid": "c9d22fd0-6b0c-11eb-8585-4579aa107f76",
                        "codePaymentMethod": "03",
                        "quantity": 2210,
                        "date": "2020-12-23",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5511,
                        "createdAt": "2020-12-23 10:33:03",
                        "updatedAt": "2020-12-23 10:33:05",
                        "version": 1,
                        "folio": "ACAKMCR-5511",
                        "uuid": "2621D2A2-4534-11EB-BBF2-F55F2874AD1D",
                        "businessName": "MAXIMILIANO RUIZ ARUIZU",
                        "rfc": "XAXX010101000",
                        "total": 2210,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5217
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5218,
        "createdAt": "2020-12-23 10:33:52",
        "updatedAt": "2020-12-23 10:33:59",
        "version": 1,
        "uuid": "c9d23360-6b0c-11eb-9643-a12a9e5b6e9e",
        "folio": "NTKBCR-5218",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 637
        },
        "chargesDetails": [
            {
                "id": 8012,
                "createdAt": "2020-12-23 10:33:52",
                "updatedAt": "2020-12-23 10:33:52",
                "version": 1,
                "uuid": "ca144830-6b0c-11eb-8570-a1dee2fc66c5",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n primaria",
                "quantity": 1,
                "price": 1050,
                "schoolCharge": {
                    "id": 5218
                },
                "schoolPlanPayment": {
                    "id": 14209
                }
            },
            {
                "id": 8013,
                "createdAt": "2020-12-23 10:33:52",
                "updatedAt": "2020-12-23 10:33:52",
                "version": 1,
                "uuid": "ca144df0-6b0c-11eb-bac7-fb7d89783c51",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Primaria",
                "quantity": 1,
                "price": 160,
                "schoolCharge": {
                    "id": 5218
                },
                "schoolPlanPayment": {
                    "id": 14220
                }
            },
            {
                "id": 8014,
                "createdAt": "2020-12-23 10:33:52",
                "updatedAt": "2020-12-23 10:33:52",
                "version": 1,
                "uuid": "ca1452b0-6b0c-11eb-9f37-7ffcf39af8ac",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5218
                },
                "schoolPlanPayment": {
                    "id": 14221
                }
            },
            {
                "id": 8015,
                "createdAt": "2020-12-23 10:33:52",
                "updatedAt": "2020-12-23 10:33:52",
                "version": 1,
                "uuid": "ca145760-6b0c-11eb-853a-b9380d0ed868",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Primaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5218
                },
                "schoolPlanPayment": {
                    "id": 14222
                }
            },
            {
                "id": 8016,
                "createdAt": "2020-12-23 10:33:52",
                "updatedAt": "2020-12-23 10:33:52",
                "version": 1,
                "uuid": "ca145c10-6b0c-11eb-bf9b-b3f69634b4b0",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Primaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5218
                },
                "schoolPlanPayment": {
                    "id": 14223
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2020-12-23 10:33:52",
                "updatedAt": "2020-12-23 10:33:59",
                "version": 1,
                "uuid": "ca145f20-6b0c-11eb-8496-77c1b4bdd487",
                "folio": "NTKBCR-5218",
                "change": 0,
                "quantity": 2210,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5218
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5224,
                        "createdAt": "2020-12-23 10:33:52",
                        "updatedAt": "2020-12-23 10:33:52",
                        "version": 1,
                        "uuid": "ca146350-6b0c-11eb-99e7-bde42205f7fc",
                        "codePaymentMethod": "03",
                        "quantity": 2210,
                        "date": "2020-12-23",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5512,
                        "createdAt": "2020-12-23 10:33:57",
                        "updatedAt": "2020-12-23 10:33:59",
                        "version": 1,
                        "folio": "ACAKMCR-5512",
                        "uuid": "4642CEF6-4534-11EB-BD81-1F66500D2588",
                        "businessName": "AMY ALEJANDRA RUIZ ARVIZU",
                        "rfc": "XAXX010101000",
                        "total": 2210,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5218
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5219,
        "createdAt": "2020-12-23 10:46:06",
        "updatedAt": "2020-12-23 10:46:18",
        "version": 1,
        "uuid": "ca146a00-6b0c-11eb-bb08-032b81629c6a",
        "folio": "NTKBCR-5219",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 495
        },
        "chargesDetails": [
            {
                "id": 8017,
                "createdAt": "2020-12-23 10:46:06",
                "updatedAt": "2020-12-23 10:46:06",
                "version": 1,
                "uuid": "ca5714a0-6b0c-11eb-a599-5b6959cab9ae",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n preescolar",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5219
                },
                "schoolPlanPayment": {
                    "id": 14108
                }
            },
            {
                "id": 8018,
                "createdAt": "2020-12-23 10:46:06",
                "updatedAt": "2020-12-23 10:46:06",
                "version": 1,
                "uuid": "ca571a10-6b0c-11eb-9124-7f0f6cd256b3",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Preescolar",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5219
                },
                "schoolPlanPayment": {
                    "id": 14119
                }
            },
            {
                "id": 8019,
                "createdAt": "2020-12-23 10:46:06",
                "updatedAt": "2020-12-23 10:46:06",
                "version": 1,
                "uuid": "ca571e00-6b0c-11eb-b48a-171d8a890183",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5219
                },
                "schoolPlanPayment": {
                    "id": 14120
                }
            },
            {
                "id": 8020,
                "createdAt": "2020-12-23 10:46:06",
                "updatedAt": "2020-12-23 10:46:06",
                "version": 1,
                "uuid": "ca572160-6b0c-11eb-a357-71403098c7de",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Preescolar",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5219
                },
                "schoolPlanPayment": {
                    "id": 14121
                }
            },
            {
                "id": 8021,
                "createdAt": "2020-12-23 10:46:06",
                "updatedAt": "2020-12-23 10:46:06",
                "version": 1,
                "uuid": "ca572420-6b0c-11eb-a50b-5558d088a49c",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Preescolar",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5219
                },
                "schoolPlanPayment": {
                    "id": 14122
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2020-12-23 10:46:06",
                "updatedAt": "2020-12-23 10:46:18",
                "version": 1,
                "uuid": "ca572600-6b0c-11eb-8cff-bf5ae2c97e0c",
                "folio": "NTKBCR-5219",
                "change": 0,
                "quantity": 1500,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5219
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5225,
                        "createdAt": "2020-12-23 10:46:06",
                        "updatedAt": "2020-12-23 10:46:06",
                        "version": 1,
                        "uuid": "ca5728a0-6b0c-11eb-bb74-d34fd5946586",
                        "codePaymentMethod": "01",
                        "quantity": 1500,
                        "date": "2020-12-23",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 1
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5513,
                        "createdAt": "2020-12-23 10:46:16",
                        "updatedAt": "2020-12-23 10:46:18",
                        "version": 1,
                        "folio": "ACAKMCR-5513",
                        "uuid": "FEF24552-4535-11EB-8AA4-83381B0E27C3",
                        "businessName": "KITZIA YOSELIN CORREA GARCIA",
                        "rfc": "XAXX010101000",
                        "total": 1500,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5219
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5220,
        "createdAt": "2020-12-23 10:48:45",
        "updatedAt": "2020-12-23 10:49:09",
        "version": 1,
        "uuid": "ca572ca0-6b0c-11eb-b8aa-67302d49e82b",
        "folio": "NTKBCR-5220",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 402
        },
        "chargesDetails": [
            {
                "id": 8022,
                "createdAt": "2020-12-23 10:48:45",
                "updatedAt": "2020-12-23 10:48:45",
                "version": 1,
                "uuid": "ca9857b0-6b0c-11eb-aa71-1dad8a44d564",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n primaria",
                "quantity": 1,
                "price": 210,
                "schoolCharge": {
                    "id": 5220
                },
                "schoolPlanPayment": {
                    "id": 14091
                }
            },
            {
                "id": 8023,
                "createdAt": "2020-12-23 10:48:45",
                "updatedAt": "2020-12-23 10:48:45",
                "version": 1,
                "uuid": "ca985bd0-6b0c-11eb-8128-2552e0a6b6c4",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Primaria",
                "quantity": 1,
                "price": 160,
                "schoolCharge": {
                    "id": 5220
                },
                "schoolPlanPayment": {
                    "id": 14102
                }
            },
            {
                "id": 8024,
                "createdAt": "2020-12-23 10:48:45",
                "updatedAt": "2020-12-23 10:48:45",
                "version": 1,
                "uuid": "ca985ed0-6b0c-11eb-8573-05efb9160d85",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5220
                },
                "schoolPlanPayment": {
                    "id": 14103
                }
            },
            {
                "id": 8025,
                "createdAt": "2020-12-23 10:48:45",
                "updatedAt": "2020-12-23 10:48:45",
                "version": 1,
                "uuid": "ca9861d0-6b0c-11eb-baf6-1f69748e3055",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Primaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5220
                },
                "schoolPlanPayment": {
                    "id": 14104
                }
            },
            {
                "id": 8026,
                "createdAt": "2020-12-23 10:48:45",
                "updatedAt": "2020-12-23 10:48:45",
                "version": 1,
                "uuid": "ca986460-6b0c-11eb-bd7f-53622e1a3940",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Primaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5220
                },
                "schoolPlanPayment": {
                    "id": 14105
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2020-12-23 10:48:45",
                "updatedAt": "2020-12-23 10:49:09",
                "version": 1,
                "uuid": "ca986620-6b0c-11eb-81f7-ffe6005f94d9",
                "folio": "NTKBCR-5220",
                "change": 0,
                "quantity": 1370,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5220
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5226,
                        "createdAt": "2020-12-23 10:48:45",
                        "updatedAt": "2020-12-23 10:48:45",
                        "version": 1,
                        "uuid": "ca9868b0-6b0c-11eb-8776-61c597d6c363",
                        "codePaymentMethod": "01",
                        "quantity": 1370,
                        "date": "2020-12-23",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 1
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5514,
                        "createdAt": "2020-12-23 10:49:06",
                        "updatedAt": "2020-12-23 10:49:08",
                        "version": 1,
                        "folio": "ACAKMCR-5514",
                        "uuid": "6475D420-4536-11EB-803B-4BB75BEE2E50",
                        "businessName": "HENDRICK CORREA GARCIAS",
                        "rfc": "XAXX010101000",
                        "total": 1370,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5220
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5221,
        "createdAt": "2020-12-23 11:41:46",
        "updatedAt": "2020-12-23 11:41:58",
        "version": 1,
        "uuid": "ca986d30-6b0c-11eb-8f22-7b8875cb1c29",
        "folio": "NTKBCR-5221",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 42
        },
        "chargesDetails": [
            {
                "id": 8027,
                "createdAt": "2020-12-23 11:41:47",
                "updatedAt": "2020-12-23 11:41:47",
                "version": 1,
                "uuid": "cadb0610-6b0c-11eb-af6c-d93cda7c806b",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n primaria",
                "quantity": 1,
                "price": 300,
                "schoolCharge": {
                    "id": 5221
                },
                "schoolPlanPayment": {
                    "id": 14331
                }
            },
            {
                "id": 8028,
                "createdAt": "2020-12-23 11:41:47",
                "updatedAt": "2020-12-23 11:41:47",
                "version": 1,
                "uuid": "cadb0a60-6b0c-11eb-abb2-b1fbd2bfb9e1",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Primaria",
                "quantity": 1,
                "price": 160,
                "schoolCharge": {
                    "id": 5221
                },
                "schoolPlanPayment": {
                    "id": 14342
                }
            },
            {
                "id": 8029,
                "createdAt": "2020-12-23 11:41:47",
                "updatedAt": "2020-12-23 11:41:47",
                "version": 1,
                "uuid": "cadb0ee0-6b0c-11eb-a0bb-191fe2307511",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5221
                },
                "schoolPlanPayment": {
                    "id": 14343
                }
            },
            {
                "id": 8030,
                "createdAt": "2020-12-23 11:41:47",
                "updatedAt": "2020-12-23 11:41:47",
                "version": 1,
                "uuid": "cadb11f0-6b0c-11eb-8cbb-e1fefc57127d",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Primaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5221
                },
                "schoolPlanPayment": {
                    "id": 14344
                }
            },
            {
                "id": 8031,
                "createdAt": "2020-12-23 11:41:47",
                "updatedAt": "2020-12-23 11:41:47",
                "version": 1,
                "uuid": "cadb14c0-6b0c-11eb-bc9a-51de1e8e873d",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Primaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5221
                },
                "schoolPlanPayment": {
                    "id": 14345
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2020-12-23 11:41:46",
                "updatedAt": "2020-12-23 11:41:58",
                "version": 1,
                "uuid": "cadb16b0-6b0c-11eb-b756-2915d2a92fd1",
                "folio": "NTKBCR-5221",
                "change": 0,
                "quantity": 1460,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5221
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5227,
                        "createdAt": "2020-12-23 11:41:47",
                        "updatedAt": "2020-12-23 11:41:47",
                        "version": 1,
                        "uuid": "cadb1980-6b0c-11eb-b716-bddd95c339f5",
                        "codePaymentMethod": "03",
                        "quantity": 1460,
                        "date": "2020-12-23",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5515,
                        "createdAt": "2020-12-23 11:41:55",
                        "updatedAt": "2020-12-23 11:41:58",
                        "version": 1,
                        "folio": "ACAKMCR-5515",
                        "uuid": "C5777B32-453D-11EB-89B3-29E10F103DB9",
                        "businessName": "AMELIE MORA DUMONT",
                        "rfc": "XAXX010101000",
                        "total": 1460,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5221
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5222,
        "createdAt": "2020-12-23 11:58:07",
        "updatedAt": "2020-12-23 11:58:16",
        "version": 1,
        "uuid": "cadb1d90-6b0c-11eb-bea8-ab8ce4d49e98",
        "folio": "NTKBCR-5222",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 31
        },
        "chargesDetails": [
            {
                "id": 8032,
                "createdAt": "2020-12-23 11:58:07",
                "updatedAt": "2020-12-23 11:58:07",
                "version": 1,
                "uuid": "cb1c7710-6b0c-11eb-ab4e-0982c53f3a46",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n primaria",
                "quantity": 1,
                "price": 300,
                "schoolCharge": {
                    "id": 5222
                },
                "schoolPlanPayment": {
                    "id": 14348
                }
            },
            {
                "id": 8033,
                "createdAt": "2020-12-23 11:58:07",
                "updatedAt": "2020-12-23 11:58:07",
                "version": 1,
                "uuid": "cb1c7bc0-6b0c-11eb-ac37-63f279fac544",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Primaria",
                "quantity": 1,
                "price": 160,
                "schoolCharge": {
                    "id": 5222
                },
                "schoolPlanPayment": {
                    "id": 14359
                }
            },
            {
                "id": 8034,
                "createdAt": "2020-12-23 11:58:07",
                "updatedAt": "2020-12-23 11:58:07",
                "version": 1,
                "uuid": "cb1c7f00-6b0c-11eb-9b02-cdf9bb36498f",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5222
                },
                "schoolPlanPayment": {
                    "id": 14360
                }
            },
            {
                "id": 8035,
                "createdAt": "2020-12-23 11:58:07",
                "updatedAt": "2020-12-23 11:58:07",
                "version": 1,
                "uuid": "cb1c8230-6b0c-11eb-87b8-af70c694afac",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Primaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5222
                },
                "schoolPlanPayment": {
                    "id": 14361
                }
            },
            {
                "id": 8036,
                "createdAt": "2020-12-23 11:58:07",
                "updatedAt": "2020-12-23 11:58:07",
                "version": 1,
                "uuid": "cb1c8520-6b0c-11eb-b932-919daab9670a",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Primaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5222
                },
                "schoolPlanPayment": {
                    "id": 14362
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2020-12-23 11:58:07",
                "updatedAt": "2020-12-23 11:58:16",
                "version": 1,
                "uuid": "cb1c8720-6b0c-11eb-836e-63b130cb481d",
                "folio": "NTKBCR-5222",
                "change": 0,
                "quantity": 1460,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5222
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5228,
                        "createdAt": "2020-12-23 11:58:07",
                        "updatedAt": "2020-12-23 11:58:07",
                        "version": 1,
                        "uuid": "cb1c8a00-6b0c-11eb-8422-637ea9f0ab06",
                        "codePaymentMethod": "03",
                        "quantity": 1460,
                        "date": "2020-12-23",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5516,
                        "createdAt": "2020-12-23 11:58:14",
                        "updatedAt": "2020-12-23 11:58:16",
                        "version": 1,
                        "folio": "ACAKMCR-5516",
                        "uuid": "0C9913C0-4540-11EB-B2D4-45B9D1464668",
                        "businessName": "PAULINA ELIZABETH GARCIA HERNANDEZ",
                        "rfc": "XAXX010101000",
                        "total": 1460,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5222
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5223,
        "createdAt": "2020-12-23 12:09:31",
        "updatedAt": "2020-12-23 12:15:01",
        "version": 1,
        "uuid": "cb1c8e40-6b0c-11eb-813b-5f2053311e20",
        "folio": "NTKBCR-5223",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 599
        },
        "chargesDetails": [
            {
                "id": 8037,
                "createdAt": "2020-12-23 12:09:31",
                "updatedAt": "2020-12-23 12:09:31",
                "version": 1,
                "uuid": "cb5eba20-6b0c-11eb-9c1a-9555bf22b4c8",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n preescolar",
                "quantity": 1,
                "price": 840,
                "schoolCharge": {
                    "id": 5223
                },
                "schoolPlanPayment": {
                    "id": 14365
                }
            },
            {
                "id": 8038,
                "createdAt": "2020-12-23 12:09:31",
                "updatedAt": "2020-12-23 12:09:31",
                "version": 1,
                "uuid": "cb5ec150-6b0c-11eb-916b-5dec809e4ffa",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Preescolar",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5223
                },
                "schoolPlanPayment": {
                    "id": 14376
                }
            },
            {
                "id": 8039,
                "createdAt": "2020-12-23 12:09:31",
                "updatedAt": "2020-12-23 12:09:31",
                "version": 1,
                "uuid": "cb5ec720-6b0c-11eb-9f1c-d74ac45f78ab",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5223
                },
                "schoolPlanPayment": {
                    "id": 14377
                }
            },
            {
                "id": 8040,
                "createdAt": "2020-12-23 12:09:31",
                "updatedAt": "2020-12-23 12:09:31",
                "version": 1,
                "uuid": "cb5ecb00-6b0c-11eb-886b-41c34b01cebc",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Preescolar",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5223
                },
                "schoolPlanPayment": {
                    "id": 14378
                }
            },
            {
                "id": 8041,
                "createdAt": "2020-12-23 12:09:31",
                "updatedAt": "2020-12-23 12:09:31",
                "version": 1,
                "uuid": "cb5ecea0-6b0c-11eb-8638-d36eb408f162",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Preescolar",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5223
                },
                "schoolPlanPayment": {
                    "id": 14379
                }
            },
            {
                "id": 8042,
                "createdAt": "2020-12-23 12:09:31",
                "updatedAt": "2020-12-23 12:09:31",
                "version": 1,
                "uuid": "cb5ed160-6b0c-11eb-b151-d971056d587c",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n preescolar",
                "quantity": 1,
                "price": 200,
                "schoolCharge": {
                    "id": 5223
                },
                "schoolPlanPayment": {
                    "id": 14365
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2020-12-23 12:09:31",
                "updatedAt": "2020-12-23 12:15:01",
                "version": 1,
                "uuid": "cb5ed3d0-6b0c-11eb-8a2d-e5b82e1de7ba",
                "folio": "NTKBCR-5223",
                "change": 0,
                "quantity": 2190,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5223
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5229,
                        "createdAt": "2020-12-23 12:09:31",
                        "updatedAt": "2020-12-23 12:09:31",
                        "version": 1,
                        "uuid": "cb5ed720-6b0c-11eb-9994-b9fb88c69d0d",
                        "codePaymentMethod": "03",
                        "quantity": 2190,
                        "date": "2020-12-23",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5517,
                        "createdAt": "2020-12-23 12:14:59",
                        "updatedAt": "2020-12-23 12:15:01",
                        "version": 1,
                        "folio": "ACAKMCR-5517",
                        "uuid": "6379FF04-4542-11EB-8ABB-3B6116B4E0B8",
                        "businessName": "JUVENCIO FRANCISCO BLANCO JUAN",
                        "rfc": "BAJJ8306286A6",
                        "total": 2190,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5223
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5224,
        "createdAt": "2020-12-23 12:43:08",
        "updatedAt": "2020-12-23 12:43:17",
        "version": 1,
        "uuid": "cb5edbf0-6b0c-11eb-901d-775b727d362c",
        "folio": "NTKBCR-5224",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 32
        },
        "chargesDetails": [
            {
                "id": 8043,
                "createdAt": "2020-12-23 12:43:08",
                "updatedAt": "2020-12-23 12:43:08",
                "version": 1,
                "uuid": "cba10f60-6b0c-11eb-95ef-f5a1b150b79f",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n primaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5224
                },
                "schoolPlanPayment": {
                    "id": 14383
                }
            },
            {
                "id": 8044,
                "createdAt": "2020-12-23 12:43:08",
                "updatedAt": "2020-12-23 12:43:08",
                "version": 1,
                "uuid": "cba114c0-6b0c-11eb-871c-0fce0c49b60b",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Primaria",
                "quantity": 1,
                "price": 160,
                "schoolCharge": {
                    "id": 5224
                },
                "schoolPlanPayment": {
                    "id": 14394
                }
            },
            {
                "id": 8045,
                "createdAt": "2020-12-23 12:43:08",
                "updatedAt": "2020-12-23 12:43:08",
                "version": 1,
                "uuid": "cba118e0-6b0c-11eb-a905-11452df2a608",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5224
                },
                "schoolPlanPayment": {
                    "id": 14395
                }
            },
            {
                "id": 8046,
                "createdAt": "2020-12-23 12:43:08",
                "updatedAt": "2020-12-23 12:43:08",
                "version": 1,
                "uuid": "cba11c00-6b0c-11eb-967d-e382fe2a5eb2",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Primaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5224
                },
                "schoolPlanPayment": {
                    "id": 14397
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2020-12-23 12:43:08",
                "updatedAt": "2020-12-23 12:43:17",
                "version": 1,
                "uuid": "cba11ee0-6b0c-11eb-b1b7-db7431bf8c55",
                "folio": "NTKBCR-5224",
                "change": 0,
                "quantity": 1010,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5224
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5230,
                        "createdAt": "2020-12-23 12:43:08",
                        "updatedAt": "2020-12-23 12:43:08",
                        "version": 1,
                        "uuid": "cba121a0-6b0c-11eb-a645-758b0a71f2f6",
                        "codePaymentMethod": "01",
                        "quantity": 1010,
                        "date": "2020-12-23",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 1
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5518,
                        "createdAt": "2020-12-23 12:43:15",
                        "updatedAt": "2020-12-23 12:43:17",
                        "version": 1,
                        "folio": "ACAKMCR-5518",
                        "uuid": "5678E122-4546-11EB-B4DE-1569B1EC21BC",
                        "businessName": "MARIA ELENA NATALIA HERNANDEZ RODRIGUEZ",
                        "rfc": "XAXX010101000",
                        "total": 1010,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5224
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5225,
        "createdAt": "2020-12-23 12:50:58",
        "updatedAt": "2020-12-23 12:51:09",
        "version": 1,
        "uuid": "cba12560-6b0c-11eb-865a-c51835ffe6dc",
        "folio": "NTKBCR-5225",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 144
        },
        "chargesDetails": [
            {
                "id": 8047,
                "createdAt": "2020-12-23 12:50:58",
                "updatedAt": "2020-12-23 12:50:58",
                "version": 1,
                "uuid": "cbe348f0-6b0c-11eb-be08-2fce7a15b9a4",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n primaria",
                "quantity": 1,
                "price": 613,
                "schoolCharge": {
                    "id": 5225
                },
                "schoolPlanPayment": {
                    "id": 14400
                }
            },
            {
                "id": 8048,
                "createdAt": "2020-12-23 12:50:58",
                "updatedAt": "2020-12-23 12:50:58",
                "version": 1,
                "uuid": "cbe34f70-6b0c-11eb-9554-1b2a22f42190",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Primaria",
                "quantity": 1,
                "price": 160,
                "schoolCharge": {
                    "id": 5225
                },
                "schoolPlanPayment": {
                    "id": 14411
                }
            },
            {
                "id": 8049,
                "createdAt": "2020-12-23 12:50:58",
                "updatedAt": "2020-12-23 12:50:58",
                "version": 1,
                "uuid": "cbe35590-6b0c-11eb-a8af-c56780fb14d8",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5225
                },
                "schoolPlanPayment": {
                    "id": 14412
                }
            },
            {
                "id": 8050,
                "createdAt": "2020-12-23 12:50:58",
                "updatedAt": "2020-12-23 12:50:58",
                "version": 1,
                "uuid": "cbe35a90-6b0c-11eb-85da-e562ebca8e21",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Primaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5225
                },
                "schoolPlanPayment": {
                    "id": 14414
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2020-12-23 12:50:58",
                "updatedAt": "2020-12-23 12:51:09",
                "version": 1,
                "uuid": "cbe35e30-6b0c-11eb-83f2-45ae86ea3d50",
                "folio": "NTKBCR-5225",
                "change": 0,
                "quantity": 1273,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5225
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5231,
                        "createdAt": "2020-12-23 12:50:58",
                        "updatedAt": "2020-12-23 12:50:58",
                        "version": 1,
                        "uuid": "cbe362b0-6b0c-11eb-a206-2d7d6e1091a1",
                        "codePaymentMethod": "01",
                        "quantity": 1273,
                        "date": "2020-12-23",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 1
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5519,
                        "createdAt": "2020-12-23 12:51:07",
                        "updatedAt": "2020-12-23 12:51:08",
                        "version": 1,
                        "folio": "ACAKMCR-5519",
                        "uuid": "6F9566AC-4547-11EB-B3FE-D9B454A90807",
                        "businessName": "MARTIN ERNESTO HERNANDEZ RODRIGUEZ",
                        "rfc": "XAXX010101000",
                        "total": 1273,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5225
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5229,
        "createdAt": "2020-12-28 11:20:28",
        "updatedAt": "2020-12-28 11:20:42",
        "version": 1,
        "uuid": "cbe36a00-6b0c-11eb-85bf-13d6ef9d27ad",
        "folio": "NTKBCR-5229",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 647
        },
        "chargesDetails": [
            {
                "id": 8055,
                "createdAt": "2020-12-28 11:20:28",
                "updatedAt": "2020-12-28 11:20:28",
                "version": 1,
                "uuid": "ccb70c60-6b0c-11eb-b7b2-07d692572170",
                "codeConcept": "86121601",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n o Reinscripci\u00f3n Preparatoria",
                "quantity": 1,
                "price": 735,
                "schoolCharge": {
                    "id": 5229
                },
                "schoolPlanPayment": {
                    "id": 14417
                }
            },
            {
                "id": 8056,
                "createdAt": "2020-12-28 11:20:28",
                "updatedAt": "2020-12-28 11:20:28",
                "version": 1,
                "uuid": "ccb71020-6b0c-11eb-aa70-f9b73870ac1d",
                "codeConcept": "86121601",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota Seyc",
                "quantity": 1,
                "price": 200,
                "schoolCharge": {
                    "id": 5229
                },
                "schoolPlanPayment": {
                    "id": 14418
                }
            },
            {
                "id": 8057,
                "createdAt": "2020-12-28 11:20:28",
                "updatedAt": "2020-12-28 11:20:28",
                "version": 1,
                "uuid": "ccb71360-6b0c-11eb-82cd-33e20eb8bc4e",
                "codeConcept": "86121601",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para Padres",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5229
                },
                "schoolPlanPayment": {
                    "id": 14429
                }
            },
            {
                "id": 8058,
                "createdAt": "2020-12-28 11:20:28",
                "updatedAt": "2020-12-28 11:20:28",
                "version": 1,
                "uuid": "ccb717b0-6b0c-11eb-89e6-eb1982911fc7",
                "codeConcept": "86121601",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5229
                },
                "schoolPlanPayment": {
                    "id": 14430
                }
            },
            {
                "id": 8059,
                "createdAt": "2020-12-28 11:20:28",
                "updatedAt": "2020-12-28 11:20:28",
                "version": 1,
                "uuid": "ccb71af0-6b0c-11eb-9e86-d7cfc00ad7f2",
                "codeConcept": "86121601",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de Orfandad",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5229
                },
                "schoolPlanPayment": {
                    "id": 14431
                }
            },
            {
                "id": 8060,
                "createdAt": "2020-12-28 11:20:28",
                "updatedAt": "2020-12-28 11:20:28",
                "version": 1,
                "uuid": "ccb71dc0-6b0c-11eb-a91d-3374f245298d",
                "codeConcept": "86121601",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Prueba de Antidoping",
                "quantity": 1,
                "price": 200,
                "schoolCharge": {
                    "id": 5229
                },
                "schoolPlanPayment": {
                    "id": 14432
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2020-12-28 11:20:28",
                "updatedAt": "2020-12-28 11:20:42",
                "version": 1,
                "uuid": "ccb71fa0-6b0c-11eb-a476-11c1c36e8c34",
                "folio": "NTKBCR-5229",
                "change": 0,
                "quantity": 2135,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5229
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5235,
                        "createdAt": "2020-12-28 11:20:28",
                        "updatedAt": "2020-12-28 11:20:28",
                        "version": 1,
                        "uuid": "ccb72260-6b0c-11eb-8962-13de97657534",
                        "codePaymentMethod": "03",
                        "quantity": 2135,
                        "date": "2020-12-28",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5523,
                        "createdAt": "2020-12-28 11:20:35",
                        "updatedAt": "2020-12-28 11:20:42",
                        "version": 1,
                        "folio": "ACAKMCR-5523",
                        "uuid": "9FAA2C12-4928-11EB-9FB0-2DD7E984FFC0",
                        "businessName": "WILLY SANTIAGO GONZALEZ BIRRUETE",
                        "rfc": "XAXX010101000",
                        "total": 2135,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5229
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5230,
        "createdAt": "2020-12-28 11:30:53",
        "updatedAt": "2020-12-28 11:31:03",
        "version": 1,
        "uuid": "ccb726f0-6b0c-11eb-860b-279aeb972aa1",
        "folio": "NTKBCR-5230",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 334
        },
        "chargesDetails": [
            {
                "id": 8061,
                "createdAt": "2020-12-28 11:30:53",
                "updatedAt": "2020-12-28 11:30:53",
                "version": 1,
                "uuid": "ccfbde10-6b0c-11eb-9b8a-7be3a16ff0ab",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n primaria",
                "quantity": 1,
                "price": 595,
                "schoolCharge": {
                    "id": 5230
                },
                "schoolPlanPayment": {
                    "id": 14435
                }
            },
            {
                "id": 8062,
                "createdAt": "2020-12-28 11:30:53",
                "updatedAt": "2020-12-28 11:30:53",
                "version": 1,
                "uuid": "ccfbe1f0-6b0c-11eb-abd5-77c20d8530a3",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Primaria",
                "quantity": 1,
                "price": 160,
                "schoolCharge": {
                    "id": 5230
                },
                "schoolPlanPayment": {
                    "id": 14446
                }
            },
            {
                "id": 8063,
                "createdAt": "2020-12-28 11:30:53",
                "updatedAt": "2020-12-28 11:30:53",
                "version": 1,
                "uuid": "ccfbe4c0-6b0c-11eb-be5a-270e995a2749",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5230
                },
                "schoolPlanPayment": {
                    "id": 14447
                }
            },
            {
                "id": 8064,
                "createdAt": "2020-12-28 11:30:53",
                "updatedAt": "2020-12-28 11:30:53",
                "version": 1,
                "uuid": "ccfbe770-6b0c-11eb-9d31-950fd5fa1e4d",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Primaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5230
                },
                "schoolPlanPayment": {
                    "id": 14448
                }
            },
            {
                "id": 8065,
                "createdAt": "2020-12-28 11:30:53",
                "updatedAt": "2020-12-28 11:30:53",
                "version": 1,
                "uuid": "ccfbea40-6b0c-11eb-b890-dbdb4b7d56f2",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Primaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5230
                },
                "schoolPlanPayment": {
                    "id": 14449
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2020-12-28 11:30:53",
                "updatedAt": "2020-12-28 11:31:03",
                "version": 1,
                "uuid": "ccfbec10-6b0c-11eb-b102-dd442a6b0ea7",
                "folio": "NTKBCR-5230",
                "change": 0,
                "quantity": 1755,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5230
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5236,
                        "createdAt": "2020-12-28 11:30:53",
                        "updatedAt": "2020-12-28 11:30:53",
                        "version": 1,
                        "uuid": "ccfbef80-6b0c-11eb-a008-f180d5beaf7c",
                        "codePaymentMethod": "03",
                        "quantity": 1755,
                        "date": "2020-12-28",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5524,
                        "createdAt": "2020-12-28 11:31:01",
                        "updatedAt": "2020-12-28 11:31:03",
                        "version": 1,
                        "folio": "ACAKMCR-5524",
                        "uuid": "13475630-492A-11EB-869B-B91FC1E87060",
                        "businessName": "EMILY QUETZALY TUZ ZAPATA",
                        "rfc": "XAXX010101000",
                        "total": 1755,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5230
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5231,
        "createdAt": "2020-12-28 11:51:30",
        "updatedAt": "2020-12-28 11:52:43",
        "version": 1,
        "uuid": "ccfbf390-6b0c-11eb-ba91-45bbc31dc9da",
        "folio": "NTKBCR-5231",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 665
        },
        "chargesDetails": [
            {
                "id": 8066,
                "createdAt": "2020-12-28 11:51:30",
                "updatedAt": "2020-12-28 11:51:30",
                "version": 1,
                "uuid": "cd3d6b80-6b0c-11eb-848d-9f3cd9295a6c",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n preescolar",
                "quantity": 1,
                "price": 280,
                "schoolCharge": {
                    "id": 5231
                },
                "schoolPlanPayment": {
                    "id": 14452
                }
            },
            {
                "id": 8067,
                "createdAt": "2020-12-28 11:51:30",
                "updatedAt": "2020-12-28 11:51:30",
                "version": 1,
                "uuid": "cd3d6fa0-6b0c-11eb-a56f-93af8ad80b19",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Preescolar",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5231
                },
                "schoolPlanPayment": {
                    "id": 14463
                }
            },
            {
                "id": 8068,
                "createdAt": "2020-12-28 11:51:30",
                "updatedAt": "2020-12-28 11:51:30",
                "version": 1,
                "uuid": "cd3d72c0-6b0c-11eb-a8f5-8f0fdb90286a",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5231
                },
                "schoolPlanPayment": {
                    "id": 14464
                }
            },
            {
                "id": 8069,
                "createdAt": "2020-12-28 11:51:30",
                "updatedAt": "2020-12-28 11:51:30",
                "version": 1,
                "uuid": "cd3d7560-6b0c-11eb-bbc9-a3d3837a2fea",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Preescolar",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5231
                },
                "schoolPlanPayment": {
                    "id": 14465
                }
            },
            {
                "id": 8070,
                "createdAt": "2020-12-28 11:51:31",
                "updatedAt": "2020-12-28 11:51:31",
                "version": 1,
                "uuid": "cd3d7800-6b0c-11eb-9da1-ff2ec9ef74ad",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Preescolar",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5231
                },
                "schoolPlanPayment": {
                    "id": 14466
                }
            },
            {
                "id": 8071,
                "createdAt": "2020-12-28 11:51:31",
                "updatedAt": "2020-12-28 11:51:31",
                "version": 1,
                "uuid": "cd3d7ae0-6b0c-11eb-a810-f392bc7b912f",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n preescolar",
                "quantity": 1,
                "price": 200,
                "schoolCharge": {
                    "id": 5231
                },
                "schoolPlanPayment": {
                    "id": 14452
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2020-12-28 11:51:30",
                "updatedAt": "2020-12-28 11:52:43",
                "version": 1,
                "uuid": "cd3d7e00-6b0c-11eb-b51e-6be73a4b4c7a",
                "folio": "NTKBCR-5231",
                "change": 0,
                "quantity": 1630,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5231
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5237,
                        "createdAt": "2020-12-28 11:51:31",
                        "updatedAt": "2020-12-28 11:51:31",
                        "version": 1,
                        "uuid": "cd3d8110-6b0c-11eb-a988-f15667ae3efe",
                        "codePaymentMethod": "03",
                        "quantity": 1630,
                        "date": "2020-12-28",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5525,
                        "createdAt": "2020-12-28 11:52:41",
                        "updatedAt": "2020-12-28 11:52:43",
                        "version": 1,
                        "folio": "ACAKMCR-5525",
                        "uuid": "19F18A48-492D-11EB-B96F-DF851D0D5F9E",
                        "businessName": "AITANA DANAHE CABRERA OCA\u00d1A",
                        "rfc": "XAXX010101000",
                        "total": 1630,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5231
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5232,
        "createdAt": "2020-12-28 12:01:25",
        "updatedAt": "2020-12-28 12:01:40",
        "version": 1,
        "uuid": "cd3d87a0-6b0c-11eb-8cb8-f54bb50d0459",
        "folio": "NTKBCR-5232",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 40
        },
        "chargesDetails": [
            {
                "id": 8072,
                "createdAt": "2020-12-28 12:01:25",
                "updatedAt": "2020-12-28 12:01:25",
                "version": 1,
                "uuid": "cd7fa020-6b0c-11eb-964d-b3cd8a1ce94a",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n primaria",
                "quantity": 1,
                "price": 340,
                "schoolCharge": {
                    "id": 5232
                },
                "schoolPlanPayment": {
                    "id": 14470
                }
            },
            {
                "id": 8073,
                "createdAt": "2020-12-28 12:01:25",
                "updatedAt": "2020-12-28 12:01:25",
                "version": 1,
                "uuid": "cd7fa5a0-6b0c-11eb-812e-4905a6f8265d",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Primaria",
                "quantity": 1,
                "price": 160,
                "schoolCharge": {
                    "id": 5232
                },
                "schoolPlanPayment": {
                    "id": 14481
                }
            },
            {
                "id": 8074,
                "createdAt": "2020-12-28 12:01:25",
                "updatedAt": "2020-12-28 12:01:25",
                "version": 1,
                "uuid": "cd7faa30-6b0c-11eb-ada8-49bffd5b3e0b",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5232
                },
                "schoolPlanPayment": {
                    "id": 14482
                }
            },
            {
                "id": 8075,
                "createdAt": "2020-12-28 12:01:25",
                "updatedAt": "2020-12-28 12:01:25",
                "version": 1,
                "uuid": "cd7faf00-6b0c-11eb-90f0-87a16b66494f",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Primaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5232
                },
                "schoolPlanPayment": {
                    "id": 14483
                }
            },
            {
                "id": 8076,
                "createdAt": "2020-12-28 12:01:25",
                "updatedAt": "2020-12-28 12:01:25",
                "version": 1,
                "uuid": "cd7fb360-6b0c-11eb-b136-9121b37c85bb",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Primaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5232
                },
                "schoolPlanPayment": {
                    "id": 14484
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2020-12-28 12:01:25",
                "updatedAt": "2020-12-28 12:01:40",
                "version": 1,
                "uuid": "cd7fb610-6b0c-11eb-a739-353ce860489b",
                "folio": "NTKBCR-5232",
                "change": 0,
                "quantity": 1500,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5232
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5238,
                        "createdAt": "2020-12-28 12:01:25",
                        "updatedAt": "2020-12-28 12:01:25",
                        "version": 1,
                        "uuid": "cd7fba00-6b0c-11eb-a10f-1375be229b2c",
                        "codePaymentMethod": "03",
                        "quantity": 1500,
                        "date": "2020-12-28",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5526,
                        "createdAt": "2020-12-28 12:01:39",
                        "updatedAt": "2020-12-28 12:01:40",
                        "version": 1,
                        "folio": "ACAKMCR-5526",
                        "uuid": "5A86AF60-492E-11EB-9213-D9CE8E4C8EA0",
                        "businessName": "VEGE981005MQRLLS04",
                        "rfc": "XAXX010101000",
                        "total": 1500,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5232
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5233,
        "createdAt": "2020-12-28 12:03:17",
        "updatedAt": "2020-12-28 12:03:26",
        "version": 1,
        "uuid": "cd7fc040-6b0c-11eb-874b-7f8270b1f57f",
        "folio": "NTKBCR-5233",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 40
        },
        "chargesDetails": [
            {
                "id": 8077,
                "createdAt": "2020-12-28 12:03:17",
                "updatedAt": "2020-12-28 12:03:17",
                "version": 1,
                "uuid": "cdc0f6d0-6b0c-11eb-a209-b332ea78cc82",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n primaria",
                "quantity": 1,
                "price": 10,
                "schoolCharge": {
                    "id": 5233
                },
                "schoolPlanPayment": {
                    "id": 14470
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2020-12-28 12:03:17",
                "updatedAt": "2020-12-28 12:03:26",
                "version": 1,
                "uuid": "cdc0fb00-6b0c-11eb-b02f-a9cf71a14dd1",
                "folio": "NTKBCR-5233",
                "change": 0,
                "quantity": 10,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5233
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5239,
                        "createdAt": "2020-12-28 12:03:17",
                        "updatedAt": "2020-12-28 12:03:17",
                        "version": 1,
                        "uuid": "cdc0ff70-6b0c-11eb-92a6-5b1f3aa56b88",
                        "codePaymentMethod": "03",
                        "quantity": 10,
                        "date": "2020-12-28",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5527,
                        "createdAt": "2020-12-28 12:03:22",
                        "updatedAt": "2020-12-28 12:03:26",
                        "version": 1,
                        "folio": "ACAKMCR-5527",
                        "uuid": "98A7356C-492E-11EB-85DB-AD12A423C794",
                        "businessName": "VEGE981005MQRLLS04",
                        "rfc": "XAXX010101000",
                        "total": 10,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5233
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5246,
        "createdAt": "2020-12-29 11:46:23",
        "updatedAt": "2020-12-29 11:47:28",
        "version": 1,
        "uuid": "cdc105a0-6b0c-11eb-898f-5b76b1a33842",
        "folio": "NTKBCR-5246",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 666
        },
        "chargesDetails": [
            {
                "id": 8090,
                "createdAt": "2020-12-29 11:46:23",
                "updatedAt": "2020-12-29 11:46:23",
                "version": 1,
                "uuid": "ce047ac0-6b0c-11eb-a44b-834eb41a9768",
                "codeConcept": "86121601",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n o Reinscripci\u00f3n Preparatoria",
                "quantity": 1,
                "price": 850,
                "schoolCharge": {
                    "id": 5246
                },
                "schoolPlanPayment": {
                    "id": 14488
                }
            },
            {
                "id": 8091,
                "createdAt": "2020-12-29 11:46:23",
                "updatedAt": "2020-12-29 11:46:23",
                "version": 1,
                "uuid": "ce047e70-6b0c-11eb-a08d-737d0e4887fa",
                "codeConcept": "86121601",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota Seyc",
                "quantity": 1,
                "price": 200,
                "schoolCharge": {
                    "id": 5246
                },
                "schoolPlanPayment": {
                    "id": 14489
                }
            },
            {
                "id": 8092,
                "createdAt": "2020-12-29 11:46:23",
                "updatedAt": "2020-12-29 11:46:23",
                "version": 1,
                "uuid": "ce048280-6b0c-11eb-96ad-2febce91baa9",
                "codeConcept": "86121601",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para Padres",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5246
                },
                "schoolPlanPayment": {
                    "id": 14502
                }
            },
            {
                "id": 8093,
                "createdAt": "2020-12-29 11:46:23",
                "updatedAt": "2020-12-29 11:46:23",
                "version": 1,
                "uuid": "ce048720-6b0c-11eb-9643-ff7615524fda",
                "codeConcept": "86121601",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5246
                },
                "schoolPlanPayment": {
                    "id": 14503
                }
            },
            {
                "id": 8094,
                "createdAt": "2020-12-29 11:46:23",
                "updatedAt": "2020-12-29 11:46:23",
                "version": 1,
                "uuid": "ce048b10-6b0c-11eb-91d6-a7a821e74f16",
                "codeConcept": "86121601",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de Orfandad",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5246
                },
                "schoolPlanPayment": {
                    "id": 14504
                }
            },
            {
                "id": 8095,
                "createdAt": "2020-12-29 11:46:23",
                "updatedAt": "2020-12-29 11:46:23",
                "version": 1,
                "uuid": "ce049110-6b0c-11eb-9780-add478ec9f02",
                "codeConcept": "86121601",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Prueba de Antidoping",
                "quantity": 1,
                "price": 200,
                "schoolCharge": {
                    "id": 5246
                },
                "schoolPlanPayment": {
                    "id": 14505
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2020-12-29 11:46:23",
                "updatedAt": "2020-12-29 11:47:28",
                "version": 1,
                "uuid": "ce0494d0-6b0c-11eb-bd93-d5ce8687c220",
                "folio": "NTKBCR-5246",
                "change": 0,
                "quantity": 2250,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5246
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5252,
                        "createdAt": "2020-12-29 11:46:23",
                        "updatedAt": "2020-12-29 11:46:23",
                        "version": 1,
                        "uuid": "ce049830-6b0c-11eb-aa95-853d1536512e",
                        "codePaymentMethod": "03",
                        "quantity": 2250,
                        "date": "2020-12-29",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5540,
                        "createdAt": "2020-12-29 11:47:26",
                        "updatedAt": "2020-12-29 11:47:28",
                        "version": 1,
                        "folio": "ACAKMCR-5540",
                        "uuid": "88CA9B8A-49F5-11EB-AF10-25BEEB7E243E",
                        "businessName": "BRENDA  SUSANA RIVERON CABELLO",
                        "rfc": "XAXX010101000",
                        "total": 2250,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5246
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5247,
        "createdAt": "2020-12-29 11:55:17",
        "updatedAt": "2020-12-29 11:55:35",
        "version": 1,
        "uuid": "ce049cd0-6b0c-11eb-a7ec-657fab1850b6",
        "folio": "NTKBCR-5247",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 218
        },
        "chargesDetails": [
            {
                "id": 8096,
                "createdAt": "2020-12-29 11:55:17",
                "updatedAt": "2020-12-29 11:55:17",
                "version": 1,
                "uuid": "ce46d760-6b0c-11eb-bd44-c11b473ac995",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "inscripci\u00f3n o Reinscripci\u00f3n Secundaria",
                "quantity": 1,
                "price": 210,
                "schoolCharge": {
                    "id": 5247
                },
                "schoolPlanPayment": {
                    "id": 14525
                }
            },
            {
                "id": 8097,
                "createdAt": "2020-12-29 11:55:17",
                "updatedAt": "2020-12-29 11:55:17",
                "version": 1,
                "uuid": "ce46dd50-6b0c-11eb-81aa-3334343857db",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "CUOTA SEQ",
                "quantity": 1,
                "price": 200,
                "schoolCharge": {
                    "id": 5247
                },
                "schoolPlanPayment": {
                    "id": 14536
                }
            },
            {
                "id": 8098,
                "createdAt": "2020-12-29 11:55:17",
                "updatedAt": "2020-12-29 11:55:17",
                "version": 1,
                "uuid": "ce46e200-6b0c-11eb-83e9-0da261674518",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "ESCUELA PARA PADRES",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5247
                },
                "schoolPlanPayment": {
                    "id": 14537
                }
            },
            {
                "id": 8099,
                "createdAt": "2020-12-29 11:55:17",
                "updatedAt": "2020-12-29 11:55:17",
                "version": 1,
                "uuid": "ce46e680-6b0c-11eb-9c10-4708cc6b8344",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Secundaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5247
                },
                "schoolPlanPayment": {
                    "id": 14538
                }
            },
            {
                "id": 8100,
                "createdAt": "2020-12-29 11:55:17",
                "updatedAt": "2020-12-29 11:55:17",
                "version": 1,
                "uuid": "ce46eae0-6b0c-11eb-a402-eba72471e8c1",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Secundaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5247
                },
                "schoolPlanPayment": {
                    "id": 14539
                }
            },
            {
                "id": 8101,
                "createdAt": "2020-12-29 11:55:17",
                "updatedAt": "2020-12-29 11:55:17",
                "version": 1,
                "uuid": "ce46ef60-6b0c-11eb-84d6-535c88859b9c",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Prueba de Antidoping (Tercer grado)",
                "quantity": 1,
                "price": 200,
                "schoolCharge": {
                    "id": 5247
                },
                "schoolPlanPayment": {
                    "id": 14540
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2020-12-29 11:55:17",
                "updatedAt": "2020-12-29 11:55:35",
                "version": 1,
                "uuid": "ce46f240-6b0c-11eb-b22f-b5d084770c87",
                "folio": "NTKBCR-5247",
                "change": 0,
                "quantity": 1610,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5247
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5253,
                        "createdAt": "2020-12-29 11:55:17",
                        "updatedAt": "2020-12-29 11:55:17",
                        "version": 1,
                        "uuid": "ce46f660-6b0c-11eb-a80e-69618336a577",
                        "codePaymentMethod": "03",
                        "quantity": 1610,
                        "date": "2020-12-29",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5541,
                        "createdAt": "2020-12-29 11:55:24",
                        "updatedAt": "2020-12-29 11:55:35",
                        "version": 1,
                        "folio": "ACAKMCR-5541",
                        "uuid": "A80C4C40-49F6-11EB-80C7-051F9C184B61",
                        "businessName": "BENITEZ GOMEZ SILVIA REGINA",
                        "rfc": "BEGS7711035S7",
                        "total": 1610,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5247
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5248,
        "createdAt": "2020-12-29 12:02:29",
        "updatedAt": "2020-12-29 12:02:40",
        "version": 1,
        "uuid": "ce46fc80-6b0c-11eb-be48-9f8f2d6efccd",
        "folio": "NTKBCR-5248",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 14
        },
        "chargesDetails": [
            {
                "id": 8102,
                "createdAt": "2020-12-29 12:02:29",
                "updatedAt": "2020-12-29 12:02:29",
                "version": 1,
                "uuid": "ce8dc550-6b0c-11eb-9cb4-0962056b5af7",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n primaria",
                "quantity": 1,
                "price": 210,
                "schoolCharge": {
                    "id": 5248
                },
                "schoolPlanPayment": {
                    "id": 14543
                }
            },
            {
                "id": 8103,
                "createdAt": "2020-12-29 12:02:29",
                "updatedAt": "2020-12-29 12:02:29",
                "version": 1,
                "uuid": "ce8dcb90-6b0c-11eb-b8ad-251783505c7b",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Primaria",
                "quantity": 1,
                "price": 160,
                "schoolCharge": {
                    "id": 5248
                },
                "schoolPlanPayment": {
                    "id": 14554
                }
            },
            {
                "id": 8104,
                "createdAt": "2020-12-29 12:02:29",
                "updatedAt": "2020-12-29 12:02:29",
                "version": 1,
                "uuid": "ce8dd0a0-6b0c-11eb-ba7c-655edf7d07e6",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5248
                },
                "schoolPlanPayment": {
                    "id": 14555
                }
            },
            {
                "id": 8105,
                "createdAt": "2020-12-29 12:02:29",
                "updatedAt": "2020-12-29 12:02:29",
                "version": 1,
                "uuid": "ce8dd540-6b0c-11eb-95f5-b9d8741dcc8e",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Primaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5248
                },
                "schoolPlanPayment": {
                    "id": 14556
                }
            },
            {
                "id": 8106,
                "createdAt": "2020-12-29 12:02:29",
                "updatedAt": "2020-12-29 12:02:29",
                "version": 1,
                "uuid": "ce8dd9d0-6b0c-11eb-be4c-778e6acd16b1",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Primaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5248
                },
                "schoolPlanPayment": {
                    "id": 14557
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2020-12-29 12:02:29",
                "updatedAt": "2020-12-29 12:02:40",
                "version": 1,
                "uuid": "ce8ddcf0-6b0c-11eb-812e-cddaff8a3410",
                "folio": "NTKBCR-5248",
                "change": 0,
                "quantity": 1370,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5248
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5254,
                        "createdAt": "2020-12-29 12:02:30",
                        "updatedAt": "2020-12-29 12:02:30",
                        "version": 1,
                        "uuid": "ce8de2d0-6b0c-11eb-a787-05e7b0f77dc1",
                        "codePaymentMethod": "03",
                        "quantity": 1370,
                        "date": "2020-12-29",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5542,
                        "createdAt": "2020-12-29 12:02:38",
                        "updatedAt": "2020-12-29 12:02:40",
                        "version": 1,
                        "folio": "ACAKMCR-5542",
                        "uuid": "A86369A2-49F7-11EB-91E7-897790DAB240",
                        "businessName": "SOFIA VALENTINA CANUL GOMEZ",
                        "rfc": "XAXX010101000",
                        "total": 1370,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5248
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5249,
        "createdAt": "2020-12-29 12:07:22",
        "updatedAt": "2020-12-29 12:07:33",
        "version": 1,
        "uuid": "ce8de980-6b0c-11eb-b914-fb2b55ab0e0b",
        "folio": "NTKBCR-5249",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 206
        },
        "chargesDetails": [
            {
                "id": 8107,
                "createdAt": "2020-12-29 12:07:22",
                "updatedAt": "2020-12-29 12:07:22",
                "version": 1,
                "uuid": "ced04e80-6b0c-11eb-afb9-a5043768e104",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "inscripci\u00f3n o Reinscripci\u00f3n Secundaria",
                "quantity": 1,
                "price": 665,
                "schoolCharge": {
                    "id": 5249
                },
                "schoolPlanPayment": {
                    "id": 14560
                }
            },
            {
                "id": 8108,
                "createdAt": "2020-12-29 12:07:22",
                "updatedAt": "2020-12-29 12:07:22",
                "version": 1,
                "uuid": "ced05260-6b0c-11eb-91ff-55bb2b82367b",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "CUOTA SEQ",
                "quantity": 1,
                "price": 200,
                "schoolCharge": {
                    "id": 5249
                },
                "schoolPlanPayment": {
                    "id": 14571
                }
            },
            {
                "id": 8109,
                "createdAt": "2020-12-29 12:07:22",
                "updatedAt": "2020-12-29 12:07:22",
                "version": 1,
                "uuid": "ced056c0-6b0c-11eb-9eb7-3f2ceec63368",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "ESCUELA PARA PADRES",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5249
                },
                "schoolPlanPayment": {
                    "id": 14572
                }
            },
            {
                "id": 8110,
                "createdAt": "2020-12-29 12:07:22",
                "updatedAt": "2020-12-29 12:07:22",
                "version": 1,
                "uuid": "ced059f0-6b0c-11eb-b192-c58f27a9e993",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Secundaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5249
                },
                "schoolPlanPayment": {
                    "id": 14573
                }
            },
            {
                "id": 8111,
                "createdAt": "2020-12-29 12:07:22",
                "updatedAt": "2020-12-29 12:07:22",
                "version": 1,
                "uuid": "ced05e00-6b0c-11eb-a4a6-e9b23f113ce0",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Secundaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5249
                },
                "schoolPlanPayment": {
                    "id": 14574
                }
            },
            {
                "id": 8112,
                "createdAt": "2020-12-29 12:07:22",
                "updatedAt": "2020-12-29 12:07:22",
                "version": 1,
                "uuid": "ced06120-6b0c-11eb-b070-395f90a6298b",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Prueba de Antidoping (Tercer grado)",
                "quantity": 1,
                "price": 200,
                "schoolCharge": {
                    "id": 5249
                },
                "schoolPlanPayment": {
                    "id": 14575
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2020-12-29 12:07:22",
                "updatedAt": "2020-12-29 12:07:33",
                "version": 1,
                "uuid": "ced06360-6b0c-11eb-b26b-0b5b99e92526",
                "folio": "NTKBCR-5249",
                "change": 0,
                "quantity": 2065,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5249
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5255,
                        "createdAt": "2020-12-29 12:07:22",
                        "updatedAt": "2020-12-29 12:07:22",
                        "version": 1,
                        "uuid": "ced06760-6b0c-11eb-9fc9-efd2848e9086",
                        "codePaymentMethod": "03",
                        "quantity": 2065,
                        "date": "2020-12-29",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5543,
                        "createdAt": "2020-12-29 12:07:31",
                        "updatedAt": "2020-12-29 12:07:33",
                        "version": 1,
                        "folio": "ACAKMCR-5543",
                        "uuid": "56C89558-49F8-11EB-B461-0559EEC5CAD0",
                        "businessName": "JOANA GUADALUPE CANUL GOMEZ",
                        "rfc": "XAXX010101000",
                        "total": 2065,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5249
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5250,
        "createdAt": "2020-12-29 12:12:00",
        "updatedAt": "2020-12-29 12:12:11",
        "version": 1,
        "uuid": "ced06ae0-6b0c-11eb-be7b-ffd1003952cc",
        "folio": "NTKBCR-5250",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 531
        },
        "chargesDetails": [
            {
                "id": 8113,
                "createdAt": "2020-12-29 12:12:00",
                "updatedAt": "2020-12-29 12:12:00",
                "version": 1,
                "uuid": "cf12a740-6b0c-11eb-a70a-e1f991a8433f",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n primaria",
                "quantity": 1,
                "price": 210,
                "schoolCharge": {
                    "id": 5250
                },
                "schoolPlanPayment": {
                    "id": 14578
                }
            },
            {
                "id": 8114,
                "createdAt": "2020-12-29 12:12:00",
                "updatedAt": "2020-12-29 12:12:00",
                "version": 1,
                "uuid": "cf12ab20-6b0c-11eb-a266-c5b25cd19290",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Primaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5250
                },
                "schoolPlanPayment": {
                    "id": 14592
                }
            },
            {
                "id": 8115,
                "createdAt": "2020-12-29 12:12:00",
                "updatedAt": "2020-12-29 12:12:00",
                "version": 1,
                "uuid": "cf12ae00-6b0c-11eb-9685-8fa73dc29a72",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Primaria",
                "quantity": 1,
                "price": 160,
                "schoolCharge": {
                    "id": 5250
                },
                "schoolPlanPayment": {
                    "id": 14589
                }
            },
            {
                "id": 8116,
                "createdAt": "2020-12-29 12:12:00",
                "updatedAt": "2020-12-29 12:12:00",
                "version": 1,
                "uuid": "cf12b080-6b0c-11eb-9a99-97380ef7cace",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5250
                },
                "schoolPlanPayment": {
                    "id": 14590
                }
            },
            {
                "id": 8117,
                "createdAt": "2020-12-29 12:12:00",
                "updatedAt": "2020-12-29 12:12:00",
                "version": 1,
                "uuid": "cf12b310-6b0c-11eb-a5ba-05a2ff71dca9",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Primaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5250
                },
                "schoolPlanPayment": {
                    "id": 14591
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2020-12-29 12:12:00",
                "updatedAt": "2020-12-29 12:12:11",
                "version": 1,
                "uuid": "cf12b4c0-6b0c-11eb-b63b-6b610df584b0",
                "folio": "NTKBCR-5250",
                "change": 0,
                "quantity": 1370,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5250
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5256,
                        "createdAt": "2020-12-29 12:12:00",
                        "updatedAt": "2020-12-29 12:12:00",
                        "version": 1,
                        "uuid": "cf12b750-6b0c-11eb-94a1-dfb8c2760793",
                        "codePaymentMethod": "03",
                        "quantity": 1370,
                        "date": "2020-12-29",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5544,
                        "createdAt": "2020-12-29 12:12:08",
                        "updatedAt": "2020-12-29 12:12:11",
                        "version": 1,
                        "folio": "ACAKMCR-5544",
                        "uuid": "FC7C1682-49F8-11EB-A949-69CD94CC5501",
                        "businessName": "YANETH YERALDIN GOMEZ KU",
                        "rfc": "XAXX010101000",
                        "total": 1370,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5250
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5251,
        "createdAt": "2020-12-29 12:22:17",
        "updatedAt": "2020-12-29 12:22:42",
        "version": 1,
        "uuid": "cf12bba0-6b0c-11eb-8cda-2588bdce5c52",
        "folio": "NTKBCR-5251",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 602
        },
        "chargesDetails": [
            {
                "id": 8118,
                "createdAt": "2020-12-29 12:22:17",
                "updatedAt": "2020-12-29 12:22:17",
                "version": 1,
                "uuid": "cf53a570-6b0c-11eb-a9cd-3187f6519b06",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n primaria",
                "quantity": 1,
                "price": 1225,
                "schoolCharge": {
                    "id": 5251
                },
                "schoolPlanPayment": {
                    "id": 14595
                }
            },
            {
                "id": 8119,
                "createdAt": "2020-12-29 12:22:17",
                "updatedAt": "2020-12-29 12:22:17",
                "version": 1,
                "uuid": "cf53aa60-6b0c-11eb-a79a-bb963837c0c1",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Primaria",
                "quantity": 1,
                "price": 160,
                "schoolCharge": {
                    "id": 5251
                },
                "schoolPlanPayment": {
                    "id": 14606
                }
            },
            {
                "id": 8120,
                "createdAt": "2020-12-29 12:22:17",
                "updatedAt": "2020-12-29 12:22:17",
                "version": 1,
                "uuid": "cf53ae40-6b0c-11eb-bc30-17ecf9b1929d",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5251
                },
                "schoolPlanPayment": {
                    "id": 14607
                }
            },
            {
                "id": 8121,
                "createdAt": "2020-12-29 12:22:17",
                "updatedAt": "2020-12-29 12:22:17",
                "version": 1,
                "uuid": "cf53b1b0-6b0c-11eb-b204-1744c1b9bc9e",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Primaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5251
                },
                "schoolPlanPayment": {
                    "id": 14608
                }
            },
            {
                "id": 8122,
                "createdAt": "2020-12-29 12:22:17",
                "updatedAt": "2020-12-29 12:22:17",
                "version": 1,
                "uuid": "cf53b550-6b0c-11eb-a2ea-45f596ef02f6",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Primaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5251
                },
                "schoolPlanPayment": {
                    "id": 14609
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2020-12-29 12:22:17",
                "updatedAt": "2020-12-29 12:22:42",
                "version": 1,
                "uuid": "cf53b930-6b0c-11eb-8591-5f224529da05",
                "folio": "NTKBCR-5251",
                "change": 0,
                "quantity": 2385,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5251
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5257,
                        "createdAt": "2020-12-29 12:22:17",
                        "updatedAt": "2020-12-29 12:22:17",
                        "version": 1,
                        "uuid": "cf53be20-6b0c-11eb-8fd2-3bfe97567290",
                        "codePaymentMethod": "03",
                        "quantity": 2385,
                        "date": "2020-12-29",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5545,
                        "createdAt": "2020-12-29 12:22:36",
                        "updatedAt": "2020-12-29 12:22:42",
                        "version": 1,
                        "folio": "ACAKMCR-5545",
                        "uuid": "751CE2A0-49FA-11EB-9F22-DD22D925A97B",
                        "businessName": "ANA LUCIA AKE DEGANTE",
                        "rfc": "XAXX010101000",
                        "total": 2385,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5251
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5252,
        "createdAt": "2020-12-29 12:34:59",
        "updatedAt": "2020-12-29 12:35:08",
        "version": 1,
        "uuid": "cf53c250-6b0c-11eb-b98c-19000cb40fbb",
        "folio": "NTKBCR-5252",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 547
        },
        "chargesDetails": [
            {
                "id": 8123,
                "createdAt": "2020-12-29 12:35:00",
                "updatedAt": "2020-12-29 12:35:00",
                "version": 1,
                "uuid": "cf957b40-6b0c-11eb-a05f-497353582868",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n preescolar",
                "quantity": 1,
                "price": 525,
                "schoolCharge": {
                    "id": 5252
                },
                "schoolPlanPayment": {
                    "id": 14612
                }
            },
            {
                "id": 8124,
                "createdAt": "2020-12-29 12:35:00",
                "updatedAt": "2020-12-29 12:35:00",
                "version": 1,
                "uuid": "cf957fe0-6b0c-11eb-a191-09931e7daa92",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Preescolar",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5252
                },
                "schoolPlanPayment": {
                    "id": 14623
                }
            },
            {
                "id": 8125,
                "createdAt": "2020-12-29 12:35:00",
                "updatedAt": "2020-12-29 12:35:00",
                "version": 1,
                "uuid": "cf9584b0-6b0c-11eb-89f2-57fd6d71c97a",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5252
                },
                "schoolPlanPayment": {
                    "id": 14624
                }
            },
            {
                "id": 8126,
                "createdAt": "2020-12-29 12:35:00",
                "updatedAt": "2020-12-29 12:35:00",
                "version": 1,
                "uuid": "cf958850-6b0c-11eb-a543-e9df9db99c20",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Preescolar",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5252
                },
                "schoolPlanPayment": {
                    "id": 14625
                }
            },
            {
                "id": 8127,
                "createdAt": "2020-12-29 12:35:00",
                "updatedAt": "2020-12-29 12:35:00",
                "version": 1,
                "uuid": "cf958c10-6b0c-11eb-9fa7-73e9802ccf95",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Preescolar",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5252
                },
                "schoolPlanPayment": {
                    "id": 14626
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2020-12-29 12:34:59",
                "updatedAt": "2020-12-29 12:35:08",
                "version": 1,
                "uuid": "cf958ee0-6b0c-11eb-93aa-8d379a7ceda8",
                "folio": "NTKBCR-5252",
                "change": 0,
                "quantity": 1675,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5252
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5258,
                        "createdAt": "2020-12-29 12:35:00",
                        "updatedAt": "2020-12-29 12:35:00",
                        "version": 1,
                        "uuid": "cf959220-6b0c-11eb-b682-71f858a56293",
                        "codePaymentMethod": "03",
                        "quantity": 1675,
                        "date": "2020-12-29",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5546,
                        "createdAt": "2020-12-29 12:35:06",
                        "updatedAt": "2020-12-29 12:35:08",
                        "version": 1,
                        "folio": "ACAKMCR-5546",
                        "uuid": "316095A0-49FC-11EB-8C55-43A48B9BDFAE",
                        "businessName": "MILTON YOEL MERINO OVALLES",
                        "rfc": "XAXX010101000",
                        "total": 1675,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5252
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5253,
        "createdAt": "2020-12-29 12:50:57",
        "updatedAt": "2020-12-29 12:51:05",
        "version": 1,
        "uuid": "cf9596c0-6b0c-11eb-b000-85317baaad53",
        "folio": "NTKBCR-5253",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 639
        },
        "chargesDetails": [
            {
                "id": 8128,
                "createdAt": "2020-12-29 12:50:57",
                "updatedAt": "2020-12-29 12:50:57",
                "version": 1,
                "uuid": "d06cb000-6b0c-11eb-9c7b-435ff175d01e",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n primaria",
                "quantity": 1,
                "price": 1225,
                "schoolCharge": {
                    "id": 5253
                },
                "schoolPlanPayment": {
                    "id": 14629
                }
            },
            {
                "id": 8129,
                "createdAt": "2020-12-29 12:50:57",
                "updatedAt": "2020-12-29 12:50:57",
                "version": 1,
                "uuid": "d06cb5c0-6b0c-11eb-975e-a9c4bc37a114",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Primaria",
                "quantity": 1,
                "price": 160,
                "schoolCharge": {
                    "id": 5253
                },
                "schoolPlanPayment": {
                    "id": 14640
                }
            },
            {
                "id": 8130,
                "createdAt": "2020-12-29 12:50:57",
                "updatedAt": "2020-12-29 12:50:57",
                "version": 1,
                "uuid": "d06cba20-6b0c-11eb-92c8-41fcf878c9f2",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5253
                },
                "schoolPlanPayment": {
                    "id": 14641
                }
            },
            {
                "id": 8131,
                "createdAt": "2020-12-29 12:50:58",
                "updatedAt": "2020-12-29 12:50:58",
                "version": 1,
                "uuid": "d06cbec0-6b0c-11eb-8314-6f36bfabe11d",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Primaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5253
                },
                "schoolPlanPayment": {
                    "id": 14642
                }
            },
            {
                "id": 8132,
                "createdAt": "2020-12-29 12:50:58",
                "updatedAt": "2020-12-29 12:50:58",
                "version": 1,
                "uuid": "d06cc340-6b0c-11eb-9698-5ddac44f1956",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Primaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5253
                },
                "schoolPlanPayment": {
                    "id": 14643
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2020-12-29 12:50:57",
                "updatedAt": "2020-12-29 12:51:05",
                "version": 1,
                "uuid": "d06cc610-6b0c-11eb-ada4-bbdc8f58af4e",
                "folio": "NTKBCR-5253",
                "change": 0,
                "quantity": 2385,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5253
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5259,
                        "createdAt": "2020-12-29 12:50:58",
                        "updatedAt": "2020-12-29 12:50:58",
                        "version": 1,
                        "uuid": "d06cca30-6b0c-11eb-8c85-e12379d7b1a6",
                        "codePaymentMethod": "03",
                        "quantity": 2385,
                        "date": "2020-12-29",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5547,
                        "createdAt": "2020-12-29 12:51:03",
                        "updatedAt": "2020-12-29 12:51:05",
                        "version": 1,
                        "folio": "ACAKMCR-5547",
                        "uuid": "6C1AFE36-49FE-11EB-88E9-3DEC15E88597",
                        "businessName": "ITZEL NATIVIDAD ORTIZ BAAK",
                        "rfc": "XAXX010101000",
                        "total": 2385,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5253
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5254,
        "createdAt": "2020-12-29 12:52:46",
        "updatedAt": "2020-12-29 12:52:53",
        "version": 1,
        "uuid": "d06cd040-6b0c-11eb-a468-abb8677eba7b",
        "folio": "NTKBCR-5254",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 619
        },
        "chargesDetails": [
            {
                "id": 8133,
                "createdAt": "2020-12-29 12:52:46",
                "updatedAt": "2020-12-29 12:52:46",
                "version": 1,
                "uuid": "d0ad7890-6b0c-11eb-a058-4988c254c44d",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n primaria",
                "quantity": 1,
                "price": 613,
                "schoolCharge": {
                    "id": 5254
                },
                "schoolPlanPayment": {
                    "id": 14508
                }
            },
            {
                "id": 8134,
                "createdAt": "2020-12-29 12:52:46",
                "updatedAt": "2020-12-29 12:52:46",
                "version": 1,
                "uuid": "d0ad7c70-6b0c-11eb-bb1b-fd713512679a",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Primaria",
                "quantity": 1,
                "price": 160,
                "schoolCharge": {
                    "id": 5254
                },
                "schoolPlanPayment": {
                    "id": 14519
                }
            },
            {
                "id": 8135,
                "createdAt": "2020-12-29 12:52:46",
                "updatedAt": "2020-12-29 12:52:46",
                "version": 1,
                "uuid": "d0ad7f40-6b0c-11eb-b439-1bd95a8ba69a",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5254
                },
                "schoolPlanPayment": {
                    "id": 14520
                }
            },
            {
                "id": 8136,
                "createdAt": "2020-12-29 12:52:46",
                "updatedAt": "2020-12-29 12:52:46",
                "version": 1,
                "uuid": "d0ad81e0-6b0c-11eb-8656-49013636a8f1",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Primaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5254
                },
                "schoolPlanPayment": {
                    "id": 14521
                }
            },
            {
                "id": 8137,
                "createdAt": "2020-12-29 12:52:46",
                "updatedAt": "2020-12-29 12:52:46",
                "version": 1,
                "uuid": "d0ad8480-6b0c-11eb-9989-c1c8b98d6490",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Primaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5254
                },
                "schoolPlanPayment": {
                    "id": 14522
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2020-12-29 12:52:46",
                "updatedAt": "2020-12-29 12:52:53",
                "version": 1,
                "uuid": "d0ad8650-6b0c-11eb-8cd9-695f8e123469",
                "folio": "NTKBCR-5254",
                "change": 0,
                "quantity": 1773,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5254
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5260,
                        "createdAt": "2020-12-29 12:52:46",
                        "updatedAt": "2020-12-29 12:52:46",
                        "version": 1,
                        "uuid": "d0ad8900-6b0c-11eb-8bba-fb3ce2f7b4a2",
                        "codePaymentMethod": "03",
                        "quantity": 1773,
                        "date": "2020-12-29",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5548,
                        "createdAt": "2020-12-29 12:52:51",
                        "updatedAt": "2020-12-29 12:52:53",
                        "version": 1,
                        "folio": "ACAKMCR-5548",
                        "uuid": "AC2B3E46-49FE-11EB-80FE-6F5D80EC34E1",
                        "businessName": "CARLOS SAMUEL CAN CABALLERO",
                        "rfc": "XAXX010101000",
                        "total": 1773,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5254
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5255,
        "createdAt": "2020-12-29 13:21:40",
        "updatedAt": "2020-12-29 13:21:49",
        "version": 1,
        "uuid": "d0ad8d00-6b0c-11eb-b2f4-e7bfb90140c0",
        "folio": "NTKBCR-5255",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 127
        },
        "chargesDetails": [
            {
                "id": 8138,
                "createdAt": "2020-12-29 13:21:40",
                "updatedAt": "2020-12-29 13:21:40",
                "version": 1,
                "uuid": "d0ef86c0-6b0c-11eb-af0e-af4db615cb00",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n primaria",
                "quantity": 1,
                "price": 700,
                "schoolCharge": {
                    "id": 5255
                },
                "schoolPlanPayment": {
                    "id": 14646
                }
            },
            {
                "id": 8139,
                "createdAt": "2020-12-29 13:21:40",
                "updatedAt": "2020-12-29 13:21:40",
                "version": 1,
                "uuid": "d0ef8ae0-6b0c-11eb-9ea6-858999a75183",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Primaria",
                "quantity": 1,
                "price": 160,
                "schoolCharge": {
                    "id": 5255
                },
                "schoolPlanPayment": {
                    "id": 14657
                }
            },
            {
                "id": 8140,
                "createdAt": "2020-12-29 13:21:40",
                "updatedAt": "2020-12-29 13:21:40",
                "version": 1,
                "uuid": "d0ef8dd0-6b0c-11eb-a22a-f1c853e3b598",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5255
                },
                "schoolPlanPayment": {
                    "id": 14658
                }
            },
            {
                "id": 8141,
                "createdAt": "2020-12-29 13:21:40",
                "updatedAt": "2020-12-29 13:21:40",
                "version": 1,
                "uuid": "d0ef90d0-6b0c-11eb-b219-876541ca8952",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Primaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5255
                },
                "schoolPlanPayment": {
                    "id": 14659
                }
            },
            {
                "id": 8142,
                "createdAt": "2020-12-29 13:21:40",
                "updatedAt": "2020-12-29 13:21:40",
                "version": 1,
                "uuid": "d0ef93e0-6b0c-11eb-ae7b-e5f2b979d5bb",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Primaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5255
                },
                "schoolPlanPayment": {
                    "id": 14660
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2020-12-29 13:21:40",
                "updatedAt": "2020-12-29 13:21:49",
                "version": 1,
                "uuid": "d0ef95a0-6b0c-11eb-adf2-511f51d98110",
                "folio": "NTKBCR-5255",
                "change": 0,
                "quantity": 1860,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5255
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5261,
                        "createdAt": "2020-12-29 13:21:40",
                        "updatedAt": "2020-12-29 13:21:40",
                        "version": 1,
                        "uuid": "d0ef9850-6b0c-11eb-b4c9-a373cecc93fa",
                        "codePaymentMethod": "03",
                        "quantity": 1860,
                        "date": "2020-12-29",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5549,
                        "createdAt": "2020-12-29 13:21:47",
                        "updatedAt": "2020-12-29 13:21:49",
                        "version": 1,
                        "folio": "ACAKMCR-5549",
                        "uuid": "B6DA4C48-4A02-11EB-9AC2-C9563A7B4630",
                        "businessName": "ARMANDO RAFAEL COCOM RUIZ",
                        "rfc": "CORA7804088FA",
                        "total": 1860,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5255
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5258,
        "createdAt": "2020-12-30 08:57:53",
        "updatedAt": "2020-12-30 08:58:04",
        "version": 1,
        "uuid": "d0ef9c30-6b0c-11eb-9686-3fb41cd47fda",
        "folio": "NTKBCR-5258",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 38
        },
        "chargesDetails": [
            {
                "id": 8145,
                "createdAt": "2020-12-30 08:57:53",
                "updatedAt": "2020-12-30 08:57:53",
                "version": 1,
                "uuid": "d132eb70-6b0c-11eb-b48b-edd3d6d2bc9f",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n primaria",
                "quantity": 1,
                "price": 300,
                "schoolCharge": {
                    "id": 5258
                },
                "schoolPlanPayment": {
                    "id": 14665
                }
            },
            {
                "id": 8146,
                "createdAt": "2020-12-30 08:57:53",
                "updatedAt": "2020-12-30 08:57:53",
                "version": 1,
                "uuid": "d132ef10-6b0c-11eb-9d64-fba466cad9dc",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Primaria",
                "quantity": 1,
                "price": 160,
                "schoolCharge": {
                    "id": 5258
                },
                "schoolPlanPayment": {
                    "id": 14676
                }
            },
            {
                "id": 8147,
                "createdAt": "2020-12-30 08:57:53",
                "updatedAt": "2020-12-30 08:57:53",
                "version": 1,
                "uuid": "d132f1c0-6b0c-11eb-a09a-65e60ce7c225",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5258
                },
                "schoolPlanPayment": {
                    "id": 14677
                }
            },
            {
                "id": 8148,
                "createdAt": "2020-12-30 08:57:53",
                "updatedAt": "2020-12-30 08:57:53",
                "version": 1,
                "uuid": "d132f440-6b0c-11eb-8a1f-090e93852668",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Primaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5258
                },
                "schoolPlanPayment": {
                    "id": 14678
                }
            },
            {
                "id": 8149,
                "createdAt": "2020-12-30 08:57:53",
                "updatedAt": "2020-12-30 08:57:53",
                "version": 1,
                "uuid": "d132f7e0-6b0c-11eb-a824-890a1d1d756d",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Primaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5258
                },
                "schoolPlanPayment": {
                    "id": 14679
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2020-12-30 08:57:53",
                "updatedAt": "2020-12-30 08:58:04",
                "version": 1,
                "uuid": "d132fa70-6b0c-11eb-961c-ed3fd94a4f65",
                "folio": "NTKBCR-5258",
                "change": 0,
                "quantity": 1460,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5258
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5264,
                        "createdAt": "2020-12-30 08:57:53",
                        "updatedAt": "2020-12-30 08:57:53",
                        "version": 1,
                        "uuid": "d132fd20-6b0c-11eb-904a-855f9af65544",
                        "codePaymentMethod": "01",
                        "quantity": 1460,
                        "date": "2020-12-30",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 1
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5552,
                        "createdAt": "2020-12-30 08:58:02",
                        "updatedAt": "2020-12-30 08:58:04",
                        "version": 1,
                        "folio": "ACAKMCR-5552",
                        "uuid": "09045F96-4AA7-11EB-80EC-917A561C5F29",
                        "businessName": "ANGEL GABRIEL RAMIREZ GUERRERO",
                        "rfc": "XAXX010101000",
                        "total": 1460,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5258
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5259,
        "createdAt": "2020-12-30 09:02:32",
        "updatedAt": "2020-12-30 09:02:43",
        "version": 1,
        "uuid": "d13300f0-6b0c-11eb-869e-61f99557113c",
        "folio": "NTKBCR-5259",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 2
        },
        "chargesDetails": [
            {
                "id": 8150,
                "createdAt": "2020-12-30 09:02:32",
                "updatedAt": "2020-12-30 09:02:32",
                "version": 1,
                "uuid": "d17390b0-6b0c-11eb-92fa-5badcd15cade",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n primaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5259
                },
                "schoolPlanPayment": {
                    "id": 14682
                }
            },
            {
                "id": 8151,
                "createdAt": "2020-12-30 09:02:32",
                "updatedAt": "2020-12-30 09:02:32",
                "version": 1,
                "uuid": "d1739460-6b0c-11eb-b3b5-15346d76967b",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Primaria",
                "quantity": 1,
                "price": 160,
                "schoolCharge": {
                    "id": 5259
                },
                "schoolPlanPayment": {
                    "id": 14693
                }
            },
            {
                "id": 8152,
                "createdAt": "2020-12-30 09:02:32",
                "updatedAt": "2020-12-30 09:02:32",
                "version": 1,
                "uuid": "d1739720-6b0c-11eb-9d2d-4150634f9479",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5259
                },
                "schoolPlanPayment": {
                    "id": 14694
                }
            },
            {
                "id": 8153,
                "createdAt": "2020-12-30 09:02:32",
                "updatedAt": "2020-12-30 09:02:32",
                "version": 1,
                "uuid": "d17399c0-6b0c-11eb-8791-6793eefcb439",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Primaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5259
                },
                "schoolPlanPayment": {
                    "id": 14695
                }
            },
            {
                "id": 8154,
                "createdAt": "2020-12-30 09:02:32",
                "updatedAt": "2020-12-30 09:02:32",
                "version": 1,
                "uuid": "d1739c70-6b0c-11eb-94ee-c916060b83b1",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Primaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5259
                },
                "schoolPlanPayment": {
                    "id": 14696
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2020-12-30 09:02:32",
                "updatedAt": "2020-12-30 09:02:43",
                "version": 1,
                "uuid": "d1739e40-6b0c-11eb-a8ff-7bcd9ca9371a",
                "folio": "NTKBCR-5259",
                "change": 0,
                "quantity": 1510,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5259
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5265,
                        "createdAt": "2020-12-30 09:02:32",
                        "updatedAt": "2020-12-30 09:02:32",
                        "version": 1,
                        "uuid": "d173a0f0-6b0c-11eb-840c-19c0b7c8fb86",
                        "codePaymentMethod": "01",
                        "quantity": 1510,
                        "date": "2020-12-30",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 1
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5553,
                        "createdAt": "2020-12-30 09:02:41",
                        "updatedAt": "2020-12-30 09:02:43",
                        "version": 1,
                        "folio": "ACAKMCR-5553",
                        "uuid": "AF15FCAA-4AA7-11EB-B178-07B73FF7B310",
                        "businessName": "PALOMA ESTEFANIA RAMIREZ GUERRERO",
                        "rfc": "XEXX010101000",
                        "total": 1510,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5259
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5260,
        "createdAt": "2020-12-30 09:15:45",
        "updatedAt": "2020-12-30 09:15:56",
        "version": 1,
        "uuid": "d173a4e0-6b0c-11eb-8920-49967c24ade0",
        "folio": "NTKBCR-5260",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 616
        },
        "chargesDetails": [
            {
                "id": 8155,
                "createdAt": "2020-12-30 09:15:45",
                "updatedAt": "2020-12-30 09:15:45",
                "version": 1,
                "uuid": "d1b646d0-6b0c-11eb-82ae-39bc494d710f",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "inscripci\u00f3n o Reinscripci\u00f3n Secundaria",
                "quantity": 1,
                "price": 1330,
                "schoolCharge": {
                    "id": 5260
                },
                "schoolPlanPayment": {
                    "id": 14699
                }
            },
            {
                "id": 8156,
                "createdAt": "2020-12-30 09:15:45",
                "updatedAt": "2020-12-30 09:15:45",
                "version": 1,
                "uuid": "d1b64b30-6b0c-11eb-ad28-59c243489918",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "CUOTA SEQ",
                "quantity": 1,
                "price": 200,
                "schoolCharge": {
                    "id": 5260
                },
                "schoolPlanPayment": {
                    "id": 14710
                }
            },
            {
                "id": 8157,
                "createdAt": "2020-12-30 09:15:45",
                "updatedAt": "2020-12-30 09:15:45",
                "version": 1,
                "uuid": "d1b64fc0-6b0c-11eb-a548-c998d6a3bcba",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "ESCUELA PARA PADRES",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5260
                },
                "schoolPlanPayment": {
                    "id": 14711
                }
            },
            {
                "id": 8158,
                "createdAt": "2020-12-30 09:15:45",
                "updatedAt": "2020-12-30 09:15:45",
                "version": 1,
                "uuid": "d1b65370-6b0c-11eb-a681-17ca7f5ca866",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Secundaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5260
                },
                "schoolPlanPayment": {
                    "id": 14712
                }
            },
            {
                "id": 8159,
                "createdAt": "2020-12-30 09:15:45",
                "updatedAt": "2020-12-30 09:15:45",
                "version": 1,
                "uuid": "d1b65620-6b0c-11eb-867a-b38781e85d97",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Secundaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5260
                },
                "schoolPlanPayment": {
                    "id": 14713
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2020-12-30 09:15:45",
                "updatedAt": "2020-12-30 09:15:56",
                "version": 1,
                "uuid": "d1b65820-6b0c-11eb-b28b-0d8acad6e197",
                "folio": "NTKBCR-5260",
                "change": 0,
                "quantity": 2530,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5260
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5266,
                        "createdAt": "2020-12-30 09:15:45",
                        "updatedAt": "2020-12-30 09:15:45",
                        "version": 1,
                        "uuid": "d1b65b00-6b0c-11eb-8ce4-5dab6bf6dd15",
                        "codePaymentMethod": "03",
                        "quantity": 2530,
                        "date": "2020-12-30",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5554,
                        "createdAt": "2020-12-30 09:15:51",
                        "updatedAt": "2020-12-30 09:15:56",
                        "version": 1,
                        "folio": "ACAKMCR-5554",
                        "uuid": "8714BABE-4AA9-11EB-A47B-85F0AF4EAC3D",
                        "businessName": "CRISTIAN ADRIAN CHABLE COCOM",
                        "rfc": "XAXX010101000",
                        "total": 2530,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5260
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5261,
        "createdAt": "2020-12-30 09:31:24",
        "updatedAt": "2020-12-30 09:31:32",
        "version": 1,
        "uuid": "d1b66110-6b0c-11eb-b4f3-2379c8244449",
        "folio": "NTKBCR-5261",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 528
        },
        "chargesDetails": [
            {
                "id": 8160,
                "createdAt": "2020-12-30 09:31:24",
                "updatedAt": "2020-12-30 09:31:24",
                "version": 1,
                "uuid": "d1f76d40-6b0c-11eb-9eca-21b8d8b8ce14",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "inscripci\u00f3n o Reinscripci\u00f3n Secundaria",
                "quantity": 1,
                "price": 665,
                "schoolCharge": {
                    "id": 5261
                },
                "schoolPlanPayment": {
                    "id": 14716
                }
            },
            {
                "id": 8161,
                "createdAt": "2020-12-30 09:31:24",
                "updatedAt": "2020-12-30 09:31:24",
                "version": 1,
                "uuid": "d1f77180-6b0c-11eb-8f99-a9c597876cdb",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "CUOTA SEQ",
                "quantity": 1,
                "price": 200,
                "schoolCharge": {
                    "id": 5261
                },
                "schoolPlanPayment": {
                    "id": 14727
                }
            },
            {
                "id": 8162,
                "createdAt": "2020-12-30 09:31:24",
                "updatedAt": "2020-12-30 09:31:24",
                "version": 1,
                "uuid": "d1f77470-6b0c-11eb-a0f8-79dcd44f65c2",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "ESCUELA PARA PADRES",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5261
                },
                "schoolPlanPayment": {
                    "id": 14728
                }
            },
            {
                "id": 8163,
                "createdAt": "2020-12-30 09:31:24",
                "updatedAt": "2020-12-30 09:31:24",
                "version": 1,
                "uuid": "d1f778d0-6b0c-11eb-94f9-11bd25c88507",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Secundaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5261
                },
                "schoolPlanPayment": {
                    "id": 14729
                }
            },
            {
                "id": 8164,
                "createdAt": "2020-12-30 09:31:24",
                "updatedAt": "2020-12-30 09:31:24",
                "version": 1,
                "uuid": "d1f77da0-6b0c-11eb-b0ba-f11a29e3c04b",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Secundaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5261
                },
                "schoolPlanPayment": {
                    "id": 14730
                }
            },
            {
                "id": 8165,
                "createdAt": "2020-12-30 09:31:24",
                "updatedAt": "2020-12-30 09:31:24",
                "version": 1,
                "uuid": "d1f78280-6b0c-11eb-ad86-f5dd8f472d8e",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Prueba de Antidoping (Tercer grado)",
                "quantity": 1,
                "price": 200,
                "schoolCharge": {
                    "id": 5261
                },
                "schoolPlanPayment": {
                    "id": 14731
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2020-12-30 09:31:24",
                "updatedAt": "2020-12-30 09:31:32",
                "version": 1,
                "uuid": "d1f785b0-6b0c-11eb-a641-0760a83426b5",
                "folio": "NTKBCR-5261",
                "change": 0,
                "quantity": 2065,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5261
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5267,
                        "createdAt": "2020-12-30 09:31:24",
                        "updatedAt": "2020-12-30 09:31:24",
                        "version": 1,
                        "uuid": "d1f78960-6b0c-11eb-9715-9520448ed154",
                        "codePaymentMethod": "03",
                        "quantity": 2065,
                        "date": "2020-12-30",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5555,
                        "createdAt": "2020-12-30 09:31:31",
                        "updatedAt": "2020-12-30 09:31:32",
                        "version": 1,
                        "folio": "ACAKMCR-5555",
                        "uuid": "B6288AFE-4AAB-11EB-9737-1998286A5F27",
                        "businessName": "VICTOR EMILIANO ALTAMIRANO DOMINGUEZ",
                        "rfc": "XAXX010101000",
                        "total": 2065,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5261
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5262,
        "createdAt": "2020-12-30 09:36:39",
        "updatedAt": "2020-12-30 09:37:11",
        "version": 1,
        "uuid": "d1f78d70-6b0c-11eb-abe1-ef67fc868860",
        "folio": "NTKBCR-5262",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 164
        },
        "chargesDetails": [
            {
                "id": 8166,
                "createdAt": "2020-12-30 09:36:39",
                "updatedAt": "2020-12-30 09:36:39",
                "version": 1,
                "uuid": "d2392110-6b0c-11eb-8022-bb3cecb08b8b",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "inscripci\u00f3n o Reinscripci\u00f3n Secundaria",
                "quantity": 1,
                "price": 300,
                "schoolCharge": {
                    "id": 5262
                },
                "schoolPlanPayment": {
                    "id": 14734
                }
            },
            {
                "id": 8167,
                "createdAt": "2020-12-30 09:36:39",
                "updatedAt": "2020-12-30 09:36:39",
                "version": 1,
                "uuid": "d2392520-6b0c-11eb-a92a-751064df3621",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "CUOTA SEQ",
                "quantity": 1,
                "price": 200,
                "schoolCharge": {
                    "id": 5262
                },
                "schoolPlanPayment": {
                    "id": 14745
                }
            },
            {
                "id": 8168,
                "createdAt": "2020-12-30 09:36:39",
                "updatedAt": "2020-12-30 09:36:39",
                "version": 1,
                "uuid": "d2392850-6b0c-11eb-8265-aba99a18729b",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "ESCUELA PARA PADRES",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5262
                },
                "schoolPlanPayment": {
                    "id": 14746
                }
            },
            {
                "id": 8169,
                "createdAt": "2020-12-30 09:36:39",
                "updatedAt": "2020-12-30 09:36:39",
                "version": 1,
                "uuid": "d2392b00-6b0c-11eb-874b-cdf75cacac4f",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Secundaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5262
                },
                "schoolPlanPayment": {
                    "id": 14747
                }
            },
            {
                "id": 8170,
                "createdAt": "2020-12-30 09:36:39",
                "updatedAt": "2020-12-30 09:36:39",
                "version": 1,
                "uuid": "d2392db0-6b0c-11eb-a77c-b3a11b6347af",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Secundaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5262
                },
                "schoolPlanPayment": {
                    "id": 14748
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2020-12-30 09:36:39",
                "updatedAt": "2020-12-30 09:37:11",
                "version": 1,
                "uuid": "d2392f70-6b0c-11eb-a920-0316efddad33",
                "folio": "NTKBCR-5262",
                "change": 0,
                "quantity": 1500,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5262
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5268,
                        "createdAt": "2020-12-30 09:36:39",
                        "updatedAt": "2020-12-30 09:36:39",
                        "version": 1,
                        "uuid": "d2393200-6b0c-11eb-94b0-ddd8bcd7d0e8",
                        "codePaymentMethod": "03",
                        "quantity": 1500,
                        "date": "2020-12-30",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5556,
                        "createdAt": "2020-12-30 09:37:09",
                        "updatedAt": "2020-12-30 09:37:11",
                        "version": 1,
                        "folio": "ACAKMCR-5556",
                        "uuid": "80154CEE-4AAC-11EB-8FB6-81DB7A50D79F",
                        "businessName": "KEVIN JAVIER SANCHEZ AGUILAR",
                        "rfc": "XAXX010101000",
                        "total": 1500,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5262
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5265,
        "createdAt": "2020-12-30 10:16:34",
        "updatedAt": "2020-12-30 10:16:47",
        "version": 1,
        "uuid": "d23935d0-6b0c-11eb-b532-b5ef7ca09797",
        "folio": "NTKBCR-5265",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 655
        },
        "chargesDetails": [
            {
                "id": 8173,
                "createdAt": "2020-12-30 10:16:34",
                "updatedAt": "2020-12-30 10:16:34",
                "version": 1,
                "uuid": "d27a3a90-6b0c-11eb-b235-159f9115d479",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n primaria",
                "quantity": 1,
                "price": 210,
                "schoolCharge": {
                    "id": 5265
                },
                "schoolPlanPayment": {
                    "id": 14751
                }
            },
            {
                "id": 8174,
                "createdAt": "2020-12-30 10:16:34",
                "updatedAt": "2020-12-30 10:16:34",
                "version": 1,
                "uuid": "d27a3e00-6b0c-11eb-b426-c91194a7a9ec",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Primaria",
                "quantity": 1,
                "price": 160,
                "schoolCharge": {
                    "id": 5265
                },
                "schoolPlanPayment": {
                    "id": 14762
                }
            },
            {
                "id": 8175,
                "createdAt": "2020-12-30 10:16:34",
                "updatedAt": "2020-12-30 10:16:34",
                "version": 1,
                "uuid": "d27a4090-6b0c-11eb-8988-f178f9439f30",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5265
                },
                "schoolPlanPayment": {
                    "id": 14763
                }
            },
            {
                "id": 8176,
                "createdAt": "2020-12-30 10:16:34",
                "updatedAt": "2020-12-30 10:16:34",
                "version": 1,
                "uuid": "d27a4300-6b0c-11eb-a327-67003c4bbfec",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Primaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5265
                },
                "schoolPlanPayment": {
                    "id": 14764
                }
            },
            {
                "id": 8177,
                "createdAt": "2020-12-30 10:16:34",
                "updatedAt": "2020-12-30 10:16:34",
                "version": 1,
                "uuid": "d27a4570-6b0c-11eb-bd01-c93e8a26b6fb",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Primaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5265
                },
                "schoolPlanPayment": {
                    "id": 14765
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2020-12-30 10:16:34",
                "updatedAt": "2020-12-30 10:16:47",
                "version": 1,
                "uuid": "d27a4720-6b0c-11eb-9fc6-b14e3037e379",
                "folio": "NTKBCR-5265",
                "change": 0,
                "quantity": 1370,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5265
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5271,
                        "createdAt": "2020-12-30 10:16:35",
                        "updatedAt": "2020-12-30 10:16:35",
                        "version": 1,
                        "uuid": "d27a49b0-6b0c-11eb-a603-3ba85067a543",
                        "codePaymentMethod": "01",
                        "quantity": 1370,
                        "date": "2020-12-30",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 1
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5559,
                        "createdAt": "2020-12-30 10:16:45",
                        "updatedAt": "2020-12-30 10:16:47",
                        "version": 1,
                        "folio": "ACAKMCR-5559",
                        "uuid": "07F08EEE-4AB2-11EB-B6AA-7B103FAB2308",
                        "businessName": "VICTOR EMMANUEL ALEMAN LOPEZ",
                        "rfc": "XAXX010101000",
                        "total": 1370,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5265
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5266,
        "createdAt": "2020-12-30 10:31:10",
        "updatedAt": "2020-12-30 10:31:23",
        "version": 1,
        "uuid": "d27a4d60-6b0c-11eb-99b4-efec314f6359",
        "folio": "NTKBCR-5266",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 477
        },
        "chargesDetails": [
            {
                "id": 8178,
                "createdAt": "2020-12-30 10:31:10",
                "updatedAt": "2020-12-30 10:31:10",
                "version": 1,
                "uuid": "d2bb6dd0-6b0c-11eb-bb2b-77c3095f991a",
                "codeConcept": "86121601",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n o Reinscripci\u00f3n Preparatoria",
                "quantity": 1,
                "price": 665,
                "schoolCharge": {
                    "id": 5266
                },
                "schoolPlanPayment": {
                    "id": 14768
                }
            },
            {
                "id": 8179,
                "createdAt": "2020-12-30 10:31:10",
                "updatedAt": "2020-12-30 10:31:10",
                "version": 1,
                "uuid": "d2bb7100-6b0c-11eb-a29b-f52250f0fe60",
                "codeConcept": "86121601",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota Seyc",
                "quantity": 1,
                "price": 200,
                "schoolCharge": {
                    "id": 5266
                },
                "schoolPlanPayment": {
                    "id": 14769
                }
            },
            {
                "id": 8180,
                "createdAt": "2020-12-30 10:31:10",
                "updatedAt": "2020-12-30 10:31:10",
                "version": 1,
                "uuid": "d2bb73b0-6b0c-11eb-96fa-377bb8684064",
                "codeConcept": "86121601",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para Padres",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5266
                },
                "schoolPlanPayment": {
                    "id": 14780
                }
            },
            {
                "id": 8181,
                "createdAt": "2020-12-30 10:31:10",
                "updatedAt": "2020-12-30 10:31:10",
                "version": 1,
                "uuid": "d2bb7690-6b0c-11eb-a157-7df352d73ad5",
                "codeConcept": "86121601",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5266
                },
                "schoolPlanPayment": {
                    "id": 14781
                }
            },
            {
                "id": 8182,
                "createdAt": "2020-12-30 10:31:10",
                "updatedAt": "2020-12-30 10:31:10",
                "version": 1,
                "uuid": "d2bb7920-6b0c-11eb-9dfd-af57bf96c851",
                "codeConcept": "86121601",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de Orfandad",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5266
                },
                "schoolPlanPayment": {
                    "id": 14782
                }
            },
            {
                "id": 8183,
                "createdAt": "2020-12-30 10:31:10",
                "updatedAt": "2020-12-30 10:31:10",
                "version": 1,
                "uuid": "d2bb7bb0-6b0c-11eb-997f-ddf2b9046a33",
                "codeConcept": "86121601",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Prueba de Antidoping",
                "quantity": 1,
                "price": 200,
                "schoolCharge": {
                    "id": 5266
                },
                "schoolPlanPayment": {
                    "id": 14783
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2020-12-30 10:31:10",
                "updatedAt": "2020-12-30 10:31:23",
                "version": 1,
                "uuid": "d2bb7d60-6b0c-11eb-9cab-2f8d86b6e3b6",
                "folio": "NTKBCR-5266",
                "change": 0,
                "quantity": 2065,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5266
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5272,
                        "createdAt": "2020-12-30 10:31:10",
                        "updatedAt": "2020-12-30 10:31:10",
                        "version": 1,
                        "uuid": "d2bb7fe0-6b0c-11eb-ba34-297c69aa6517",
                        "codePaymentMethod": "01",
                        "quantity": 2065,
                        "date": "2020-12-30",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 1
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5560,
                        "createdAt": "2020-12-30 10:31:18",
                        "updatedAt": "2020-12-30 10:31:23",
                        "version": 1,
                        "folio": "ACAKMCR-5560",
                        "uuid": "12650A56-4AB4-11EB-87C9-A1C54FD25076",
                        "businessName": "ANGEL MANUEL MORALES DE LA ROSA",
                        "rfc": "XAXX010101000",
                        "total": 2065,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5266
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5267,
        "createdAt": "2020-12-30 10:51:47",
        "updatedAt": "2020-12-30 10:51:59",
        "version": 1,
        "uuid": "d2bb8440-6b0c-11eb-ac42-fb9eb0e6a759",
        "folio": "NTKBCR-5267",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 584
        },
        "chargesDetails": [
            {
                "id": 8184,
                "createdAt": "2020-12-30 10:51:47",
                "updatedAt": "2020-12-30 10:51:47",
                "version": 1,
                "uuid": "d2fe3160-6b0c-11eb-a437-5d103b7c77e8",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n primaria",
                "quantity": 1,
                "price": 930,
                "schoolCharge": {
                    "id": 5267
                },
                "schoolPlanPayment": {
                    "id": 14786
                }
            },
            {
                "id": 8185,
                "createdAt": "2020-12-30 10:51:47",
                "updatedAt": "2020-12-30 10:51:47",
                "version": 1,
                "uuid": "d2fe3520-6b0c-11eb-a023-1dc894c890c2",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Primaria",
                "quantity": 1,
                "price": 160,
                "schoolCharge": {
                    "id": 5267
                },
                "schoolPlanPayment": {
                    "id": 14797
                }
            },
            {
                "id": 8186,
                "createdAt": "2020-12-30 10:51:47",
                "updatedAt": "2020-12-30 10:51:47",
                "version": 1,
                "uuid": "d2fe37e0-6b0c-11eb-87e9-290f97644079",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5267
                },
                "schoolPlanPayment": {
                    "id": 14798
                }
            },
            {
                "id": 8187,
                "createdAt": "2020-12-30 10:51:47",
                "updatedAt": "2020-12-30 10:51:47",
                "version": 1,
                "uuid": "d2fe3a90-6b0c-11eb-bd30-414486b715fc",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Primaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5267
                },
                "schoolPlanPayment": {
                    "id": 14799
                }
            },
            {
                "id": 8188,
                "createdAt": "2020-12-30 10:51:47",
                "updatedAt": "2020-12-30 10:51:47",
                "version": 1,
                "uuid": "d2fe3d20-6b0c-11eb-bf22-bf97f4034d01",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Primaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5267
                },
                "schoolPlanPayment": {
                    "id": 14800
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2020-12-30 10:51:47",
                "updatedAt": "2020-12-30 10:51:59",
                "version": 1,
                "uuid": "d2fe3ef0-6b0c-11eb-bfb3-a9b573a061aa",
                "folio": "NTKBCR-5267",
                "change": 0,
                "quantity": 2090,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5267
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5273,
                        "createdAt": "2020-12-30 10:51:47",
                        "updatedAt": "2020-12-30 10:51:47",
                        "version": 1,
                        "uuid": "d2fe4180-6b0c-11eb-b65c-659b8e9652ae",
                        "codePaymentMethod": "03",
                        "quantity": 2090,
                        "date": "2020-12-30",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5561,
                        "createdAt": "2020-12-30 10:51:57",
                        "updatedAt": "2020-12-30 10:51:59",
                        "version": 1,
                        "folio": "ACAKMCR-5561",
                        "uuid": "F31EEC0E-4AB6-11EB-B2E4-B9E2534DD735",
                        "businessName": "DIANA YATZIL NU\u00d1EZ MOSQUEDA",
                        "rfc": "XAXX010101000",
                        "total": 2090,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5267
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5268,
        "createdAt": "2020-12-30 11:08:14",
        "updatedAt": "2020-12-30 11:08:38",
        "version": 1,
        "uuid": "d2fe4570-6b0c-11eb-b901-737bbb0e8c57",
        "folio": "NTKBCR-5268",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 26
        },
        "chargesDetails": [
            {
                "id": 8189,
                "createdAt": "2020-12-30 11:08:15",
                "updatedAt": "2020-12-30 11:08:15",
                "version": 1,
                "uuid": "d340d2e0-6b0c-11eb-aa46-61fabfa80b90",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n primaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5268
                },
                "schoolPlanPayment": {
                    "id": 14803
                }
            },
            {
                "id": 8190,
                "createdAt": "2020-12-30 11:08:15",
                "updatedAt": "2020-12-30 11:08:15",
                "version": 1,
                "uuid": "d340da70-6b0c-11eb-9f40-cf920ca3b742",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Primaria",
                "quantity": 1,
                "price": 160,
                "schoolCharge": {
                    "id": 5268
                },
                "schoolPlanPayment": {
                    "id": 14814
                }
            },
            {
                "id": 8191,
                "createdAt": "2020-12-30 11:08:15",
                "updatedAt": "2020-12-30 11:08:15",
                "version": 1,
                "uuid": "d340e080-6b0c-11eb-87e4-d304ff9e7b1f",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5268
                },
                "schoolPlanPayment": {
                    "id": 14815
                }
            },
            {
                "id": 8192,
                "createdAt": "2020-12-30 11:08:15",
                "updatedAt": "2020-12-30 11:08:15",
                "version": 1,
                "uuid": "d340e660-6b0c-11eb-a776-739f11015744",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Primaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5268
                },
                "schoolPlanPayment": {
                    "id": 14816
                }
            },
            {
                "id": 8193,
                "createdAt": "2020-12-30 11:08:15",
                "updatedAt": "2020-12-30 11:08:15",
                "version": 1,
                "uuid": "d340ee50-6b0c-11eb-8253-e15923024e6f",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Primaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5268
                },
                "schoolPlanPayment": {
                    "id": 14817
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2020-12-30 11:08:14",
                "updatedAt": "2020-12-30 11:08:38",
                "version": 1,
                "uuid": "d340f290-6b0c-11eb-b77e-43b25f55be53",
                "folio": "NTKBCR-5268",
                "change": 0,
                "quantity": 1510,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5268
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5274,
                        "createdAt": "2020-12-30 11:08:15",
                        "updatedAt": "2020-12-30 11:08:15",
                        "version": 1,
                        "uuid": "d340f980-6b0c-11eb-8e17-a138cc9cc1f4",
                        "codePaymentMethod": "03",
                        "quantity": 1510,
                        "date": "2020-12-30",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5562,
                        "createdAt": "2020-12-30 11:08:35",
                        "updatedAt": "2020-12-30 11:08:38",
                        "version": 1,
                        "folio": "ACAKMCR-5562",
                        "uuid": "4613EFA2-4AB9-11EB-B961-49BAF5BA7036",
                        "businessName": "ELENA CARRILLO CEL",
                        "rfc": "XAXX010101000",
                        "total": 1510,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5268
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5269,
        "createdAt": "2020-12-30 11:21:01",
        "updatedAt": "2020-12-30 11:21:12",
        "version": 1,
        "uuid": "d34106c0-6b0c-11eb-b0cf-552ca376f322",
        "folio": "NTKBCR-5269",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 85
        },
        "chargesDetails": [
            {
                "id": 8194,
                "createdAt": "2020-12-30 11:21:01",
                "updatedAt": "2020-12-30 11:21:01",
                "version": 1,
                "uuid": "d3832090-6b0c-11eb-b301-f79eaccdd33d",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n primaria",
                "quantity": 1,
                "price": 840,
                "schoolCharge": {
                    "id": 5269
                },
                "schoolPlanPayment": {
                    "id": 14820
                }
            },
            {
                "id": 8195,
                "createdAt": "2020-12-30 11:21:01",
                "updatedAt": "2020-12-30 11:21:01",
                "version": 1,
                "uuid": "d3832800-6b0c-11eb-9822-7b27bc87a6a2",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Primaria",
                "quantity": 1,
                "price": 160,
                "schoolCharge": {
                    "id": 5269
                },
                "schoolPlanPayment": {
                    "id": 14831
                }
            },
            {
                "id": 8196,
                "createdAt": "2020-12-30 11:21:01",
                "updatedAt": "2020-12-30 11:21:01",
                "version": 1,
                "uuid": "d3832e30-6b0c-11eb-9446-51f8509c3068",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5269
                },
                "schoolPlanPayment": {
                    "id": 14832
                }
            },
            {
                "id": 8197,
                "createdAt": "2020-12-30 11:21:01",
                "updatedAt": "2020-12-30 11:21:01",
                "version": 1,
                "uuid": "d3833430-6b0c-11eb-bfea-1b3890bf4a28",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Primaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5269
                },
                "schoolPlanPayment": {
                    "id": 14833
                }
            },
            {
                "id": 8198,
                "createdAt": "2020-12-30 11:21:01",
                "updatedAt": "2020-12-30 11:21:01",
                "version": 1,
                "uuid": "d38339f0-6b0c-11eb-82d7-057ac667f115",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Primaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5269
                },
                "schoolPlanPayment": {
                    "id": 14834
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2020-12-30 11:21:01",
                "updatedAt": "2020-12-30 11:21:12",
                "version": 1,
                "uuid": "d3833e20-6b0c-11eb-b7c9-1ba1b82b2ac9",
                "folio": "NTKBCR-5269",
                "change": 0,
                "quantity": 2000,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5269
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5275,
                        "createdAt": "2020-12-30 11:21:01",
                        "updatedAt": "2020-12-30 11:21:01",
                        "version": 1,
                        "uuid": "d3834350-6b0c-11eb-90a9-7daf9024fb55",
                        "codePaymentMethod": "03",
                        "quantity": 2000,
                        "date": "2020-12-30",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5563,
                        "createdAt": "2020-12-30 11:21:10",
                        "updatedAt": "2020-12-30 11:21:12",
                        "version": 1,
                        "folio": "ACAKMCR-5563",
                        "uuid": "079ADC84-4ABB-11EB-BDE0-0500A5AB8492",
                        "businessName": "ALEJANDRA VELAZQUEZ HERNANDEZ",
                        "rfc": "VEHA830529A99",
                        "total": 2000,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5269
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5270,
        "createdAt": "2020-12-30 11:52:37",
        "updatedAt": "2020-12-30 11:52:47",
        "version": 1,
        "uuid": "d3834b50-6b0c-11eb-8fc2-5f85a75a635f",
        "folio": "NTKBCR-5270",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 99
        },
        "chargesDetails": [
            {
                "id": 8199,
                "createdAt": "2020-12-30 11:52:37",
                "updatedAt": "2020-12-30 11:52:37",
                "version": 1,
                "uuid": "d455e4b0-6b0c-11eb-a9ed-c3620930e682",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n primaria",
                "quantity": 1,
                "price": 613,
                "schoolCharge": {
                    "id": 5270
                },
                "schoolPlanPayment": {
                    "id": 14837
                }
            },
            {
                "id": 8200,
                "createdAt": "2020-12-30 11:52:37",
                "updatedAt": "2020-12-30 11:52:37",
                "version": 1,
                "uuid": "d455e910-6b0c-11eb-9093-6349a4b731d9",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Primaria",
                "quantity": 1,
                "price": 160,
                "schoolCharge": {
                    "id": 5270
                },
                "schoolPlanPayment": {
                    "id": 14848
                }
            },
            {
                "id": 8201,
                "createdAt": "2020-12-30 11:52:37",
                "updatedAt": "2020-12-30 11:52:37",
                "version": 1,
                "uuid": "d455ec20-6b0c-11eb-b35d-eb0e0faeb9a8",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5270
                },
                "schoolPlanPayment": {
                    "id": 14849
                }
            },
            {
                "id": 8202,
                "createdAt": "2020-12-30 11:52:37",
                "updatedAt": "2020-12-30 11:52:37",
                "version": 1,
                "uuid": "d455f110-6b0c-11eb-a26f-2975ef62d1b9",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Primaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5270
                },
                "schoolPlanPayment": {
                    "id": 14851
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2020-12-30 11:52:37",
                "updatedAt": "2020-12-30 11:52:47",
                "version": 1,
                "uuid": "d455f500-6b0c-11eb-ab07-19969113f3d5",
                "folio": "NTKBCR-5270",
                "change": 0,
                "quantity": 1273,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5270
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5276,
                        "createdAt": "2020-12-30 11:52:37",
                        "updatedAt": "2020-12-30 11:52:37",
                        "version": 1,
                        "uuid": "d455f850-6b0c-11eb-ba28-7356018ae323",
                        "codePaymentMethod": "01",
                        "quantity": 1273,
                        "date": "2020-12-30",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 1
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5564,
                        "createdAt": "2020-12-30 11:52:45",
                        "updatedAt": "2020-12-30 11:52:47",
                        "version": 1,
                        "folio": "ACAKMCR-5564",
                        "uuid": "718CB000-4ABF-11EB-83DF-51B9D342274D",
                        "businessName": "LUIS ANGEL GONZALEZ DE LOS SANTOS",
                        "rfc": "XAXX010101000",
                        "total": 1273,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5270
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5271,
        "createdAt": "2020-12-30 11:57:50",
        "updatedAt": "2020-12-30 11:58:02",
        "version": 1,
        "uuid": "d455fd60-6b0c-11eb-8097-4762bbeb4f92",
        "folio": "NTKBCR-5271",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 177
        },
        "chargesDetails": [
            {
                "id": 8203,
                "createdAt": "2020-12-30 11:57:50",
                "updatedAt": "2020-12-30 11:57:50",
                "version": 1,
                "uuid": "d496f280-6b0c-11eb-aa49-51fb19be248c",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "inscripci\u00f3n o Reinscripci\u00f3n Secundaria",
                "quantity": 1,
                "price": 300,
                "schoolCharge": {
                    "id": 5271
                },
                "schoolPlanPayment": {
                    "id": 14854
                }
            },
            {
                "id": 8204,
                "createdAt": "2020-12-30 11:57:50",
                "updatedAt": "2020-12-30 11:57:50",
                "version": 1,
                "uuid": "d496f6c0-6b0c-11eb-a944-c7ac14b8c779",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "CUOTA SEQ",
                "quantity": 1,
                "price": 200,
                "schoolCharge": {
                    "id": 5271
                },
                "schoolPlanPayment": {
                    "id": 14865
                }
            },
            {
                "id": 8205,
                "createdAt": "2020-12-30 11:57:50",
                "updatedAt": "2020-12-30 11:57:50",
                "version": 1,
                "uuid": "d496f9c0-6b0c-11eb-b69e-4945f381c41b",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "ESCUELA PARA PADRES",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5271
                },
                "schoolPlanPayment": {
                    "id": 14866
                }
            },
            {
                "id": 8206,
                "createdAt": "2020-12-30 11:57:50",
                "updatedAt": "2020-12-30 11:57:50",
                "version": 1,
                "uuid": "d496fca0-6b0c-11eb-99e5-91b7a0b2cdd6",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Secundaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5271
                },
                "schoolPlanPayment": {
                    "id": 14867
                }
            },
            {
                "id": 8207,
                "createdAt": "2020-12-30 11:57:50",
                "updatedAt": "2020-12-30 11:57:50",
                "version": 1,
                "uuid": "d496ff80-6b0c-11eb-92d1-bd6419b2120c",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Secundaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5271
                },
                "schoolPlanPayment": {
                    "id": 14868
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2020-12-30 11:57:50",
                "updatedAt": "2020-12-30 11:58:02",
                "version": 1,
                "uuid": "d4970160-6b0c-11eb-b9cc-c383b8801092",
                "folio": "NTKBCR-5271",
                "change": 0,
                "quantity": 1500,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5271
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5277,
                        "createdAt": "2020-12-30 11:57:50",
                        "updatedAt": "2020-12-30 11:57:50",
                        "version": 1,
                        "uuid": "d4970420-6b0c-11eb-9686-f94fa5184c39",
                        "codePaymentMethod": "01",
                        "quantity": 1500,
                        "date": "2020-12-30",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 1
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5565,
                        "createdAt": "2020-12-30 11:58:00",
                        "updatedAt": "2020-12-30 11:58:02",
                        "version": 1,
                        "folio": "ACAKMCR-5565",
                        "uuid": "2D37F170-4AC0-11EB-A35A-CBF60713DA98",
                        "businessName": "CINDY PAOLA CHAN AES",
                        "rfc": "XAXX010101000",
                        "total": 1500,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5271
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5275,
        "createdAt": "2020-12-30 12:42:50",
        "updatedAt": "2020-12-30 12:42:58",
        "version": 1,
        "uuid": "d4970830-6b0c-11eb-b44f-3db26d630c64",
        "folio": "NTKBCR-5275",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 498
        },
        "chargesDetails": [
            {
                "id": 8212,
                "createdAt": "2020-12-30 12:42:50",
                "updatedAt": "2020-12-30 12:42:50",
                "version": 1,
                "uuid": "d4da7900-6b0c-11eb-9709-23d107df1e76",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n primaria",
                "quantity": 1,
                "price": 840,
                "schoolCharge": {
                    "id": 5275
                },
                "schoolPlanPayment": {
                    "id": 14874
                }
            },
            {
                "id": 8213,
                "createdAt": "2020-12-30 12:42:50",
                "updatedAt": "2020-12-30 12:42:50",
                "version": 1,
                "uuid": "d4da7e60-6b0c-11eb-847d-0314cf54cc7e",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Primaria",
                "quantity": 1,
                "price": 160,
                "schoolCharge": {
                    "id": 5275
                },
                "schoolPlanPayment": {
                    "id": 14885
                }
            },
            {
                "id": 8214,
                "createdAt": "2020-12-30 12:42:50",
                "updatedAt": "2020-12-30 12:42:50",
                "version": 1,
                "uuid": "d4da82e0-6b0c-11eb-b400-e7091701b60c",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5275
                },
                "schoolPlanPayment": {
                    "id": 14886
                }
            },
            {
                "id": 8215,
                "createdAt": "2020-12-30 12:42:50",
                "updatedAt": "2020-12-30 12:42:50",
                "version": 1,
                "uuid": "d4da8730-6b0c-11eb-b6aa-9feefeb6230b",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Primaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5275
                },
                "schoolPlanPayment": {
                    "id": 14887
                }
            },
            {
                "id": 8216,
                "createdAt": "2020-12-30 12:42:50",
                "updatedAt": "2020-12-30 12:42:50",
                "version": 1,
                "uuid": "d4da8b80-6b0c-11eb-b8c6-c951b03aaec0",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Primaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5275
                },
                "schoolPlanPayment": {
                    "id": 14888
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2020-12-30 12:42:50",
                "updatedAt": "2020-12-30 12:42:58",
                "version": 1,
                "uuid": "d4da8e50-6b0c-11eb-8596-07e587c9f07b",
                "folio": "NTKBCR-5275",
                "change": 0,
                "quantity": 2000,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5275
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5281,
                        "createdAt": "2020-12-30 12:42:50",
                        "updatedAt": "2020-12-30 12:42:50",
                        "version": 1,
                        "uuid": "d4da9220-6b0c-11eb-83f9-856e1c4af0dd",
                        "codePaymentMethod": "03",
                        "quantity": 2000,
                        "date": "2020-12-30",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5569,
                        "createdAt": "2020-12-30 12:42:56",
                        "updatedAt": "2020-12-30 12:42:58",
                        "version": 1,
                        "folio": "ACAKMCR-5569",
                        "uuid": "745890C2-4AC6-11EB-A187-270FB2815DA3",
                        "businessName": "MONICA ASAMI AGUILAR CONDE",
                        "rfc": "XAXX010101000",
                        "total": 2000,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5275
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5280,
        "createdAt": "2020-12-30 14:48:34",
        "updatedAt": "2020-12-30 14:49:25",
        "version": 1,
        "uuid": "d4da9820-6b0c-11eb-8556-d712e5f6550e",
        "folio": "NTKBCR-5280",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 667
        },
        "chargesDetails": [
            {
                "id": 8221,
                "createdAt": "2020-12-30 14:48:34",
                "updatedAt": "2020-12-30 14:48:34",
                "version": 1,
                "uuid": "d51bc1d0-6b0c-11eb-855d-09e16c8e764c",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "inscripci\u00f3n o Reinscripci\u00f3n Secundaria",
                "quantity": 1,
                "price": 570,
                "schoolCharge": {
                    "id": 5280
                },
                "schoolPlanPayment": {
                    "id": 14904
                }
            },
            {
                "id": 8222,
                "createdAt": "2020-12-30 14:48:34",
                "updatedAt": "2020-12-30 14:48:34",
                "version": 1,
                "uuid": "d51bc860-6b0c-11eb-b868-77a4c7c2c7b8",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "CUOTA SEQ",
                "quantity": 1,
                "price": 200,
                "schoolCharge": {
                    "id": 5280
                },
                "schoolPlanPayment": {
                    "id": 14915
                }
            },
            {
                "id": 8223,
                "createdAt": "2020-12-30 14:48:34",
                "updatedAt": "2020-12-30 14:48:34",
                "version": 1,
                "uuid": "d51bcc10-6b0c-11eb-a731-4b7b401c28fa",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "ESCUELA PARA PADRES",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5280
                },
                "schoolPlanPayment": {
                    "id": 14916
                }
            },
            {
                "id": 8224,
                "createdAt": "2020-12-30 14:48:34",
                "updatedAt": "2020-12-30 14:48:34",
                "version": 1,
                "uuid": "d51bcf90-6b0c-11eb-aa73-e3b32b238df4",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Secundaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5280
                },
                "schoolPlanPayment": {
                    "id": 14917
                }
            },
            {
                "id": 8225,
                "createdAt": "2020-12-30 14:48:34",
                "updatedAt": "2020-12-30 14:48:34",
                "version": 1,
                "uuid": "d51bd440-6b0c-11eb-8619-73a5e2923025",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Secundaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5280
                },
                "schoolPlanPayment": {
                    "id": 14918
                }
            },
            {
                "id": 8226,
                "createdAt": "2020-12-30 14:48:34",
                "updatedAt": "2020-12-30 14:48:34",
                "version": 1,
                "uuid": "d51bd9b0-6b0c-11eb-b5f1-438e4aeac86d",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Prueba de Antidoping (Tercer grado)",
                "quantity": 1,
                "price": 400,
                "schoolCharge": {
                    "id": 5280
                },
                "schoolPlanPayment": {
                    "id": 14919
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2020-12-30 14:48:34",
                "updatedAt": "2020-12-30 14:49:25",
                "version": 1,
                "uuid": "d51bdd40-6b0c-11eb-9872-db9d13133450",
                "folio": "NTKBCR-5280",
                "change": 0,
                "quantity": 2170,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5280
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5286,
                        "createdAt": "2020-12-30 14:48:34",
                        "updatedAt": "2020-12-30 14:48:34",
                        "version": 1,
                        "uuid": "d51be0e0-6b0c-11eb-b2dc-934979179d42",
                        "codePaymentMethod": "03",
                        "quantity": 2170,
                        "date": "2020-12-30",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5577,
                        "createdAt": "2020-12-30 14:49:23",
                        "updatedAt": "2020-12-30 14:49:25",
                        "version": 1,
                        "folio": "ACAKMCR-5577",
                        "uuid": "1E49B316-4AD8-11EB-A549-ABA3F76A123A",
                        "businessName": "JACQUELINE LOPEZ MUT",
                        "rfc": "XAXX010101000",
                        "total": 2170,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5280
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5281,
        "createdAt": "2020-12-31 17:25:04",
        "updatedAt": "2020-12-31 17:25:15",
        "version": 1,
        "uuid": "d51be750-6b0c-11eb-86d4-c130028ce941",
        "folio": "NTKBCR-5281",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 79
        },
        "chargesDetails": [
            {
                "id": 8227,
                "createdAt": "2020-12-31 17:25:04",
                "updatedAt": "2020-12-31 17:25:04",
                "version": 1,
                "uuid": "d55ea380-6b0c-11eb-a038-f36ee9d1d6b5",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n primaria",
                "quantity": 1,
                "price": 210,
                "schoolCharge": {
                    "id": 5281
                },
                "schoolPlanPayment": {
                    "id": 14922
                }
            },
            {
                "id": 8228,
                "createdAt": "2020-12-31 17:25:04",
                "updatedAt": "2020-12-31 17:25:04",
                "version": 1,
                "uuid": "d55ea990-6b0c-11eb-9202-af7f6879235c",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Primaria",
                "quantity": 1,
                "price": 160,
                "schoolCharge": {
                    "id": 5281
                },
                "schoolPlanPayment": {
                    "id": 14933
                }
            },
            {
                "id": 8229,
                "createdAt": "2020-12-31 17:25:04",
                "updatedAt": "2020-12-31 17:25:04",
                "version": 1,
                "uuid": "d55eaed0-6b0c-11eb-ae73-c714e7066959",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5281
                },
                "schoolPlanPayment": {
                    "id": 14934
                }
            },
            {
                "id": 8230,
                "createdAt": "2020-12-31 17:25:04",
                "updatedAt": "2020-12-31 17:25:04",
                "version": 1,
                "uuid": "d55eb2e0-6b0c-11eb-a197-67a643f76fdb",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Primaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5281
                },
                "schoolPlanPayment": {
                    "id": 14935
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2020-12-31 17:25:04",
                "updatedAt": "2020-12-31 17:25:15",
                "version": 1,
                "uuid": "d55eb560-6b0c-11eb-8cf8-67185fde8010",
                "folio": "NTKBCR-5281",
                "change": 0,
                "quantity": 870,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5281
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5287,
                        "createdAt": "2020-12-31 17:25:04",
                        "updatedAt": "2020-12-31 17:25:04",
                        "version": 1,
                        "uuid": "d55ebae0-6b0c-11eb-82fa-07621de9fe8b",
                        "codePaymentMethod": "03",
                        "quantity": 870,
                        "date": "2020-12-31",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5578,
                        "createdAt": "2020-12-31 17:25:13",
                        "updatedAt": "2020-12-31 17:25:15",
                        "version": 1,
                        "folio": "ACAKMCR-5578",
                        "uuid": "0DA31EAA-4BB7-11EB-B047-6983E1B79E9C",
                        "businessName": "DULCE NAHOMI SALAZAR TECUAUTZIN",
                        "rfc": "XAXX010101000",
                        "total": 870,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5281
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5285,
        "createdAt": "2021-01-04 09:11:12",
        "updatedAt": "2021-01-04 09:11:23",
        "version": 1,
        "uuid": "d55ebec0-6b0c-11eb-9526-95bf1e9ab021",
        "folio": "NTKBCR-5285",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 559
        },
        "chargesDetails": [
            {
                "id": 8234,
                "createdAt": "2021-01-04 09:11:12",
                "updatedAt": "2021-01-04 09:11:12",
                "version": 1,
                "uuid": "d5a10fa0-6b0c-11eb-a520-691c5c8f917e",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "inscripci\u00f3n o Reinscripci\u00f3n Secundaria",
                "quantity": 1,
                "price": 900,
                "schoolCharge": {
                    "id": 5285
                },
                "schoolPlanPayment": {
                    "id": 14950
                }
            },
            {
                "id": 8235,
                "createdAt": "2021-01-04 09:11:12",
                "updatedAt": "2021-01-04 09:11:12",
                "version": 1,
                "uuid": "d5a11520-6b0c-11eb-b335-ff35cde83f72",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "CUOTA SEQ",
                "quantity": 1,
                "price": 200,
                "schoolCharge": {
                    "id": 5285
                },
                "schoolPlanPayment": {
                    "id": 14961
                }
            },
            {
                "id": 8236,
                "createdAt": "2021-01-04 09:11:12",
                "updatedAt": "2021-01-04 09:11:12",
                "version": 1,
                "uuid": "d5a11a50-6b0c-11eb-a7e4-bdd2676b4262",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "ESCUELA PARA PADRES",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5285
                },
                "schoolPlanPayment": {
                    "id": 14962
                }
            },
            {
                "id": 8237,
                "createdAt": "2021-01-04 09:11:12",
                "updatedAt": "2021-01-04 09:11:12",
                "version": 1,
                "uuid": "d5a11e40-6b0c-11eb-97e2-ef7ab4344594",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Secundaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5285
                },
                "schoolPlanPayment": {
                    "id": 14963
                }
            },
            {
                "id": 8238,
                "createdAt": "2021-01-04 09:11:12",
                "updatedAt": "2021-01-04 09:11:12",
                "version": 1,
                "uuid": "d5a12210-6b0c-11eb-a205-019da0d51dd0",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Secundaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5285
                },
                "schoolPlanPayment": {
                    "id": 14964
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2021-01-04 09:11:12",
                "updatedAt": "2021-01-04 09:11:23",
                "version": 1,
                "uuid": "d5a12480-6b0c-11eb-b425-57fd23363924",
                "folio": "NTKBCR-5285",
                "change": 0,
                "quantity": 2100,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5285
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5291,
                        "createdAt": "2021-01-04 09:11:12",
                        "updatedAt": "2021-01-04 09:11:12",
                        "version": 1,
                        "uuid": "d5a127f0-6b0c-11eb-b694-a758173f741f",
                        "codePaymentMethod": "03",
                        "quantity": 2100,
                        "date": "2021-01-04",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5582,
                        "createdAt": "2021-01-04 09:11:21",
                        "updatedAt": "2021-01-04 09:11:23",
                        "version": 1,
                        "folio": "ACAKMCR-5582",
                        "uuid": "B94332F4-4E96-11EB-AB70-9123C0B455A1",
                        "businessName": "SARA UCAN DZIB",
                        "rfc": "UADS790428Q72",
                        "total": 2100,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5285
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5286,
        "createdAt": "2021-01-04 09:51:42",
        "updatedAt": "2021-01-04 09:51:57",
        "version": 1,
        "uuid": "d5a12d00-6b0c-11eb-92c4-195febc56d78",
        "folio": "NTKBCR-5286",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 474
        },
        "chargesDetails": [
            {
                "id": 8239,
                "createdAt": "2021-01-04 09:51:42",
                "updatedAt": "2021-01-04 09:51:42",
                "version": 1,
                "uuid": "d5e2b860-6b0c-11eb-b58d-f700f4ad59e0",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n primaria",
                "quantity": 1,
                "price": 665,
                "schoolCharge": {
                    "id": 5286
                },
                "schoolPlanPayment": {
                    "id": 14967
                }
            },
            {
                "id": 8240,
                "createdAt": "2021-01-04 09:51:42",
                "updatedAt": "2021-01-04 09:51:42",
                "version": 1,
                "uuid": "d5e2be40-6b0c-11eb-b688-6df88b0e1176",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Primaria",
                "quantity": 1,
                "price": 160,
                "schoolCharge": {
                    "id": 5286
                },
                "schoolPlanPayment": {
                    "id": 14978
                }
            },
            {
                "id": 8241,
                "createdAt": "2021-01-04 09:51:42",
                "updatedAt": "2021-01-04 09:51:42",
                "version": 1,
                "uuid": "d5e2c2d0-6b0c-11eb-a210-6fad01993f20",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5286
                },
                "schoolPlanPayment": {
                    "id": 14979
                }
            },
            {
                "id": 8242,
                "createdAt": "2021-01-04 09:51:42",
                "updatedAt": "2021-01-04 09:51:42",
                "version": 1,
                "uuid": "d5e2c750-6b0c-11eb-9a5c-85483be99204",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Primaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5286
                },
                "schoolPlanPayment": {
                    "id": 14980
                }
            },
            {
                "id": 8243,
                "createdAt": "2021-01-04 09:51:42",
                "updatedAt": "2021-01-04 09:51:42",
                "version": 1,
                "uuid": "d5e2cbc0-6b0c-11eb-8df5-c1504b1359e1",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Primaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5286
                },
                "schoolPlanPayment": {
                    "id": 14981
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2021-01-04 09:51:42",
                "updatedAt": "2021-01-04 09:51:57",
                "version": 1,
                "uuid": "d5e2cf50-6b0c-11eb-bdd8-b96b8831adfe",
                "folio": "NTKBCR-5286",
                "change": 0,
                "quantity": 1825,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5286
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5292,
                        "createdAt": "2021-01-04 09:51:42",
                        "updatedAt": "2021-01-04 09:51:42",
                        "version": 1,
                        "uuid": "d5e2d630-6b0c-11eb-9ebc-95e6a7127107",
                        "codePaymentMethod": "03",
                        "quantity": 1825,
                        "date": "2021-01-04",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5583,
                        "createdAt": "2021-01-04 09:51:50",
                        "updatedAt": "2021-01-04 09:51:57",
                        "version": 1,
                        "folio": "ACAKMCR-5583",
                        "uuid": "62E1D9BE-4E9C-11EB-BC67-7BA570071FC5",
                        "businessName": "ALCOCER NEGRON GIOVANNI CALIXTO",
                        "rfc": "AONG870409HN5",
                        "total": 1825,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5286
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5288,
        "createdAt": "2021-01-04 11:12:46",
        "updatedAt": "2021-01-04 11:12:54",
        "version": 1,
        "uuid": "d5e2e1c0-6b0c-11eb-b897-cfa853f91afe",
        "folio": "NTKBCR-5288",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 551
        },
        "chargesDetails": [
            {
                "id": 8245,
                "createdAt": "2021-01-04 11:12:46",
                "updatedAt": "2021-01-04 11:12:46",
                "version": 1,
                "uuid": "d6273690-6b0c-11eb-9562-e7d8c201ad8f",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n preescolar",
                "quantity": 1,
                "price": 525,
                "schoolCharge": {
                    "id": 5288
                },
                "schoolPlanPayment": {
                    "id": 14984
                }
            },
            {
                "id": 8246,
                "createdAt": "2021-01-04 11:12:46",
                "updatedAt": "2021-01-04 11:12:46",
                "version": 1,
                "uuid": "d6273ae0-6b0c-11eb-8c11-c92992197dbf",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Preescolar",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5288
                },
                "schoolPlanPayment": {
                    "id": 14995
                }
            },
            {
                "id": 8247,
                "createdAt": "2021-01-04 11:12:46",
                "updatedAt": "2021-01-04 11:12:46",
                "version": 1,
                "uuid": "d6273df0-6b0c-11eb-bbc6-4d138dedf82b",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5288
                },
                "schoolPlanPayment": {
                    "id": 14996
                }
            },
            {
                "id": 8248,
                "createdAt": "2021-01-04 11:12:46",
                "updatedAt": "2021-01-04 11:12:46",
                "version": 1,
                "uuid": "d6274100-6b0c-11eb-916f-f7497de32b98",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Preescolar",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5288
                },
                "schoolPlanPayment": {
                    "id": 14997
                }
            },
            {
                "id": 8249,
                "createdAt": "2021-01-04 11:12:46",
                "updatedAt": "2021-01-04 11:12:46",
                "version": 1,
                "uuid": "d6274380-6b0c-11eb-94e4-695e666bd5c1",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Preescolar",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5288
                },
                "schoolPlanPayment": {
                    "id": 14998
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2021-01-04 11:12:46",
                "updatedAt": "2021-01-04 11:12:54",
                "version": 1,
                "uuid": "d6274530-6b0c-11eb-9998-b931e916cb59",
                "folio": "NTKBCR-5288",
                "change": 0,
                "quantity": 1675,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5288
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5294,
                        "createdAt": "2021-01-04 11:12:46",
                        "updatedAt": "2021-01-04 11:12:46",
                        "version": 1,
                        "uuid": "d62747c0-6b0c-11eb-9e4d-d3b5a8504ad8",
                        "codePaymentMethod": "03",
                        "quantity": 1675,
                        "date": "2021-01-04",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5585,
                        "createdAt": "2021-01-04 11:12:52",
                        "updatedAt": "2021-01-04 11:12:54",
                        "version": 1,
                        "folio": "ACAKMCR-5585",
                        "uuid": "B3328AAC-4EA7-11EB-89BF-CF50722F6BDC",
                        "businessName": "Omar francisco lozoya chavez",
                        "rfc": "LOCO880214998",
                        "total": 1675,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5288
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5289,
        "createdAt": "2021-01-04 11:51:47",
        "updatedAt": "2021-01-04 11:52:05",
        "version": 1,
        "uuid": "d6274b60-6b0c-11eb-8384-cfa342f58ccd",
        "folio": "NTKBCR-5289",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 481
        },
        "chargesDetails": [
            {
                "id": 8250,
                "createdAt": "2021-01-04 11:51:47",
                "updatedAt": "2021-01-04 11:51:47",
                "version": 1,
                "uuid": "d6686490-6b0c-11eb-a00f-8f43db591a19",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "inscripci\u00f3n o Reinscripci\u00f3n Secundaria",
                "quantity": 1,
                "price": 1050,
                "schoolCharge": {
                    "id": 5289
                },
                "schoolPlanPayment": {
                    "id": 15001
                }
            },
            {
                "id": 8251,
                "createdAt": "2021-01-04 11:51:47",
                "updatedAt": "2021-01-04 11:51:47",
                "version": 1,
                "uuid": "d6686c60-6b0c-11eb-9355-b795712c36f9",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "CUOTA SEQ",
                "quantity": 1,
                "price": 200,
                "schoolCharge": {
                    "id": 5289
                },
                "schoolPlanPayment": {
                    "id": 15012
                }
            },
            {
                "id": 8252,
                "createdAt": "2021-01-04 11:51:47",
                "updatedAt": "2021-01-04 11:51:47",
                "version": 1,
                "uuid": "d6687280-6b0c-11eb-8a4c-0d6122763d3f",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "ESCUELA PARA PADRES",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5289
                },
                "schoolPlanPayment": {
                    "id": 15013
                }
            },
            {
                "id": 8253,
                "createdAt": "2021-01-04 11:51:47",
                "updatedAt": "2021-01-04 11:51:47",
                "version": 1,
                "uuid": "d6687840-6b0c-11eb-9ee3-3bd304aec541",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Secundaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5289
                },
                "schoolPlanPayment": {
                    "id": 15014
                }
            },
            {
                "id": 8254,
                "createdAt": "2021-01-04 11:51:47",
                "updatedAt": "2021-01-04 11:51:47",
                "version": 1,
                "uuid": "d6687f60-6b0c-11eb-a24a-4d79b3527bcb",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Secundaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5289
                },
                "schoolPlanPayment": {
                    "id": 15015
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2021-01-04 11:51:47",
                "updatedAt": "2021-01-04 11:52:05",
                "version": 1,
                "uuid": "d6688350-6b0c-11eb-88b7-add4aedffb5b",
                "folio": "NTKBCR-5289",
                "change": 0,
                "quantity": 2250,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5289
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5295,
                        "createdAt": "2021-01-04 11:51:47",
                        "updatedAt": "2021-01-04 11:51:47",
                        "version": 1,
                        "uuid": "d6688b00-6b0c-11eb-aeba-5ddcb66bfb6c",
                        "codePaymentMethod": "03",
                        "quantity": 2250,
                        "date": "2021-01-04",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5586,
                        "createdAt": "2021-01-04 11:51:58",
                        "updatedAt": "2021-01-04 11:52:04",
                        "version": 1,
                        "folio": "ACAKMCR-5586",
                        "uuid": "2A9BC0E0-4EAD-11EB-8A91-D56485EF9C97",
                        "businessName": "CARLOS LEONARDO ZAVALETA MACIAS",
                        "rfc": "XAXX010101000",
                        "total": 2250,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5289
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5290,
        "createdAt": "2021-01-05 10:11:49",
        "updatedAt": "2021-01-05 10:12:01",
        "version": 1,
        "uuid": "d66897a0-6b0c-11eb-9ae7-49ddf7893acc",
        "folio": "NTKBCR-5290",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 633
        },
        "chargesDetails": [
            {
                "id": 8255,
                "createdAt": "2021-01-05 10:11:49",
                "updatedAt": "2021-01-05 10:11:49",
                "version": 1,
                "uuid": "d6a9bac0-6b0c-11eb-95fe-f10829bee748",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n primaria",
                "quantity": 1,
                "price": 612.5,
                "schoolCharge": {
                    "id": 5290
                },
                "schoolPlanPayment": {
                    "id": 15018
                }
            },
            {
                "id": 8256,
                "createdAt": "2021-01-05 10:11:49",
                "updatedAt": "2021-01-05 10:11:49",
                "version": 1,
                "uuid": "d6a9cdd0-6b0c-11eb-b573-5f57aea5b564",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Primaria",
                "quantity": 1,
                "price": 160,
                "schoolCharge": {
                    "id": 5290
                },
                "schoolPlanPayment": {
                    "id": 15029
                }
            },
            {
                "id": 8257,
                "createdAt": "2021-01-05 10:11:49",
                "updatedAt": "2021-01-05 10:11:49",
                "version": 1,
                "uuid": "d6a9df50-6b0c-11eb-a1cc-1954956b1f1a",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5290
                },
                "schoolPlanPayment": {
                    "id": 15030
                }
            },
            {
                "id": 8258,
                "createdAt": "2021-01-05 10:11:49",
                "updatedAt": "2021-01-05 10:11:49",
                "version": 1,
                "uuid": "d6a9eef0-6b0c-11eb-8e0e-6575a5a08788",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Primaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5290
                },
                "schoolPlanPayment": {
                    "id": 15031
                }
            },
            {
                "id": 8259,
                "createdAt": "2021-01-05 10:11:49",
                "updatedAt": "2021-01-05 10:11:49",
                "version": 1,
                "uuid": "d6a9fe70-6b0c-11eb-8a51-61a5bdcac974",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Primaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5290
                },
                "schoolPlanPayment": {
                    "id": 15032
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2021-01-05 10:11:49",
                "updatedAt": "2021-01-05 10:12:01",
                "version": 1,
                "uuid": "d6aa0800-6b0c-11eb-a353-4be531df8c9a",
                "folio": "NTKBCR-5290",
                "change": 0,
                "quantity": 1772.5,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5290
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5296,
                        "createdAt": "2021-01-05 10:11:49",
                        "updatedAt": "2021-01-05 10:11:49",
                        "version": 1,
                        "uuid": "d6aa14e0-6b0c-11eb-8c09-4b33daad1224",
                        "codePaymentMethod": "01",
                        "quantity": 1772.5,
                        "date": "2021-01-05",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 1
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5587,
                        "createdAt": "2021-01-05 10:11:58",
                        "updatedAt": "2021-01-05 10:12:01",
                        "version": 1,
                        "folio": "ACAKMCR-5587",
                        "uuid": "5BEDC5EC-4F68-11EB-A515-4B370BA13447",
                        "businessName": "SAMUEL MORALES MORENO",
                        "rfc": "XAXX010101000",
                        "total": 1772.5,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5290
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5293,
        "createdAt": "2021-01-05 10:27:44",
        "updatedAt": "2021-01-05 10:27:55",
        "version": 1,
        "uuid": "d6aa2a60-6b0c-11eb-9373-01a26478ab7d",
        "folio": "NTKBCR-5293",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 486
        },
        "chargesDetails": [
            {
                "id": 8262,
                "createdAt": "2021-01-05 10:27:45",
                "updatedAt": "2021-01-05 10:27:45",
                "version": 1,
                "uuid": "d6ecabd0-6b0c-11eb-abdb-af6049a93052",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "inscripci\u00f3n o Reinscripci\u00f3n Secundaria",
                "quantity": 1,
                "price": 612,
                "schoolCharge": {
                    "id": 5293
                },
                "schoolPlanPayment": {
                    "id": 15035
                }
            },
            {
                "id": 8263,
                "createdAt": "2021-01-05 10:27:45",
                "updatedAt": "2021-01-05 10:27:45",
                "version": 1,
                "uuid": "d6ecb110-6b0c-11eb-976e-d1b99d720142",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "CUOTA SEQ",
                "quantity": 1,
                "price": 200,
                "schoolCharge": {
                    "id": 5293
                },
                "schoolPlanPayment": {
                    "id": 15046
                }
            },
            {
                "id": 8264,
                "createdAt": "2021-01-05 10:27:45",
                "updatedAt": "2021-01-05 10:27:45",
                "version": 1,
                "uuid": "d6ecb470-6b0c-11eb-9d90-89cee1f76e7c",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "ESCUELA PARA PADRES",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5293
                },
                "schoolPlanPayment": {
                    "id": 15047
                }
            },
            {
                "id": 8265,
                "createdAt": "2021-01-05 10:27:45",
                "updatedAt": "2021-01-05 10:27:45",
                "version": 1,
                "uuid": "d6ecb9d0-6b0c-11eb-afb7-65b1a1f809fe",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Secundaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5293
                },
                "schoolPlanPayment": {
                    "id": 15048
                }
            },
            {
                "id": 8266,
                "createdAt": "2021-01-05 10:27:45",
                "updatedAt": "2021-01-05 10:27:45",
                "version": 1,
                "uuid": "d6ecbdf0-6b0c-11eb-878d-0dc671b30a73",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Secundaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5293
                },
                "schoolPlanPayment": {
                    "id": 15049
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2021-01-05 10:27:44",
                "updatedAt": "2021-01-05 10:27:55",
                "version": 1,
                "uuid": "d6ecc020-6b0c-11eb-b76a-11673bb7a01c",
                "folio": "NTKBCR-5293",
                "change": 0,
                "quantity": 1812,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5293
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5299,
                        "createdAt": "2021-01-05 10:27:45",
                        "updatedAt": "2021-01-05 10:27:45",
                        "version": 1,
                        "uuid": "d6ecc430-6b0c-11eb-8d0d-adada8866e66",
                        "codePaymentMethod": "03",
                        "quantity": 1812,
                        "date": "2021-01-05",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5590,
                        "createdAt": "2021-01-05 10:27:53",
                        "updatedAt": "2021-01-05 10:27:55",
                        "version": 1,
                        "folio": "ACAKMCR-5590",
                        "uuid": "94D6087C-4F6A-11EB-B95B-3915ACBA4061",
                        "businessName": "ALEXANDER ALVAREZ PEREZ",
                        "rfc": "XAXX010101000",
                        "total": 1812,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5293
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5294,
        "createdAt": "2021-01-05 10:30:54",
        "updatedAt": "2021-01-05 10:31:03",
        "version": 1,
        "uuid": "d6ecc9c0-6b0c-11eb-88e4-85aa16c52367",
        "folio": "NTKBCR-5294",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 485
        },
        "chargesDetails": [
            {
                "id": 8267,
                "createdAt": "2021-01-05 10:30:54",
                "updatedAt": "2021-01-05 10:30:54",
                "version": 1,
                "uuid": "d72f1b50-6b0c-11eb-9d1a-4b0bfc7bbf01",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n primaria",
                "quantity": 1,
                "price": 612,
                "schoolCharge": {
                    "id": 5294
                },
                "schoolPlanPayment": {
                    "id": 15052
                }
            },
            {
                "id": 8268,
                "createdAt": "2021-01-05 10:30:54",
                "updatedAt": "2021-01-05 10:30:54",
                "version": 1,
                "uuid": "d72f20e0-6b0c-11eb-b16a-55c5258d90a3",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Primaria",
                "quantity": 1,
                "price": 160,
                "schoolCharge": {
                    "id": 5294
                },
                "schoolPlanPayment": {
                    "id": 15063
                }
            },
            {
                "id": 8269,
                "createdAt": "2021-01-05 10:30:54",
                "updatedAt": "2021-01-05 10:30:54",
                "version": 1,
                "uuid": "d72f2670-6b0c-11eb-a0ad-9b80a8a51c20",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5294
                },
                "schoolPlanPayment": {
                    "id": 15064
                }
            },
            {
                "id": 8270,
                "createdAt": "2021-01-05 10:30:54",
                "updatedAt": "2021-01-05 10:30:54",
                "version": 1,
                "uuid": "d72f29d0-6b0c-11eb-bb9a-474d48c848fa",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Primaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5294
                },
                "schoolPlanPayment": {
                    "id": 15065
                }
            },
            {
                "id": 8271,
                "createdAt": "2021-01-05 10:30:54",
                "updatedAt": "2021-01-05 10:30:54",
                "version": 1,
                "uuid": "d72f2df0-6b0c-11eb-9843-333687dfb40f",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Primaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5294
                },
                "schoolPlanPayment": {
                    "id": 15066
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2021-01-05 10:30:54",
                "updatedAt": "2021-01-05 10:31:03",
                "version": 1,
                "uuid": "d72f2fb0-6b0c-11eb-8aef-8b4da914fac9",
                "folio": "NTKBCR-5294",
                "change": 0,
                "quantity": 1772,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5294
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5300,
                        "createdAt": "2021-01-05 10:30:54",
                        "updatedAt": "2021-01-05 10:30:54",
                        "version": 1,
                        "uuid": "d72f3240-6b0c-11eb-8dda-17217973e426",
                        "codePaymentMethod": "03",
                        "quantity": 1772,
                        "date": "2021-01-05",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5591,
                        "createdAt": "2021-01-05 10:31:01",
                        "updatedAt": "2021-01-05 10:31:03",
                        "version": 1,
                        "folio": "ACAKMCR-5591",
                        "uuid": "04CF779E-4F6B-11EB-867E-FB78565B8D51",
                        "businessName": "IKER LEONARDO ALVAREZ PEREZ",
                        "rfc": "XAXX010101000",
                        "total": 1772,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5294
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5302,
        "createdAt": "2021-01-05 11:16:24",
        "updatedAt": "2021-01-05 11:16:35",
        "version": 1,
        "uuid": "d72f3610-6b0c-11eb-951a-539bbaddbf74",
        "folio": "NTKBCR-5302",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 96
        },
        "chargesDetails": [
            {
                "id": 8279,
                "createdAt": "2021-01-05 11:16:24",
                "updatedAt": "2021-01-05 11:16:24",
                "version": 1,
                "uuid": "d7712a50-6b0c-11eb-a62d-3d1e949a43f0",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n primaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5302
                },
                "schoolPlanPayment": {
                    "id": 15069
                }
            },
            {
                "id": 8280,
                "createdAt": "2021-01-05 11:16:24",
                "updatedAt": "2021-01-05 11:16:24",
                "version": 1,
                "uuid": "d7712db0-6b0c-11eb-a143-37feebaa3c22",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Primaria",
                "quantity": 1,
                "price": 160,
                "schoolCharge": {
                    "id": 5302
                },
                "schoolPlanPayment": {
                    "id": 15080
                }
            },
            {
                "id": 8281,
                "createdAt": "2021-01-05 11:16:24",
                "updatedAt": "2021-01-05 11:16:24",
                "version": 1,
                "uuid": "d7713060-6b0c-11eb-a9e2-534f176bb4af",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5302
                },
                "schoolPlanPayment": {
                    "id": 15081
                }
            },
            {
                "id": 8282,
                "createdAt": "2021-01-05 11:16:24",
                "updatedAt": "2021-01-05 11:16:24",
                "version": 1,
                "uuid": "d77132f0-6b0c-11eb-98ae-4d9a6e8ee0e4",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Primaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5302
                },
                "schoolPlanPayment": {
                    "id": 15082
                }
            },
            {
                "id": 8283,
                "createdAt": "2021-01-05 11:16:24",
                "updatedAt": "2021-01-05 11:16:24",
                "version": 1,
                "uuid": "d7713580-6b0c-11eb-a1dd-3197e70cb230",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Primaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5302
                },
                "schoolPlanPayment": {
                    "id": 15083
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2021-01-05 11:16:24",
                "updatedAt": "2021-01-05 11:16:35",
                "version": 1,
                "uuid": "d7713730-6b0c-11eb-ac4e-a36bb5ac566c",
                "folio": "NTKBCR-5302",
                "change": 0,
                "quantity": 1510,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5302
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5308,
                        "createdAt": "2021-01-05 11:16:24",
                        "updatedAt": "2021-01-05 11:16:24",
                        "version": 1,
                        "uuid": "d7713aa0-6b0c-11eb-b3c8-9553608f5f0a",
                        "codePaymentMethod": "03",
                        "quantity": 1510,
                        "date": "2021-01-05",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5600,
                        "createdAt": "2021-01-05 11:16:32",
                        "updatedAt": "2021-01-05 11:16:35",
                        "version": 1,
                        "folio": "ACAKMCR-5600",
                        "uuid": "60FE011A-4F71-11EB-992C-8B3DC28DF934",
                        "businessName": "EMILIANO CAMPOS CORDOVA",
                        "rfc": "XAXX010101000",
                        "total": 1510,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5302
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5327,
        "createdAt": "2021-01-06 12:38:20",
        "updatedAt": "2021-01-06 12:38:33",
        "version": 1,
        "uuid": "d7713e90-6b0c-11eb-8bd4-9da90303dc1f",
        "folio": "NTKBCR-5327",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 517
        },
        "chargesDetails": [
            {
                "id": 8308,
                "createdAt": "2021-01-06 12:38:20",
                "updatedAt": "2021-01-06 12:38:20",
                "version": 1,
                "uuid": "d8470790-6b0c-11eb-935b-29286d36c0fc",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "inscripci\u00f3n o Reinscripci\u00f3n Secundaria",
                "quantity": 1,
                "price": 665,
                "schoolCharge": {
                    "id": 5327
                },
                "schoolPlanPayment": {
                    "id": 15105
                }
            },
            {
                "id": 8309,
                "createdAt": "2021-01-06 12:38:20",
                "updatedAt": "2021-01-06 12:38:20",
                "version": 1,
                "uuid": "d8470cb0-6b0c-11eb-989b-c5b2f1128dc8",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "CUOTA SEQ",
                "quantity": 1,
                "price": 200,
                "schoolCharge": {
                    "id": 5327
                },
                "schoolPlanPayment": {
                    "id": 15116
                }
            },
            {
                "id": 8310,
                "createdAt": "2021-01-06 12:38:20",
                "updatedAt": "2021-01-06 12:38:20",
                "version": 1,
                "uuid": "d84710d0-6b0c-11eb-ab53-95c83a7be957",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "ESCUELA PARA PADRES",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5327
                },
                "schoolPlanPayment": {
                    "id": 15117
                }
            },
            {
                "id": 8311,
                "createdAt": "2021-01-06 12:38:20",
                "updatedAt": "2021-01-06 12:38:20",
                "version": 1,
                "uuid": "d8471520-6b0c-11eb-9203-250659369a40",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Secundaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5327
                },
                "schoolPlanPayment": {
                    "id": 15118
                }
            },
            {
                "id": 8312,
                "createdAt": "2021-01-06 12:38:20",
                "updatedAt": "2021-01-06 12:38:20",
                "version": 1,
                "uuid": "d84719f0-6b0c-11eb-9787-71253c816a6f",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Secundaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5327
                },
                "schoolPlanPayment": {
                    "id": 15119
                }
            },
            {
                "id": 8313,
                "createdAt": "2021-01-06 12:38:20",
                "updatedAt": "2021-01-06 12:38:20",
                "version": 1,
                "uuid": "d8471e40-6b0c-11eb-bfe1-97eefa334418",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Prueba de Antidoping (Tercer grado)",
                "quantity": 1,
                "price": 200,
                "schoolCharge": {
                    "id": 5327
                },
                "schoolPlanPayment": {
                    "id": 15120
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2021-01-06 12:38:20",
                "updatedAt": "2021-01-06 12:38:33",
                "version": 1,
                "uuid": "d84720e0-6b0c-11eb-a3cd-fddf2a98df62",
                "folio": "NTKBCR-5327",
                "change": 0,
                "quantity": 2065,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5327
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5333,
                        "createdAt": "2021-01-06 12:38:20",
                        "updatedAt": "2021-01-06 12:38:20",
                        "version": 1,
                        "uuid": "d84724a0-6b0c-11eb-bf1c-47b320818050",
                        "codePaymentMethod": "03",
                        "quantity": 2065,
                        "date": "2021-01-06",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5626,
                        "createdAt": "2021-01-06 12:38:26",
                        "updatedAt": "2021-01-06 12:38:33",
                        "version": 1,
                        "folio": "ACAKMCR-5626",
                        "uuid": "FE6D6196-5045-11EB-882B-89710ADDC5A6",
                        "businessName": "INGRID RODRIGUEZ MARTINEZ",
                        "rfc": "ROMI771126TV2",
                        "total": 2065,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5327
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5328,
        "createdAt": "2021-01-06 12:41:41",
        "updatedAt": "2021-01-06 12:42:45",
        "version": 1,
        "uuid": "d8472ab0-6b0c-11eb-ab97-8933e87f0122",
        "folio": "NTKBCR-5328",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 519
        },
        "chargesDetails": [
            {
                "id": 8314,
                "createdAt": "2021-01-06 12:41:41",
                "updatedAt": "2021-01-06 12:41:41",
                "version": 1,
                "uuid": "d88a8ed0-6b0c-11eb-a283-4bfdcb760257",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n primaria",
                "quantity": 1,
                "price": 525,
                "schoolCharge": {
                    "id": 5328
                },
                "schoolPlanPayment": {
                    "id": 15123
                }
            },
            {
                "id": 8315,
                "createdAt": "2021-01-06 12:41:42",
                "updatedAt": "2021-01-06 12:41:42",
                "version": 1,
                "uuid": "d88a9460-6b0c-11eb-9f21-4d04840d6497",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Primaria",
                "quantity": 1,
                "price": 160,
                "schoolCharge": {
                    "id": 5328
                },
                "schoolPlanPayment": {
                    "id": 15134
                }
            },
            {
                "id": 8316,
                "createdAt": "2021-01-06 12:41:42",
                "updatedAt": "2021-01-06 12:41:42",
                "version": 1,
                "uuid": "d88a9940-6b0c-11eb-ba99-932fb5e1e122",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5328
                },
                "schoolPlanPayment": {
                    "id": 15135
                }
            },
            {
                "id": 8317,
                "createdAt": "2021-01-06 12:41:42",
                "updatedAt": "2021-01-06 12:41:42",
                "version": 1,
                "uuid": "d88a9df0-6b0c-11eb-9326-2311bf8f9fd0",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Primaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5328
                },
                "schoolPlanPayment": {
                    "id": 15136
                }
            },
            {
                "id": 8318,
                "createdAt": "2021-01-06 12:41:42",
                "updatedAt": "2021-01-06 12:41:42",
                "version": 1,
                "uuid": "d88aa2f0-6b0c-11eb-9d03-4d6e2a6e241f",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Primaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5328
                },
                "schoolPlanPayment": {
                    "id": 15137
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2021-01-06 12:41:41",
                "updatedAt": "2021-01-06 12:42:45",
                "version": 1,
                "uuid": "d88aa620-6b0c-11eb-b4d0-d56cb34ec594",
                "folio": "NTKBCR-5328",
                "change": 0,
                "quantity": 1685,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5328
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5334,
                        "createdAt": "2021-01-06 12:41:42",
                        "updatedAt": "2021-01-06 12:41:42",
                        "version": 1,
                        "uuid": "d88aaa80-6b0c-11eb-ac51-cf6b2f09aff0",
                        "codePaymentMethod": "03",
                        "quantity": 1685,
                        "date": "2021-01-06",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5627,
                        "createdAt": "2021-01-06 12:42:43",
                        "updatedAt": "2021-01-06 12:42:45",
                        "version": 1,
                        "folio": "ACAKMCR-5627",
                        "uuid": "950A48EE-5046-11EB-9BB1-514EAD3BE719",
                        "businessName": "INGRID RODRIGUEZ MARTINEZ",
                        "rfc": "ROMI771126TV2",
                        "total": 1685,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5328
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5329,
        "createdAt": "2021-01-06 12:51:54",
        "updatedAt": "2021-01-06 12:52:04",
        "version": 1,
        "uuid": "d88ab1c0-6b0c-11eb-97fa-23c4cbea546b",
        "folio": "NTKBCR-5329",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 518
        },
        "chargesDetails": [
            {
                "id": 8319,
                "createdAt": "2021-01-06 12:51:54",
                "updatedAt": "2021-01-06 12:51:54",
                "version": 1,
                "uuid": "d8cbe550-6b0c-11eb-ae13-6999e1db9602",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "inscripci\u00f3n o Reinscripci\u00f3n Secundaria",
                "quantity": 1,
                "price": 612.5,
                "schoolCharge": {
                    "id": 5329
                },
                "schoolPlanPayment": {
                    "id": 15140
                }
            },
            {
                "id": 8320,
                "createdAt": "2021-01-06 12:51:54",
                "updatedAt": "2021-01-06 12:51:54",
                "version": 1,
                "uuid": "d8cbe900-6b0c-11eb-8afd-81a483fdcd45",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "CUOTA SEQ",
                "quantity": 1,
                "price": 200,
                "schoolCharge": {
                    "id": 5329
                },
                "schoolPlanPayment": {
                    "id": 15151
                }
            },
            {
                "id": 8321,
                "createdAt": "2021-01-06 12:51:54",
                "updatedAt": "2021-01-06 12:51:54",
                "version": 1,
                "uuid": "d8cbeba0-6b0c-11eb-b09e-eb4d7a1b9ad4",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "ESCUELA PARA PADRES",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5329
                },
                "schoolPlanPayment": {
                    "id": 15152
                }
            },
            {
                "id": 8322,
                "createdAt": "2021-01-06 12:51:54",
                "updatedAt": "2021-01-06 12:51:54",
                "version": 1,
                "uuid": "d8cbee30-6b0c-11eb-b150-ed070a162054",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Secundaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5329
                },
                "schoolPlanPayment": {
                    "id": 15153
                }
            },
            {
                "id": 8323,
                "createdAt": "2021-01-06 12:51:54",
                "updatedAt": "2021-01-06 12:51:54",
                "version": 1,
                "uuid": "d8cbf0b0-6b0c-11eb-b2af-49030434b4b7",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Secundaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5329
                },
                "schoolPlanPayment": {
                    "id": 15154
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2021-01-06 12:51:54",
                "updatedAt": "2021-01-06 12:52:04",
                "version": 1,
                "uuid": "d8cbf260-6b0c-11eb-8224-237c8a70c3f3",
                "folio": "NTKBCR-5329",
                "change": 0,
                "quantity": 1812.5,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5329
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5335,
                        "createdAt": "2021-01-06 12:51:54",
                        "updatedAt": "2021-01-06 12:51:54",
                        "version": 1,
                        "uuid": "d8cbf500-6b0c-11eb-8c4f-2956a4367301",
                        "codePaymentMethod": "03",
                        "quantity": 1812.5,
                        "date": "2021-01-06",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5628,
                        "createdAt": "2021-01-06 12:52:02",
                        "updatedAt": "2021-01-06 12:52:04",
                        "version": 1,
                        "folio": "ACAKMCR-5628",
                        "uuid": "E28FCE94-5047-11EB-81D4-EBDAA0A30481",
                        "businessName": "INGRID RODRIGUEZ MARTINEZ",
                        "rfc": "ROMI771126TV2",
                        "total": 1812.5,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5329
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5331,
        "createdAt": "2021-01-07 08:25:39",
        "updatedAt": "2021-01-07 08:25:50",
        "version": 1,
        "uuid": "d8cbf8b0-6b0c-11eb-b4b4-01b324ff982b",
        "folio": "NTKBCR-5331",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 589
        },
        "chargesDetails": [
            {
                "id": 8325,
                "createdAt": "2021-01-07 08:25:39",
                "updatedAt": "2021-01-07 08:25:39",
                "version": 1,
                "uuid": "d90d8a30-6b0c-11eb-b2a8-575a052b07df",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n primaria",
                "quantity": 1,
                "price": 612.5,
                "schoolCharge": {
                    "id": 5331
                },
                "schoolPlanPayment": {
                    "id": 15157
                }
            },
            {
                "id": 8326,
                "createdAt": "2021-01-07 08:25:39",
                "updatedAt": "2021-01-07 08:25:39",
                "version": 1,
                "uuid": "d90d8df0-6b0c-11eb-b931-bd4438b92d4e",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Primaria",
                "quantity": 1,
                "price": 160,
                "schoolCharge": {
                    "id": 5331
                },
                "schoolPlanPayment": {
                    "id": 15168
                }
            },
            {
                "id": 8327,
                "createdAt": "2021-01-07 08:25:39",
                "updatedAt": "2021-01-07 08:25:39",
                "version": 1,
                "uuid": "d90d90b0-6b0c-11eb-98fa-8d62e892a643",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5331
                },
                "schoolPlanPayment": {
                    "id": 15169
                }
            },
            {
                "id": 8328,
                "createdAt": "2021-01-07 08:25:39",
                "updatedAt": "2021-01-07 08:25:39",
                "version": 1,
                "uuid": "d90d9360-6b0c-11eb-a9c3-fde902555546",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Primaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5331
                },
                "schoolPlanPayment": {
                    "id": 15170
                }
            },
            {
                "id": 8329,
                "createdAt": "2021-01-07 08:25:39",
                "updatedAt": "2021-01-07 08:25:39",
                "version": 1,
                "uuid": "d90d9600-6b0c-11eb-98ad-0101c58a26fb",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Primaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5331
                },
                "schoolPlanPayment": {
                    "id": 15171
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2021-01-07 08:25:39",
                "updatedAt": "2021-01-07 08:25:50",
                "version": 1,
                "uuid": "d90d97c0-6b0c-11eb-9aef-c178242c2e59",
                "folio": "NTKBCR-5331",
                "change": 0,
                "quantity": 1772.5,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5331
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5337,
                        "createdAt": "2021-01-07 08:25:39",
                        "updatedAt": "2021-01-07 08:25:39",
                        "version": 1,
                        "uuid": "d90d9a70-6b0c-11eb-892a-d3ae523981c6",
                        "codePaymentMethod": "01",
                        "quantity": 1772.5,
                        "date": "2021-01-07",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 1
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5630,
                        "createdAt": "2021-01-07 08:25:48",
                        "updatedAt": "2021-01-07 08:25:50",
                        "version": 1,
                        "folio": "ACAKMCR-5630",
                        "uuid": "DBC30582-50EB-11EB-B8AB-456C925ABE37",
                        "businessName": "MATEO ROJAS OROPEZA",
                        "rfc": "XAXX010101000",
                        "total": 1772.5,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5331
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5332,
        "createdAt": "2021-01-07 08:26:56",
        "updatedAt": "2021-01-07 08:27:04",
        "version": 1,
        "uuid": "d90d9e90-6b0c-11eb-8726-b7df7c0a6df6",
        "folio": "NTKBCR-5332",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 588
        },
        "chargesDetails": [
            {
                "id": 8330,
                "createdAt": "2021-01-07 08:26:56",
                "updatedAt": "2021-01-07 08:26:56",
                "version": 1,
                "uuid": "d950db10-6b0c-11eb-bca3-293759d0d3b5",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n primaria",
                "quantity": 1,
                "price": 612.5,
                "schoolCharge": {
                    "id": 5332
                },
                "schoolPlanPayment": {
                    "id": 15174
                }
            },
            {
                "id": 8331,
                "createdAt": "2021-01-07 08:26:56",
                "updatedAt": "2021-01-07 08:26:56",
                "version": 1,
                "uuid": "d950e0c0-6b0c-11eb-809c-33eebe37225c",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Primaria",
                "quantity": 1,
                "price": 160,
                "schoolCharge": {
                    "id": 5332
                },
                "schoolPlanPayment": {
                    "id": 15185
                }
            },
            {
                "id": 8332,
                "createdAt": "2021-01-07 08:26:56",
                "updatedAt": "2021-01-07 08:26:56",
                "version": 1,
                "uuid": "d950e560-6b0c-11eb-8398-9b7cab2e0985",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5332
                },
                "schoolPlanPayment": {
                    "id": 15186
                }
            },
            {
                "id": 8333,
                "createdAt": "2021-01-07 08:26:56",
                "updatedAt": "2021-01-07 08:26:56",
                "version": 1,
                "uuid": "d950eaa0-6b0c-11eb-8678-0340d3740c1a",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Primaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5332
                },
                "schoolPlanPayment": {
                    "id": 15187
                }
            },
            {
                "id": 8334,
                "createdAt": "2021-01-07 08:26:56",
                "updatedAt": "2021-01-07 08:26:56",
                "version": 1,
                "uuid": "d950ef30-6b0c-11eb-b1ca-7b175839264f",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Primaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5332
                },
                "schoolPlanPayment": {
                    "id": 15188
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2021-01-07 08:26:56",
                "updatedAt": "2021-01-07 08:27:04",
                "version": 1,
                "uuid": "d950f210-6b0c-11eb-8c1e-6bac315119d8",
                "folio": "NTKBCR-5332",
                "change": 0,
                "quantity": 1772.5,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5332
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5338,
                        "createdAt": "2021-01-07 08:26:56",
                        "updatedAt": "2021-01-07 08:26:56",
                        "version": 1,
                        "uuid": "d950f610-6b0c-11eb-80d3-5be034a37c01",
                        "codePaymentMethod": "01",
                        "quantity": 1772.5,
                        "date": "2021-01-07",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 1
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5631,
                        "createdAt": "2021-01-07 08:27:02",
                        "updatedAt": "2021-01-07 08:27:04",
                        "version": 1,
                        "folio": "ACAKMCR-5631",
                        "uuid": "0773B906-50EC-11EB-B7A2-15EF926AF4C4",
                        "businessName": "MATEO ROJAS OROPEZA",
                        "rfc": "XAXX010101000",
                        "total": 1772.5,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5332
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5333,
        "createdAt": "2021-01-07 08:28:24",
        "updatedAt": "2021-01-07 08:28:35",
        "version": 1,
        "uuid": "d950fc40-6b0c-11eb-a522-8bd5b7081434",
        "folio": "NTKBCR-5333",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 147
        },
        "chargesDetails": [
            {
                "id": 8335,
                "createdAt": "2021-01-07 08:28:24",
                "updatedAt": "2021-01-07 08:28:24",
                "version": 1,
                "uuid": "d9928890-6b0c-11eb-9ad7-a3d3d636e871",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n primaria",
                "quantity": 1,
                "price": 210,
                "schoolCharge": {
                    "id": 5333
                },
                "schoolPlanPayment": {
                    "id": 15191
                }
            },
            {
                "id": 8336,
                "createdAt": "2021-01-07 08:28:24",
                "updatedAt": "2021-01-07 08:28:24",
                "version": 1,
                "uuid": "d9928c40-6b0c-11eb-a8a3-357c560c6ad4",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Primaria",
                "quantity": 1,
                "price": 160,
                "schoolCharge": {
                    "id": 5333
                },
                "schoolPlanPayment": {
                    "id": 15202
                }
            },
            {
                "id": 8337,
                "createdAt": "2021-01-07 08:28:25",
                "updatedAt": "2021-01-07 08:28:25",
                "version": 1,
                "uuid": "d9928f10-6b0c-11eb-9698-23abe05f32bc",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5333
                },
                "schoolPlanPayment": {
                    "id": 15203
                }
            },
            {
                "id": 8338,
                "createdAt": "2021-01-07 08:28:25",
                "updatedAt": "2021-01-07 08:28:25",
                "version": 1,
                "uuid": "d99291c0-6b0c-11eb-806a-27f24ded1927",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Primaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5333
                },
                "schoolPlanPayment": {
                    "id": 15204
                }
            },
            {
                "id": 8339,
                "createdAt": "2021-01-07 08:28:25",
                "updatedAt": "2021-01-07 08:28:25",
                "version": 1,
                "uuid": "d9929470-6b0c-11eb-a40d-29f4b9b0f8e2",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Primaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5333
                },
                "schoolPlanPayment": {
                    "id": 15205
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2021-01-07 08:28:24",
                "updatedAt": "2021-01-07 08:28:35",
                "version": 1,
                "uuid": "d9929660-6b0c-11eb-b8bd-95af43207c63",
                "folio": "NTKBCR-5333",
                "change": 0,
                "quantity": 1370,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5333
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5339,
                        "createdAt": "2021-01-07 08:28:25",
                        "updatedAt": "2021-01-07 08:28:25",
                        "version": 1,
                        "uuid": "d9929a30-6b0c-11eb-bf02-377cc06e8e78",
                        "codePaymentMethod": "03",
                        "quantity": 1370,
                        "date": "2021-01-07",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5632,
                        "createdAt": "2021-01-07 08:28:33",
                        "updatedAt": "2021-01-07 08:28:35",
                        "version": 1,
                        "folio": "ACAKMCR-5632",
                        "uuid": "3E2D89EA-50EC-11EB-BA32-9179A78CC4AB",
                        "businessName": "DOMINIC EDUARDO CETINA DE LA CRUZ",
                        "rfc": "XAXX010101000",
                        "total": 1370,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5333
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5334,
        "createdAt": "2021-01-07 08:31:46",
        "updatedAt": "2021-01-07 08:31:53",
        "version": 1,
        "uuid": "d9929ed0-6b0c-11eb-8e2d-c51fefd9f47c",
        "folio": "NTKBCR-5334",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 9
        },
        "chargesDetails": [
            {
                "id": 8340,
                "createdAt": "2021-01-07 08:31:46",
                "updatedAt": "2021-01-07 08:31:46",
                "version": 1,
                "uuid": "d9d5aaf0-6b0c-11eb-b67e-afa904958b2f",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n primaria",
                "quantity": 1,
                "price": 1225,
                "schoolCharge": {
                    "id": 5334
                },
                "schoolPlanPayment": {
                    "id": 15208
                }
            },
            {
                "id": 8341,
                "createdAt": "2021-01-07 08:31:46",
                "updatedAt": "2021-01-07 08:31:46",
                "version": 1,
                "uuid": "d9d5b040-6b0c-11eb-b53f-b7dae1341707",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Primaria",
                "quantity": 1,
                "price": 160,
                "schoolCharge": {
                    "id": 5334
                },
                "schoolPlanPayment": {
                    "id": 15219
                }
            },
            {
                "id": 8342,
                "createdAt": "2021-01-07 08:31:46",
                "updatedAt": "2021-01-07 08:31:46",
                "version": 1,
                "uuid": "d9d5b490-6b0c-11eb-b778-19922a221296",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5334
                },
                "schoolPlanPayment": {
                    "id": 15220
                }
            },
            {
                "id": 8343,
                "createdAt": "2021-01-07 08:31:46",
                "updatedAt": "2021-01-07 08:31:46",
                "version": 1,
                "uuid": "d9d5b8c0-6b0c-11eb-9a58-8f9b2acd46bf",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Primaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5334
                },
                "schoolPlanPayment": {
                    "id": 15221
                }
            },
            {
                "id": 8344,
                "createdAt": "2021-01-07 08:31:46",
                "updatedAt": "2021-01-07 08:31:46",
                "version": 1,
                "uuid": "d9d5be10-6b0c-11eb-9ab7-c9a9d132c821",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Primaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5334
                },
                "schoolPlanPayment": {
                    "id": 15222
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2021-01-07 08:31:46",
                "updatedAt": "2021-01-07 08:31:53",
                "version": 1,
                "uuid": "d9d5c0c0-6b0c-11eb-954d-417ff896ccfa",
                "folio": "NTKBCR-5334",
                "change": 0,
                "quantity": 2385,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5334
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5340,
                        "createdAt": "2021-01-07 08:31:46",
                        "updatedAt": "2021-01-07 08:31:46",
                        "version": 1,
                        "uuid": "d9d5c5a0-6b0c-11eb-b3e7-cf885487105b",
                        "codePaymentMethod": "03",
                        "quantity": 2385,
                        "date": "2021-01-07",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5633,
                        "createdAt": "2021-01-07 08:31:51",
                        "updatedAt": "2021-01-07 08:31:53",
                        "version": 1,
                        "folio": "ACAKMCR-5633",
                        "uuid": "B3D65668-50EC-11EB-BEFA-931713E36826",
                        "businessName": "MATIAS SANCHEZ GALVAN",
                        "rfc": "XAXX010101000",
                        "total": 2385,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5334
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5335,
        "createdAt": "2021-01-07 08:41:43",
        "updatedAt": "2021-01-07 08:41:56",
        "version": 1,
        "uuid": "d9d5ce00-6b0c-11eb-b164-25026b2652f8",
        "folio": "NTKBCR-5335",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 607
        },
        "chargesDetails": [
            {
                "id": 8345,
                "createdAt": "2021-01-07 08:41:43",
                "updatedAt": "2021-01-07 08:41:43",
                "version": 1,
                "uuid": "da174a20-6b0c-11eb-8349-677af96df642",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n primaria",
                "quantity": 1,
                "price": 280,
                "schoolCharge": {
                    "id": 5335
                },
                "schoolPlanPayment": {
                    "id": 15225
                }
            },
            {
                "id": 8346,
                "createdAt": "2021-01-07 08:41:43",
                "updatedAt": "2021-01-07 08:41:43",
                "version": 1,
                "uuid": "da174ed0-6b0c-11eb-af3c-9157893daf04",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Primaria",
                "quantity": 1,
                "price": 160,
                "schoolCharge": {
                    "id": 5335
                },
                "schoolPlanPayment": {
                    "id": 15236
                }
            },
            {
                "id": 8347,
                "createdAt": "2021-01-07 08:41:43",
                "updatedAt": "2021-01-07 08:41:43",
                "version": 1,
                "uuid": "da175260-6b0c-11eb-9fff-537038f47014",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5335
                },
                "schoolPlanPayment": {
                    "id": 15237
                }
            },
            {
                "id": 8348,
                "createdAt": "2021-01-07 08:41:43",
                "updatedAt": "2021-01-07 08:41:43",
                "version": 1,
                "uuid": "da1755f0-6b0c-11eb-83e5-61e60d484cb0",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Primaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5335
                },
                "schoolPlanPayment": {
                    "id": 15238
                }
            },
            {
                "id": 8349,
                "createdAt": "2021-01-07 08:41:43",
                "updatedAt": "2021-01-07 08:41:43",
                "version": 1,
                "uuid": "da175940-6b0c-11eb-8166-53400eb532b3",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Primaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5335
                },
                "schoolPlanPayment": {
                    "id": 15239
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2021-01-07 08:41:43",
                "updatedAt": "2021-01-07 08:41:56",
                "version": 1,
                "uuid": "da175b40-6b0c-11eb-b52b-71b3220772b9",
                "folio": "NTKBCR-5335",
                "change": 0,
                "quantity": 1440,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5335
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5341,
                        "createdAt": "2021-01-07 08:41:43",
                        "updatedAt": "2021-01-07 08:41:43",
                        "version": 1,
                        "uuid": "da175e20-6b0c-11eb-990d-0788168a808b",
                        "codePaymentMethod": "03",
                        "quantity": 1440,
                        "date": "2021-01-07",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5634,
                        "createdAt": "2021-01-07 08:41:49",
                        "updatedAt": "2021-01-07 08:41:56",
                        "version": 1,
                        "folio": "ACAKMCR-5634",
                        "uuid": "19C74DBE-50EE-11EB-AD75-29D95A836197",
                        "businessName": "NORMA VALERIA GONZALEZ ANGELEZ",
                        "rfc": "XAXX010101000",
                        "total": 1440,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5335
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5344,
        "createdAt": "2021-01-07 11:31:44",
        "updatedAt": "2021-01-07 11:31:53",
        "version": 1,
        "uuid": "da176270-6b0c-11eb-ab33-5df6413a61ed",
        "folio": "NTKBCR-5344",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 483
        },
        "chargesDetails": [
            {
                "id": 8358,
                "createdAt": "2021-01-07 11:31:44",
                "updatedAt": "2021-01-07 11:31:44",
                "version": 1,
                "uuid": "da59b480-6b0c-11eb-a4a3-ff51a655e37b",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n preescolar",
                "quantity": 1,
                "price": 1050,
                "schoolCharge": {
                    "id": 5344
                },
                "schoolPlanPayment": {
                    "id": 15259
                }
            },
            {
                "id": 8359,
                "createdAt": "2021-01-07 11:31:44",
                "updatedAt": "2021-01-07 11:31:44",
                "version": 1,
                "uuid": "da59ba90-6b0c-11eb-875d-abac4037b63b",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Preescolar",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5344
                },
                "schoolPlanPayment": {
                    "id": 15270
                }
            },
            {
                "id": 8360,
                "createdAt": "2021-01-07 11:31:44",
                "updatedAt": "2021-01-07 11:31:44",
                "version": 1,
                "uuid": "da59bf50-6b0c-11eb-83df-2b857d2df1f2",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5344
                },
                "schoolPlanPayment": {
                    "id": 15271
                }
            },
            {
                "id": 8361,
                "createdAt": "2021-01-07 11:31:44",
                "updatedAt": "2021-01-07 11:31:44",
                "version": 1,
                "uuid": "da59c3d0-6b0c-11eb-b364-91cf10421d31",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Preescolar",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5344
                },
                "schoolPlanPayment": {
                    "id": 15272
                }
            },
            {
                "id": 8362,
                "createdAt": "2021-01-07 11:31:44",
                "updatedAt": "2021-01-07 11:31:44",
                "version": 1,
                "uuid": "da59c850-6b0c-11eb-8602-576cbc46431b",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Preescolar",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5344
                },
                "schoolPlanPayment": {
                    "id": 15273
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2021-01-07 11:31:44",
                "updatedAt": "2021-01-07 11:31:53",
                "version": 1,
                "uuid": "da59cb40-6b0c-11eb-a4b7-cbcab39f4b0f",
                "folio": "NTKBCR-5344",
                "change": 0,
                "quantity": 2200,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5344
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5350,
                        "createdAt": "2021-01-07 11:31:44",
                        "updatedAt": "2021-01-07 11:31:44",
                        "version": 1,
                        "uuid": "da59cfe0-6b0c-11eb-b070-fb60388b2a22",
                        "codePaymentMethod": "03",
                        "quantity": 2200,
                        "date": "2021-01-07",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5643,
                        "createdAt": "2021-01-07 11:31:52",
                        "updatedAt": "2021-01-07 11:31:53",
                        "version": 1,
                        "folio": "ACAKMCR-5643",
                        "uuid": "D9830D16-5105-11EB-A1A0-F723AF0CEE90",
                        "businessName": "francisco lara ek",
                        "rfc": "LAEF850807C11",
                        "total": 2200,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5344
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5345,
        "createdAt": "2021-01-07 11:38:22",
        "updatedAt": "2021-01-07 11:38:32",
        "version": 1,
        "uuid": "da59d650-6b0c-11eb-b313-0bd96ed07a06",
        "folio": "NTKBCR-5345",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 482
        },
        "chargesDetails": [
            {
                "id": 8363,
                "createdAt": "2021-01-07 11:38:22",
                "updatedAt": "2021-01-07 11:38:22",
                "version": 1,
                "uuid": "daa56360-6b0c-11eb-89f5-cbda6620fb78",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n primaria",
                "quantity": 1,
                "price": 1050,
                "schoolCharge": {
                    "id": 5345
                },
                "schoolPlanPayment": {
                    "id": 15276
                }
            },
            {
                "id": 8364,
                "createdAt": "2021-01-07 11:38:22",
                "updatedAt": "2021-01-07 11:38:22",
                "version": 1,
                "uuid": "daa57180-6b0c-11eb-bdb5-81f9bf2ef84d",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Primaria",
                "quantity": 1,
                "price": 160,
                "schoolCharge": {
                    "id": 5345
                },
                "schoolPlanPayment": {
                    "id": 15287
                }
            },
            {
                "id": 8365,
                "createdAt": "2021-01-07 11:38:22",
                "updatedAt": "2021-01-07 11:38:22",
                "version": 1,
                "uuid": "daa57cc0-6b0c-11eb-bd8d-efaf0a271116",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5345
                },
                "schoolPlanPayment": {
                    "id": 15288
                }
            },
            {
                "id": 8366,
                "createdAt": "2021-01-07 11:38:22",
                "updatedAt": "2021-01-07 11:38:22",
                "version": 1,
                "uuid": "daa587a0-6b0c-11eb-80f5-73d60aed3ce8",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Primaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5345
                },
                "schoolPlanPayment": {
                    "id": 15289
                }
            },
            {
                "id": 8367,
                "createdAt": "2021-01-07 11:38:22",
                "updatedAt": "2021-01-07 11:38:22",
                "version": 1,
                "uuid": "daa58fb0-6b0c-11eb-a151-e165b37f4269",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Primaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5345
                },
                "schoolPlanPayment": {
                    "id": 15290
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2021-01-07 11:38:22",
                "updatedAt": "2021-01-07 11:38:32",
                "version": 1,
                "uuid": "daa594c0-6b0c-11eb-97e5-2d511c88eac0",
                "folio": "NTKBCR-5345",
                "change": 0,
                "quantity": 2210,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5345
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5351,
                        "createdAt": "2021-01-07 11:38:22",
                        "updatedAt": "2021-01-07 11:38:22",
                        "version": 1,
                        "uuid": "daa59e80-6b0c-11eb-92d1-c99eab86a88c",
                        "codePaymentMethod": "03",
                        "quantity": 2210,
                        "date": "2021-01-07",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5644,
                        "createdAt": "2021-01-07 11:38:30",
                        "updatedAt": "2021-01-07 11:38:32",
                        "version": 1,
                        "folio": "ACAKMCR-5644",
                        "uuid": "C70023D0-5106-11EB-9E16-65650D342A33",
                        "businessName": "francisco lara ek",
                        "rfc": "LAEF850807C11",
                        "total": 2210,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5345
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5346,
        "createdAt": "2021-01-07 11:39:20",
        "updatedAt": "2021-01-07 11:39:34",
        "version": 1,
        "uuid": "daa5ab90-6b0c-11eb-a198-fde2c8a34d84",
        "folio": "NTKBCR-5346",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 160
        },
        "chargesDetails": [
            {
                "id": 8368,
                "createdAt": "2021-01-07 11:39:21",
                "updatedAt": "2021-01-07 11:39:21",
                "version": 1,
                "uuid": "dae7bbb0-6b0c-11eb-b71f-6b6eb426bd07",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "inscripci\u00f3n o Reinscripci\u00f3n Secundaria",
                "quantity": 1,
                "price": 400,
                "schoolCharge": {
                    "id": 5346
                },
                "schoolPlanPayment": {
                    "id": 15242
                }
            },
            {
                "id": 8369,
                "createdAt": "2021-01-07 11:39:21",
                "updatedAt": "2021-01-07 11:39:21",
                "version": 1,
                "uuid": "dae7bf60-6b0c-11eb-b5fb-ed2288fe6ce7",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "CUOTA SEQ",
                "quantity": 1,
                "price": 200,
                "schoolCharge": {
                    "id": 5346
                },
                "schoolPlanPayment": {
                    "id": 15253
                }
            },
            {
                "id": 8370,
                "createdAt": "2021-01-07 11:39:21",
                "updatedAt": "2021-01-07 11:39:21",
                "version": 1,
                "uuid": "dae7c240-6b0c-11eb-929c-53563ceb94d9",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "ESCUELA PARA PADRES",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5346
                },
                "schoolPlanPayment": {
                    "id": 15254
                }
            },
            {
                "id": 8371,
                "createdAt": "2021-01-07 11:39:21",
                "updatedAt": "2021-01-07 11:39:21",
                "version": 1,
                "uuid": "dae7c4f0-6b0c-11eb-b841-95af22dfcf0b",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Secundaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5346
                },
                "schoolPlanPayment": {
                    "id": 15255
                }
            },
            {
                "id": 8372,
                "createdAt": "2021-01-07 11:39:21",
                "updatedAt": "2021-01-07 11:39:21",
                "version": 1,
                "uuid": "dae7c7a0-6b0c-11eb-80f0-c38c40e1d85e",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Secundaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5346
                },
                "schoolPlanPayment": {
                    "id": 15256
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2021-01-07 11:39:20",
                "updatedAt": "2021-01-07 11:39:34",
                "version": 1,
                "uuid": "dae7c980-6b0c-11eb-a418-b1be7753f7f8",
                "folio": "NTKBCR-5346",
                "change": 0,
                "quantity": 1600,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5346
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5352,
                        "createdAt": "2021-01-07 11:39:21",
                        "updatedAt": "2021-01-07 11:39:21",
                        "version": 1,
                        "uuid": "dae7cc30-6b0c-11eb-9caa-5febf473ce36",
                        "codePaymentMethod": "03",
                        "quantity": 1600,
                        "date": "2021-01-07",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5645,
                        "createdAt": "2021-01-07 11:39:26",
                        "updatedAt": "2021-01-07 11:39:34",
                        "version": 1,
                        "folio": "ACAKMCR-5645",
                        "uuid": "EB4AC556-5106-11EB-BB65-2B2BF8F3B0BE",
                        "businessName": "EMILY GAINZA FUNDORA",
                        "rfc": "XAXX010101000",
                        "total": 1600,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5346
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5347,
        "createdAt": "2021-01-07 11:45:16",
        "updatedAt": "2021-01-07 11:45:29",
        "version": 1,
        "uuid": "dae7d020-6b0c-11eb-a68f-5f4122d1a44c",
        "folio": "NTKBCR-5347",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 456
        },
        "chargesDetails": [
            {
                "id": 8373,
                "createdAt": "2021-01-07 11:45:16",
                "updatedAt": "2021-01-07 11:45:16",
                "version": 1,
                "uuid": "db294d00-6b0c-11eb-8432-ed1ebe927dd5",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "inscripci\u00f3n o Reinscripci\u00f3n Secundaria",
                "quantity": 1,
                "price": 770,
                "schoolCharge": {
                    "id": 5347
                },
                "schoolPlanPayment": {
                    "id": 15293
                }
            },
            {
                "id": 8374,
                "createdAt": "2021-01-07 11:45:16",
                "updatedAt": "2021-01-07 11:45:16",
                "version": 1,
                "uuid": "db295150-6b0c-11eb-9b73-b32d2ffad354",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "CUOTA SEQ",
                "quantity": 1,
                "price": 200,
                "schoolCharge": {
                    "id": 5347
                },
                "schoolPlanPayment": {
                    "id": 15304
                }
            },
            {
                "id": 8375,
                "createdAt": "2021-01-07 11:45:16",
                "updatedAt": "2021-01-07 11:45:16",
                "version": 1,
                "uuid": "db295490-6b0c-11eb-bafc-51addc140ac3",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "ESCUELA PARA PADRES",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5347
                },
                "schoolPlanPayment": {
                    "id": 15305
                }
            },
            {
                "id": 8376,
                "createdAt": "2021-01-07 11:45:16",
                "updatedAt": "2021-01-07 11:45:16",
                "version": 1,
                "uuid": "db2957b0-6b0c-11eb-a5d2-17d7bc6862a6",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Secundaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5347
                },
                "schoolPlanPayment": {
                    "id": 15306
                }
            },
            {
                "id": 8377,
                "createdAt": "2021-01-07 11:45:16",
                "updatedAt": "2021-01-07 11:45:16",
                "version": 1,
                "uuid": "db295ae0-6b0c-11eb-acc6-1baf85015ebe",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Secundaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5347
                },
                "schoolPlanPayment": {
                    "id": 15307
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2021-01-07 11:45:16",
                "updatedAt": "2021-01-07 11:45:29",
                "version": 1,
                "uuid": "db295ed0-6b0c-11eb-979b-471073071f28",
                "folio": "NTKBCR-5347",
                "change": 0,
                "quantity": 1970,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5347
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5353,
                        "createdAt": "2021-01-07 11:45:16",
                        "updatedAt": "2021-01-07 11:45:16",
                        "version": 1,
                        "uuid": "db296350-6b0c-11eb-bfd0-d778886befef",
                        "codePaymentMethod": "01",
                        "quantity": 1970,
                        "date": "2021-01-07",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 1
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5646,
                        "createdAt": "2021-01-07 11:45:27",
                        "updatedAt": "2021-01-07 11:45:29",
                        "version": 1,
                        "folio": "ACAKMCR-5646",
                        "uuid": "BF8D2C8C-5107-11EB-BD35-C3E57B8B7AAA",
                        "businessName": "LUIS EMILIO SANCHEZ CRUZ",
                        "rfc": "XAXX010101000",
                        "total": 1970,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5347
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5348,
        "createdAt": "2021-01-07 11:48:43",
        "updatedAt": "2021-01-07 11:49:01",
        "version": 1,
        "uuid": "db296ae0-6b0c-11eb-bfb6-55c4183064bf",
        "folio": "NTKBCR-5348",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 457
        },
        "chargesDetails": [
            {
                "id": 8378,
                "createdAt": "2021-01-07 11:48:43",
                "updatedAt": "2021-01-07 11:48:43",
                "version": 1,
                "uuid": "dbe3c630-6b0c-11eb-8cab-5739dafbd1ae",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n primaria",
                "quantity": 1,
                "price": 700,
                "schoolCharge": {
                    "id": 5348
                },
                "schoolPlanPayment": {
                    "id": 15310
                }
            },
            {
                "id": 8379,
                "createdAt": "2021-01-07 11:48:43",
                "updatedAt": "2021-01-07 11:48:43",
                "version": 1,
                "uuid": "dbe3ca40-6b0c-11eb-80e5-e9c31c0b7617",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Primaria",
                "quantity": 1,
                "price": 160,
                "schoolCharge": {
                    "id": 5348
                },
                "schoolPlanPayment": {
                    "id": 15321
                }
            },
            {
                "id": 8380,
                "createdAt": "2021-01-07 11:48:43",
                "updatedAt": "2021-01-07 11:48:43",
                "version": 1,
                "uuid": "dbe3cd60-6b0c-11eb-9837-7fc5af9c5542",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5348
                },
                "schoolPlanPayment": {
                    "id": 15322
                }
            },
            {
                "id": 8381,
                "createdAt": "2021-01-07 11:48:43",
                "updatedAt": "2021-01-07 11:48:43",
                "version": 1,
                "uuid": "dbe3d000-6b0c-11eb-b89e-7966d3ea59b7",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Primaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5348
                },
                "schoolPlanPayment": {
                    "id": 15323
                }
            },
            {
                "id": 8382,
                "createdAt": "2021-01-07 11:48:43",
                "updatedAt": "2021-01-07 11:48:43",
                "version": 1,
                "uuid": "dbe3d2a0-6b0c-11eb-b893-974e5038e95c",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Primaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5348
                },
                "schoolPlanPayment": {
                    "id": 15324
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2021-01-07 11:48:43",
                "updatedAt": "2021-01-07 11:49:01",
                "version": 1,
                "uuid": "dbe3d460-6b0c-11eb-aa07-558df69d9f1d",
                "folio": "NTKBCR-5348",
                "change": 0,
                "quantity": 1860,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5348
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5354,
                        "createdAt": "2021-01-07 11:48:43",
                        "updatedAt": "2021-01-07 11:48:43",
                        "version": 1,
                        "uuid": "dbe3d700-6b0c-11eb-a1ee-61b1dd68ffc0",
                        "codePaymentMethod": "01",
                        "quantity": 1860,
                        "date": "2021-01-07",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 1
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5647,
                        "createdAt": "2021-01-07 11:48:59",
                        "updatedAt": "2021-01-07 11:49:01",
                        "version": 1,
                        "folio": "ACAKMCR-5647",
                        "uuid": "3E381EE8-5108-11EB-8526-FD39AF5BD9C4",
                        "businessName": "XIMENA ISABEL SANCHEZ CRUZ",
                        "rfc": "XAXX010101000",
                        "total": 1860,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5348
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5349,
        "createdAt": "2021-01-07 11:53:00",
        "updatedAt": "2021-01-07 11:53:09",
        "version": 1,
        "uuid": "dbe3dae0-6b0c-11eb-80bf-b5a6545fbbb5",
        "folio": "NTKBCR-5349",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 546
        },
        "chargesDetails": [
            {
                "id": 8383,
                "createdAt": "2021-01-07 11:53:00",
                "updatedAt": "2021-01-07 11:53:00",
                "version": 1,
                "uuid": "dc274c50-6b0c-11eb-8769-a974847d8413",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n preescolar",
                "quantity": 1,
                "price": 600,
                "schoolCharge": {
                    "id": 5349
                },
                "schoolPlanPayment": {
                    "id": 15327
                }
            },
            {
                "id": 8384,
                "createdAt": "2021-01-07 11:53:00",
                "updatedAt": "2021-01-07 11:53:00",
                "version": 1,
                "uuid": "dc275050-6b0c-11eb-a39b-376b4ea26c23",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Preescolar",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5349
                },
                "schoolPlanPayment": {
                    "id": 15338
                }
            },
            {
                "id": 8385,
                "createdAt": "2021-01-07 11:53:00",
                "updatedAt": "2021-01-07 11:53:00",
                "version": 1,
                "uuid": "dc2753e0-6b0c-11eb-bd3c-fb5dd4ee456a",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5349
                },
                "schoolPlanPayment": {
                    "id": 15339
                }
            },
            {
                "id": 8386,
                "createdAt": "2021-01-07 11:53:01",
                "updatedAt": "2021-01-07 11:53:01",
                "version": 1,
                "uuid": "dc2756c0-6b0c-11eb-b822-0b82b68ec182",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Preescolar",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5349
                },
                "schoolPlanPayment": {
                    "id": 15340
                }
            },
            {
                "id": 8387,
                "createdAt": "2021-01-07 11:53:01",
                "updatedAt": "2021-01-07 11:53:01",
                "version": 1,
                "uuid": "dc275960-6b0c-11eb-bc19-7b21f76aba83",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Preescolar",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5349
                },
                "schoolPlanPayment": {
                    "id": 15341
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2021-01-07 11:53:00",
                "updatedAt": "2021-01-07 11:53:09",
                "version": 1,
                "uuid": "dc275b40-6b0c-11eb-91c1-63cfaa50ecb0",
                "folio": "NTKBCR-5349",
                "change": 0,
                "quantity": 1750,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5349
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5355,
                        "createdAt": "2021-01-07 11:53:01",
                        "updatedAt": "2021-01-07 11:53:01",
                        "version": 1,
                        "uuid": "dc275de0-6b0c-11eb-99f1-6bedf681dced",
                        "codePaymentMethod": "03",
                        "quantity": 1750,
                        "date": "2021-01-07",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5648,
                        "createdAt": "2021-01-07 11:53:08",
                        "updatedAt": "2021-01-07 11:53:09",
                        "version": 1,
                        "folio": "ACAKMCR-5648",
                        "uuid": "D2128766-5108-11EB-81DD-C116340B9979",
                        "businessName": "IKER SAID SANCHEZ AGUILAR",
                        "rfc": "XAXX010101000",
                        "total": 1750,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5349
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5350,
        "createdAt": "2021-01-07 12:17:26",
        "updatedAt": "2021-01-07 12:17:37",
        "version": 1,
        "uuid": "dc276210-6b0c-11eb-b5a0-23b18568ada5",
        "folio": "NTKBCR-5350",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 555
        },
        "chargesDetails": [
            {
                "id": 8388,
                "createdAt": "2021-01-07 12:17:27",
                "updatedAt": "2021-01-07 12:17:27",
                "version": 1,
                "uuid": "dc6aacb0-6b0c-11eb-808c-7f853d99a88f",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n primaria",
                "quantity": 1,
                "price": 1225,
                "schoolCharge": {
                    "id": 5350
                },
                "schoolPlanPayment": {
                    "id": 15344
                }
            },
            {
                "id": 8389,
                "createdAt": "2021-01-07 12:17:27",
                "updatedAt": "2021-01-07 12:17:27",
                "version": 1,
                "uuid": "dc6ab160-6b0c-11eb-833b-bf222f8fbc31",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Primaria",
                "quantity": 1,
                "price": 160,
                "schoolCharge": {
                    "id": 5350
                },
                "schoolPlanPayment": {
                    "id": 15355
                }
            },
            {
                "id": 8390,
                "createdAt": "2021-01-07 12:17:27",
                "updatedAt": "2021-01-07 12:17:27",
                "version": 1,
                "uuid": "dc6ab480-6b0c-11eb-9596-99429cd0b8aa",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5350
                },
                "schoolPlanPayment": {
                    "id": 15356
                }
            },
            {
                "id": 8391,
                "createdAt": "2021-01-07 12:17:27",
                "updatedAt": "2021-01-07 12:17:27",
                "version": 1,
                "uuid": "dc6ab740-6b0c-11eb-bd58-fb011d4f151b",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Primaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5350
                },
                "schoolPlanPayment": {
                    "id": 15357
                }
            },
            {
                "id": 8392,
                "createdAt": "2021-01-07 12:17:27",
                "updatedAt": "2021-01-07 12:17:27",
                "version": 1,
                "uuid": "dc6ab9f0-6b0c-11eb-9a34-5fb371e855a6",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Primaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5350
                },
                "schoolPlanPayment": {
                    "id": 15358
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2021-01-07 12:17:26",
                "updatedAt": "2021-01-07 12:17:37",
                "version": 1,
                "uuid": "dc6abbd0-6b0c-11eb-af5f-19b2f7ee0fdf",
                "folio": "NTKBCR-5350",
                "change": 0,
                "quantity": 2385,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5350
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5356,
                        "createdAt": "2021-01-07 12:17:27",
                        "updatedAt": "2021-01-07 12:17:27",
                        "version": 1,
                        "uuid": "dc6abe90-6b0c-11eb-9fe8-afd132dd82d6",
                        "codePaymentMethod": "03",
                        "quantity": 2385,
                        "date": "2021-01-07",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5649,
                        "createdAt": "2021-01-07 12:17:35",
                        "updatedAt": "2021-01-07 12:17:37",
                        "version": 1,
                        "folio": "ACAKMCR-5649",
                        "uuid": "3CFF2950-510C-11EB-B22F-551599024F14",
                        "businessName": "DIEGO LOPEZ RUIZ",
                        "rfc": "XAXX010101000",
                        "total": 2385,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5350
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5351,
        "createdAt": "2021-01-07 12:19:44",
        "updatedAt": "2021-01-07 12:19:53",
        "version": 1,
        "uuid": "dc6ac290-6b0c-11eb-be58-d3e65806a317",
        "folio": "NTKBCR-5351",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 554
        },
        "chargesDetails": [
            {
                "id": 8393,
                "createdAt": "2021-01-07 12:19:44",
                "updatedAt": "2021-01-07 12:19:44",
                "version": 1,
                "uuid": "dcabde40-6b0c-11eb-9f8a-3799e30d4b13",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n primaria",
                "quantity": 1,
                "price": 1225,
                "schoolCharge": {
                    "id": 5351
                },
                "schoolPlanPayment": {
                    "id": 15361
                }
            },
            {
                "id": 8394,
                "createdAt": "2021-01-07 12:19:44",
                "updatedAt": "2021-01-07 12:19:44",
                "version": 1,
                "uuid": "dcabe1f0-6b0c-11eb-8f4b-dde226b87a7b",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Primaria",
                "quantity": 1,
                "price": 160,
                "schoolCharge": {
                    "id": 5351
                },
                "schoolPlanPayment": {
                    "id": 15372
                }
            },
            {
                "id": 8395,
                "createdAt": "2021-01-07 12:19:45",
                "updatedAt": "2021-01-07 12:19:45",
                "version": 1,
                "uuid": "dcabe500-6b0c-11eb-a740-61d7e4e6f85c",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5351
                },
                "schoolPlanPayment": {
                    "id": 15373
                }
            },
            {
                "id": 8396,
                "createdAt": "2021-01-07 12:19:45",
                "updatedAt": "2021-01-07 12:19:45",
                "version": 1,
                "uuid": "dcabe7c0-6b0c-11eb-833a-f3f7cd94f17e",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Primaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5351
                },
                "schoolPlanPayment": {
                    "id": 15374
                }
            },
            {
                "id": 8397,
                "createdAt": "2021-01-07 12:19:45",
                "updatedAt": "2021-01-07 12:19:45",
                "version": 1,
                "uuid": "dcabec40-6b0c-11eb-b60d-131328dc2947",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Primaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5351
                },
                "schoolPlanPayment": {
                    "id": 15375
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2021-01-07 12:19:44",
                "updatedAt": "2021-01-07 12:19:53",
                "version": 1,
                "uuid": "dcabef10-6b0c-11eb-9f3c-a7b819c2631b",
                "folio": "NTKBCR-5351",
                "change": 0,
                "quantity": 2385,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5351
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5357,
                        "createdAt": "2021-01-07 12:19:45",
                        "updatedAt": "2021-01-07 12:19:45",
                        "version": 1,
                        "uuid": "dcabf200-6b0c-11eb-ae78-4954f7685fd3",
                        "codePaymentMethod": "03",
                        "quantity": 2385,
                        "date": "2021-01-07",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5650,
                        "createdAt": "2021-01-07 12:19:51",
                        "updatedAt": "2021-01-07 12:19:53",
                        "version": 1,
                        "folio": "ACAKMCR-5650",
                        "uuid": "8DE9AE12-510C-11EB-A084-613B1B5EE2AF",
                        "businessName": "MARIA ISABELLA LOPEZ RUIZ",
                        "rfc": "XAXX010101000",
                        "total": 2385,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5351
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5352,
        "createdAt": "2021-01-07 12:26:44",
        "updatedAt": "2021-01-07 12:26:51",
        "version": 1,
        "uuid": "dcabf880-6b0c-11eb-99ca-e5a0f8811e56",
        "folio": "NTKBCR-5352",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 463
        },
        "chargesDetails": [
            {
                "id": 8398,
                "createdAt": "2021-01-07 12:26:44",
                "updatedAt": "2021-01-07 12:26:44",
                "version": 1,
                "uuid": "dcee4ec0-6b0c-11eb-9601-f9df693b093a",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n preescolar",
                "quantity": 1,
                "price": 525,
                "schoolCharge": {
                    "id": 5352
                },
                "schoolPlanPayment": {
                    "id": 15378
                }
            },
            {
                "id": 8399,
                "createdAt": "2021-01-07 12:26:44",
                "updatedAt": "2021-01-07 12:26:44",
                "version": 1,
                "uuid": "dcee5270-6b0c-11eb-94c3-adacb39afd2a",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Preescolar",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5352
                },
                "schoolPlanPayment": {
                    "id": 15389
                }
            },
            {
                "id": 8400,
                "createdAt": "2021-01-07 12:26:44",
                "updatedAt": "2021-01-07 12:26:44",
                "version": 1,
                "uuid": "dcee5530-6b0c-11eb-975f-d52a8cce1dc2",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5352
                },
                "schoolPlanPayment": {
                    "id": 15390
                }
            },
            {
                "id": 8401,
                "createdAt": "2021-01-07 12:26:44",
                "updatedAt": "2021-01-07 12:26:44",
                "version": 1,
                "uuid": "dcee57d0-6b0c-11eb-a1d3-0d452e8fc954",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Preescolar",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5352
                },
                "schoolPlanPayment": {
                    "id": 15391
                }
            },
            {
                "id": 8402,
                "createdAt": "2021-01-07 12:26:44",
                "updatedAt": "2021-01-07 12:26:44",
                "version": 1,
                "uuid": "dcee5a70-6b0c-11eb-89c0-87f19106935f",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Preescolar",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5352
                },
                "schoolPlanPayment": {
                    "id": 15392
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2021-01-07 12:26:44",
                "updatedAt": "2021-01-07 12:26:51",
                "version": 1,
                "uuid": "dcee5c30-6b0c-11eb-8646-5b59897fa1db",
                "folio": "NTKBCR-5352",
                "change": 0,
                "quantity": 1675,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5352
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5358,
                        "createdAt": "2021-01-07 12:26:44",
                        "updatedAt": "2021-01-07 12:26:44",
                        "version": 1,
                        "uuid": "dcee5ed0-6b0c-11eb-a7d9-6b250b470364",
                        "codePaymentMethod": "03",
                        "quantity": 1675,
                        "date": "2021-01-07",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5651,
                        "createdAt": "2021-01-07 12:26:49",
                        "updatedAt": "2021-01-07 12:26:51",
                        "version": 1,
                        "folio": "ACAKMCR-5651",
                        "uuid": "873737A0-510D-11EB-9C85-E58461D45E80",
                        "businessName": "LUIS BELEN ROMAN HERNANDEZ",
                        "rfc": "XAXX010101000",
                        "total": 1675,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5352
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5389,
        "createdAt": "2021-01-11 07:53:54",
        "updatedAt": "2021-01-11 07:54:04",
        "version": 1,
        "uuid": "dcee6290-6b0c-11eb-a8ad-c1e06210280a",
        "folio": "NTKBCR-5389",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 188
        },
        "chargesDetails": [
            {
                "id": 8451,
                "createdAt": "2021-01-11 07:53:54",
                "updatedAt": "2021-01-11 07:53:54",
                "version": 1,
                "uuid": "dd3282f0-6b0c-11eb-892c-d1e6b45dfb9e",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "inscripci\u00f3n o Reinscripci\u00f3n Secundaria",
                "quantity": 1,
                "price": 595,
                "schoolCharge": {
                    "id": 5389
                },
                "schoolPlanPayment": {
                    "id": 15397
                }
            },
            {
                "id": 8452,
                "createdAt": "2021-01-11 07:53:54",
                "updatedAt": "2021-01-11 07:53:54",
                "version": 1,
                "uuid": "dd3287a0-6b0c-11eb-b029-3d968f7f74dc",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "CUOTA SEQ",
                "quantity": 1,
                "price": 200,
                "schoolCharge": {
                    "id": 5389
                },
                "schoolPlanPayment": {
                    "id": 15408
                }
            },
            {
                "id": 8453,
                "createdAt": "2021-01-11 07:53:54",
                "updatedAt": "2021-01-11 07:53:54",
                "version": 1,
                "uuid": "dd328b40-6b0c-11eb-b44c-836a936ec298",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "ESCUELA PARA PADRES",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5389
                },
                "schoolPlanPayment": {
                    "id": 15409
                }
            },
            {
                "id": 8454,
                "createdAt": "2021-01-11 07:53:54",
                "updatedAt": "2021-01-11 07:53:54",
                "version": 1,
                "uuid": "dd328e80-6b0c-11eb-9ed2-a39c64a38bd6",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Secundaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5389
                },
                "schoolPlanPayment": {
                    "id": 15410
                }
            },
            {
                "id": 8455,
                "createdAt": "2021-01-11 07:53:54",
                "updatedAt": "2021-01-11 07:53:54",
                "version": 1,
                "uuid": "dd329180-6b0c-11eb-811e-a5bd28d7793b",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Secundaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5389
                },
                "schoolPlanPayment": {
                    "id": 15411
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2021-01-11 07:53:54",
                "updatedAt": "2021-01-11 07:54:04",
                "version": 1,
                "uuid": "dd329380-6b0c-11eb-bba1-73fa7dde5743",
                "folio": "NTKBCR-5389",
                "change": 0,
                "quantity": 1795,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5389
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5395,
                        "createdAt": "2021-01-11 07:53:54",
                        "updatedAt": "2021-01-11 07:53:54",
                        "version": 1,
                        "uuid": "dd329650-6b0c-11eb-aac7-2115470f32b6",
                        "codePaymentMethod": "03",
                        "quantity": 1795,
                        "date": "2021-01-11",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5691,
                        "createdAt": "2021-01-11 07:54:01",
                        "updatedAt": "2021-01-11 07:54:04",
                        "version": 1,
                        "folio": "ACAKMCR-5691",
                        "uuid": "14F86F54-540C-11EB-A249-23F5BA77ED0E",
                        "businessName": "JIMENA RODRIGUEZ BASTIDA",
                        "rfc": "XAXX010101000",
                        "total": 1795,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5389
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5390,
        "createdAt": "2021-01-11 08:04:22",
        "updatedAt": "2021-01-11 08:04:35",
        "version": 1,
        "uuid": "dd329ae0-6b0c-11eb-993d-156d62f7a49b",
        "folio": "NTKBCR-5390",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 629
        },
        "chargesDetails": [
            {
                "id": 8456,
                "createdAt": "2021-01-11 08:04:22",
                "updatedAt": "2021-01-11 08:04:22",
                "version": 1,
                "uuid": "dd740340-6b0c-11eb-859d-f1dbb44c067c",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n primaria",
                "quantity": 1,
                "price": 420,
                "schoolCharge": {
                    "id": 5390
                },
                "schoolPlanPayment": {
                    "id": 15414
                }
            },
            {
                "id": 8457,
                "createdAt": "2021-01-11 08:04:22",
                "updatedAt": "2021-01-11 08:04:22",
                "version": 1,
                "uuid": "dd7407c0-6b0c-11eb-b50d-b916984521a0",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Primaria",
                "quantity": 1,
                "price": 160,
                "schoolCharge": {
                    "id": 5390
                },
                "schoolPlanPayment": {
                    "id": 15425
                }
            },
            {
                "id": 8458,
                "createdAt": "2021-01-11 08:04:22",
                "updatedAt": "2021-01-11 08:04:22",
                "version": 1,
                "uuid": "dd740ae0-6b0c-11eb-902d-51a2fe35f182",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5390
                },
                "schoolPlanPayment": {
                    "id": 15426
                }
            },
            {
                "id": 8459,
                "createdAt": "2021-01-11 08:04:22",
                "updatedAt": "2021-01-11 08:04:22",
                "version": 1,
                "uuid": "dd740db0-6b0c-11eb-a75e-7f0c8da7b1e8",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Primaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5390
                },
                "schoolPlanPayment": {
                    "id": 15427
                }
            },
            {
                "id": 8460,
                "createdAt": "2021-01-11 08:04:22",
                "updatedAt": "2021-01-11 08:04:22",
                "version": 1,
                "uuid": "dd741120-6b0c-11eb-a0b5-c3c3d3ccf6f0",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Primaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5390
                },
                "schoolPlanPayment": {
                    "id": 15428
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2021-01-11 08:04:22",
                "updatedAt": "2021-01-11 08:04:35",
                "version": 1,
                "uuid": "dd741350-6b0c-11eb-b7a9-1d40a081943c",
                "folio": "NTKBCR-5390",
                "change": 0,
                "quantity": 1580,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5390
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5396,
                        "createdAt": "2021-01-11 08:04:22",
                        "updatedAt": "2021-01-11 08:04:22",
                        "version": 1,
                        "uuid": "dd741640-6b0c-11eb-813d-65fd83deb8b7",
                        "codePaymentMethod": "03",
                        "quantity": 1580,
                        "date": "2021-01-11",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5692,
                        "createdAt": "2021-01-11 08:04:31",
                        "updatedAt": "2021-01-11 08:04:35",
                        "version": 1,
                        "folio": "ACAKMCR-5692",
                        "uuid": "8D206A76-540D-11EB-AC7E-A5CB2E294F98",
                        "businessName": "CRISTOBAL ANDRES TZEC XOOL",
                        "rfc": "XAXX010101000",
                        "total": 1580,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5390
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5391,
        "createdAt": "2021-01-11 08:14:44",
        "updatedAt": "2021-01-11 08:14:54",
        "version": 1,
        "uuid": "dd741aa0-6b0c-11eb-aaa2-9b8acd7258bf",
        "folio": "NTKBCR-5391",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 628
        },
        "chargesDetails": [
            {
                "id": 8461,
                "createdAt": "2021-01-11 08:14:45",
                "updatedAt": "2021-01-11 08:14:45",
                "version": 1,
                "uuid": "ddb61da0-6b0c-11eb-9e08-e334cdf83820",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "inscripci\u00f3n o Reinscripci\u00f3n Secundaria",
                "quantity": 1,
                "price": 525,
                "schoolCharge": {
                    "id": 5391
                },
                "schoolPlanPayment": {
                    "id": 15431
                }
            },
            {
                "id": 8462,
                "createdAt": "2021-01-11 08:14:45",
                "updatedAt": "2021-01-11 08:14:45",
                "version": 1,
                "uuid": "ddb621c0-6b0c-11eb-96e2-6ba1f71c2a1b",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "CUOTA SEQ",
                "quantity": 1,
                "price": 200,
                "schoolCharge": {
                    "id": 5391
                },
                "schoolPlanPayment": {
                    "id": 15442
                }
            },
            {
                "id": 8463,
                "createdAt": "2021-01-11 08:14:45",
                "updatedAt": "2021-01-11 08:14:45",
                "version": 1,
                "uuid": "ddb62530-6b0c-11eb-934f-5fe91ed41fec",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "ESCUELA PARA PADRES",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5391
                },
                "schoolPlanPayment": {
                    "id": 15443
                }
            },
            {
                "id": 8464,
                "createdAt": "2021-01-11 08:14:45",
                "updatedAt": "2021-01-11 08:14:45",
                "version": 1,
                "uuid": "ddb62810-6b0c-11eb-afa8-f79774b65992",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Secundaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5391
                },
                "schoolPlanPayment": {
                    "id": 15444
                }
            },
            {
                "id": 8465,
                "createdAt": "2021-01-11 08:14:45",
                "updatedAt": "2021-01-11 08:14:45",
                "version": 1,
                "uuid": "ddb62ad0-6b0c-11eb-a028-b53c569cfe83",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Secundaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5391
                },
                "schoolPlanPayment": {
                    "id": 15445
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2021-01-11 08:14:44",
                "updatedAt": "2021-01-11 08:14:54",
                "version": 1,
                "uuid": "ddb62ca0-6b0c-11eb-bcca-5d59e506fb73",
                "folio": "NTKBCR-5391",
                "change": 0,
                "quantity": 1725,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5391
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5397,
                        "createdAt": "2021-01-11 08:14:45",
                        "updatedAt": "2021-01-11 08:14:45",
                        "version": 1,
                        "uuid": "ddb62ff0-6b0c-11eb-97a9-5315be44d414",
                        "codePaymentMethod": "03",
                        "quantity": 1725,
                        "date": "2021-01-11",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5693,
                        "createdAt": "2021-01-11 08:14:52",
                        "updatedAt": "2021-01-11 08:14:54",
                        "version": 1,
                        "folio": "ACAKMCR-5693",
                        "uuid": "FE681552-540E-11EB-AEC1-CFFDA2C5679F",
                        "businessName": "RICARDO ARTEMIO TZEC XOOL",
                        "rfc": "XAXX010101000",
                        "total": 1725,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5391
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5392,
        "createdAt": "2021-01-11 08:19:52",
        "updatedAt": "2021-01-11 08:20:02",
        "version": 1,
        "uuid": "ddb63440-6b0c-11eb-95cf-1f2c23575b5c",
        "folio": "NTKBCR-5392",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 97
        },
        "chargesDetails": [
            {
                "id": 8466,
                "createdAt": "2021-01-11 08:19:52",
                "updatedAt": "2021-01-11 08:19:52",
                "version": 1,
                "uuid": "ddf85ff0-6b0c-11eb-bb94-69a7c0a85d20",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n primaria",
                "quantity": 1,
                "price": 910,
                "schoolCharge": {
                    "id": 5392
                },
                "schoolPlanPayment": {
                    "id": 15448
                }
            },
            {
                "id": 8467,
                "createdAt": "2021-01-11 08:19:52",
                "updatedAt": "2021-01-11 08:19:52",
                "version": 1,
                "uuid": "ddf863b0-6b0c-11eb-a851-6f2b2b226aa3",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Primaria",
                "quantity": 1,
                "price": 160,
                "schoolCharge": {
                    "id": 5392
                },
                "schoolPlanPayment": {
                    "id": 15459
                }
            },
            {
                "id": 8468,
                "createdAt": "2021-01-11 08:19:52",
                "updatedAt": "2021-01-11 08:19:52",
                "version": 1,
                "uuid": "ddf86680-6b0c-11eb-9e4c-8d4c4f1532ae",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5392
                },
                "schoolPlanPayment": {
                    "id": 15460
                }
            },
            {
                "id": 8469,
                "createdAt": "2021-01-11 08:19:52",
                "updatedAt": "2021-01-11 08:19:52",
                "version": 1,
                "uuid": "ddf869b0-6b0c-11eb-bb83-9df0b5ba4f36",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Primaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5392
                },
                "schoolPlanPayment": {
                    "id": 15461
                }
            },
            {
                "id": 8470,
                "createdAt": "2021-01-11 08:19:52",
                "updatedAt": "2021-01-11 08:19:52",
                "version": 1,
                "uuid": "ddf86c70-6b0c-11eb-a92a-6d0370061704",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Primaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5392
                },
                "schoolPlanPayment": {
                    "id": 15462
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2021-01-11 08:19:52",
                "updatedAt": "2021-01-11 08:20:02",
                "version": 1,
                "uuid": "ddf86e40-6b0c-11eb-860d-2d34a48763f2",
                "folio": "NTKBCR-5392",
                "change": 0,
                "quantity": 2070,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5392
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5398,
                        "createdAt": "2021-01-11 08:19:52",
                        "updatedAt": "2021-01-11 08:19:52",
                        "version": 1,
                        "uuid": "ddf870f0-6b0c-11eb-a862-5306d5d64ed0",
                        "codePaymentMethod": "03",
                        "quantity": 2070,
                        "date": "2021-01-11",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5694,
                        "createdAt": "2021-01-11 08:20:00",
                        "updatedAt": "2021-01-11 08:20:02",
                        "version": 1,
                        "folio": "ACAKMCR-5694",
                        "uuid": "B57F0606-540F-11EB-9E59-E1ED78C78944",
                        "businessName": "KYARA NICOLE CRISANTO ARIAS",
                        "rfc": "XAXX010101000",
                        "total": 2070,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5392
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5393,
        "createdAt": "2021-01-11 08:25:02",
        "updatedAt": "2021-01-11 08:25:21",
        "version": 1,
        "uuid": "ddf874c0-6b0c-11eb-9278-ed2db4853f72",
        "folio": "NTKBCR-5393",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 102
        },
        "chargesDetails": [
            {
                "id": 8471,
                "createdAt": "2021-01-11 08:25:02",
                "updatedAt": "2021-01-11 08:25:02",
                "version": 1,
                "uuid": "de3d0030-6b0c-11eb-80d5-835ab94d7a6c",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n primaria",
                "quantity": 1,
                "price": 210,
                "schoolCharge": {
                    "id": 5393
                },
                "schoolPlanPayment": {
                    "id": 15465
                }
            },
            {
                "id": 8472,
                "createdAt": "2021-01-11 08:25:02",
                "updatedAt": "2021-01-11 08:25:02",
                "version": 1,
                "uuid": "de3d0810-6b0c-11eb-bc9a-df3b1eb57914",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Primaria",
                "quantity": 1,
                "price": 160,
                "schoolCharge": {
                    "id": 5393
                },
                "schoolPlanPayment": {
                    "id": 15476
                }
            },
            {
                "id": 8473,
                "createdAt": "2021-01-11 08:25:02",
                "updatedAt": "2021-01-11 08:25:02",
                "version": 1,
                "uuid": "de3d0c80-6b0c-11eb-8e48-9b3f0263b042",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5393
                },
                "schoolPlanPayment": {
                    "id": 15477
                }
            },
            {
                "id": 8474,
                "createdAt": "2021-01-11 08:25:02",
                "updatedAt": "2021-01-11 08:25:02",
                "version": 1,
                "uuid": "de3d1020-6b0c-11eb-85b5-a3676c56173a",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Primaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5393
                },
                "schoolPlanPayment": {
                    "id": 15478
                }
            },
            {
                "id": 8475,
                "createdAt": "2021-01-11 08:25:02",
                "updatedAt": "2021-01-11 08:25:02",
                "version": 1,
                "uuid": "de3d1540-6b0c-11eb-84dc-130d3150a636",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Primaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5393
                },
                "schoolPlanPayment": {
                    "id": 15479
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2021-01-11 08:25:02",
                "updatedAt": "2021-01-11 08:25:21",
                "version": 1,
                "uuid": "de3d17a0-6b0c-11eb-8f46-2da0ee98c8cb",
                "folio": "NTKBCR-5393",
                "change": 0,
                "quantity": 1370,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5393
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5399,
                        "createdAt": "2021-01-11 08:25:02",
                        "updatedAt": "2021-01-11 08:25:02",
                        "version": 1,
                        "uuid": "de3d1ab0-6b0c-11eb-a876-8bfcbe103926",
                        "codePaymentMethod": "03",
                        "quantity": 1370,
                        "date": "2021-01-11",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5695,
                        "createdAt": "2021-01-11 08:25:14",
                        "updatedAt": "2021-01-11 08:25:21",
                        "version": 1,
                        "folio": "ACAKMCR-5695",
                        "uuid": "7381B0E0-5410-11EB-8920-1B01BB090FAB",
                        "businessName": "YATZIL JACKELINE MANCILLAS ROBLES",
                        "rfc": "XAXX010101000",
                        "total": 1370,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5393
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5394,
        "createdAt": "2021-01-11 08:29:04",
        "updatedAt": "2021-01-11 08:29:13",
        "version": 1,
        "uuid": "de3d1ee0-6b0c-11eb-950d-8304482d3661",
        "folio": "NTKBCR-5394",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 161
        },
        "chargesDetails": [
            {
                "id": 8476,
                "createdAt": "2021-01-11 08:29:04",
                "updatedAt": "2021-01-11 08:29:04",
                "version": 1,
                "uuid": "de809ce0-6b0c-11eb-a242-599fe2979c80",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "inscripci\u00f3n o Reinscripci\u00f3n Secundaria",
                "quantity": 1,
                "price": 490,
                "schoolCharge": {
                    "id": 5394
                },
                "schoolPlanPayment": {
                    "id": 15482
                }
            },
            {
                "id": 8477,
                "createdAt": "2021-01-11 08:29:04",
                "updatedAt": "2021-01-11 08:29:04",
                "version": 1,
                "uuid": "de80a130-6b0c-11eb-b31a-7fc4812b53ee",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "CUOTA SEQ",
                "quantity": 1,
                "price": 200,
                "schoolCharge": {
                    "id": 5394
                },
                "schoolPlanPayment": {
                    "id": 15493
                }
            },
            {
                "id": 8478,
                "createdAt": "2021-01-11 08:29:05",
                "updatedAt": "2021-01-11 08:29:05",
                "version": 1,
                "uuid": "de80a3c0-6b0c-11eb-a46c-83e685d93bb0",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "ESCUELA PARA PADRES",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5394
                },
                "schoolPlanPayment": {
                    "id": 15494
                }
            },
            {
                "id": 8479,
                "createdAt": "2021-01-11 08:29:05",
                "updatedAt": "2021-01-11 08:29:05",
                "version": 1,
                "uuid": "de80a620-6b0c-11eb-8921-db2f51fc4d3f",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Secundaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5394
                },
                "schoolPlanPayment": {
                    "id": 15495
                }
            },
            {
                "id": 8480,
                "createdAt": "2021-01-11 08:29:05",
                "updatedAt": "2021-01-11 08:29:05",
                "version": 1,
                "uuid": "de80a890-6b0c-11eb-9923-2d9c023bab7d",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Secundaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5394
                },
                "schoolPlanPayment": {
                    "id": 15496
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2021-01-11 08:29:04",
                "updatedAt": "2021-01-11 08:29:13",
                "version": 1,
                "uuid": "de80aa30-6b0c-11eb-b543-ad221a5f4049",
                "folio": "NTKBCR-5394",
                "change": 0,
                "quantity": 1690,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5394
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5400,
                        "createdAt": "2021-01-11 08:29:05",
                        "updatedAt": "2021-01-11 08:29:05",
                        "version": 1,
                        "uuid": "de80ace0-6b0c-11eb-a061-9fcfc37a5d74",
                        "codePaymentMethod": "01",
                        "quantity": 1690,
                        "date": "2021-01-11",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 1
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5696,
                        "createdAt": "2021-01-11 08:29:12",
                        "updatedAt": "2021-01-11 08:29:13",
                        "version": 1,
                        "folio": "ACAKMCR-5696",
                        "uuid": "FE7458B0-5410-11EB-A2E5-715EE69EE2A9",
                        "businessName": "DAYLAN RAMSSES HERNANDEZ BEDOLLA",
                        "rfc": "XAXX010101000",
                        "total": 1690,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5394
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5395,
        "createdAt": "2021-01-11 08:37:40",
        "updatedAt": "2021-01-11 08:37:51",
        "version": 1,
        "uuid": "de80b080-6b0c-11eb-bf52-557fc73cbe29",
        "folio": "NTKBCR-5395",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 548
        },
        "chargesDetails": [
            {
                "id": 8481,
                "createdAt": "2021-01-11 08:37:40",
                "updatedAt": "2021-01-11 08:37:40",
                "version": 1,
                "uuid": "dec214d0-6b0c-11eb-92c4-610370e55db6",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n preescolar",
                "quantity": 1,
                "price": 210,
                "schoolCharge": {
                    "id": 5395
                },
                "schoolPlanPayment": {
                    "id": 15499
                }
            },
            {
                "id": 8482,
                "createdAt": "2021-01-11 08:37:40",
                "updatedAt": "2021-01-11 08:37:40",
                "version": 1,
                "uuid": "dec21850-6b0c-11eb-a250-7133b63dc9f9",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Preescolar",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5395
                },
                "schoolPlanPayment": {
                    "id": 15506
                }
            },
            {
                "id": 8483,
                "createdAt": "2021-01-11 08:37:40",
                "updatedAt": "2021-01-11 08:37:40",
                "version": 1,
                "uuid": "dec21ac0-6b0c-11eb-8619-0f3589aefbc5",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5395
                },
                "schoolPlanPayment": {
                    "id": 15507
                }
            },
            {
                "id": 8484,
                "createdAt": "2021-01-11 08:37:40",
                "updatedAt": "2021-01-11 08:37:40",
                "version": 1,
                "uuid": "dec21d10-6b0c-11eb-8bc5-d9ce2a7fcd64",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Preescolar",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5395
                },
                "schoolPlanPayment": {
                    "id": 15508
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2021-01-11 08:37:40",
                "updatedAt": "2021-01-11 08:37:51",
                "version": 1,
                "uuid": "dec21ed0-6b0c-11eb-bfcc-9fb1b52541a2",
                "folio": "NTKBCR-5395",
                "change": 0,
                "quantity": 860,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5395
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5401,
                        "createdAt": "2021-01-11 08:37:40",
                        "updatedAt": "2021-01-11 08:37:40",
                        "version": 1,
                        "uuid": "dec22150-6b0c-11eb-b736-172d0517691c",
                        "codePaymentMethod": "01",
                        "quantity": 860,
                        "date": "2021-01-11",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 1
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5697,
                        "createdAt": "2021-01-11 08:37:50",
                        "updatedAt": "2021-01-11 08:37:51",
                        "version": 1,
                        "folio": "ACAKMCR-5697",
                        "uuid": "33505F6A-5412-11EB-9E53-B500377464B8",
                        "businessName": "LUNA ANAHI MATOS HERNANDEZ",
                        "rfc": "XAXX010101000",
                        "total": 860,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5395
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5396,
        "createdAt": "2021-01-11 09:00:46",
        "updatedAt": "2021-01-11 09:01:00",
        "version": 1,
        "uuid": "dec22520-6b0c-11eb-8a66-eb7208cc4e37",
        "folio": "NTKBCR-5396",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 191
        },
        "chargesDetails": [
            {
                "id": 8485,
                "createdAt": "2021-01-11 09:00:46",
                "updatedAt": "2021-01-11 09:00:46",
                "version": 1,
                "uuid": "e05aa190-6b0c-11eb-b4f0-bd24c3fb8fe1",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "inscripci\u00f3n o Reinscripci\u00f3n Secundaria",
                "quantity": 1,
                "price": 210,
                "schoolCharge": {
                    "id": 5396
                },
                "schoolPlanPayment": {
                    "id": 15518
                }
            },
            {
                "id": 8486,
                "createdAt": "2021-01-11 09:00:46",
                "updatedAt": "2021-01-11 09:00:46",
                "version": 1,
                "uuid": "e05aa680-6b0c-11eb-87d7-df375a8781ba",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "CUOTA SEQ",
                "quantity": 1,
                "price": 200,
                "schoolCharge": {
                    "id": 5396
                },
                "schoolPlanPayment": {
                    "id": 15526
                }
            },
            {
                "id": 8487,
                "createdAt": "2021-01-11 09:00:46",
                "updatedAt": "2021-01-11 09:00:46",
                "version": 1,
                "uuid": "e05aab70-6b0c-11eb-9de4-7b9be9f21c5e",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "ESCUELA PARA PADRES",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5396
                },
                "schoolPlanPayment": {
                    "id": 15527
                }
            },
            {
                "id": 8488,
                "createdAt": "2021-01-11 09:00:46",
                "updatedAt": "2021-01-11 09:00:46",
                "version": 1,
                "uuid": "e05aaf80-6b0c-11eb-8863-4551d02f64a3",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Secundaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5396
                },
                "schoolPlanPayment": {
                    "id": 15528
                }
            },
            {
                "id": 8489,
                "createdAt": "2021-01-11 09:00:46",
                "updatedAt": "2021-01-11 09:00:46",
                "version": 1,
                "uuid": "e05ab380-6b0c-11eb-bf17-9d8ee0c9a787",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Secundaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5396
                },
                "schoolPlanPayment": {
                    "id": 15529
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2021-01-11 09:00:46",
                "updatedAt": "2021-01-11 09:01:00",
                "version": 1,
                "uuid": "e05ab620-6b0c-11eb-85a3-c1e2c39c65bb",
                "folio": "NTKBCR-5396",
                "change": 0,
                "quantity": 1410,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5396
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5402,
                        "createdAt": "2021-01-11 09:00:46",
                        "updatedAt": "2021-01-11 09:00:46",
                        "version": 1,
                        "uuid": "e05aba00-6b0c-11eb-bec6-e531732d7e3d",
                        "codePaymentMethod": "03",
                        "quantity": 1410,
                        "date": "2021-01-11",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5698,
                        "createdAt": "2021-01-11 09:00:58",
                        "updatedAt": "2021-01-11 09:01:00",
                        "version": 1,
                        "folio": "ACAKMCR-5698",
                        "uuid": "6F130220-5415-11EB-891B-6FEEAFAD4FF4",
                        "businessName": "PAOLA CAROLINA AVALOS ROMERO",
                        "rfc": "AARP891114KI8",
                        "total": 1410,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5396
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5458,
        "createdAt": "2021-01-12 09:24:06",
        "updatedAt": "2021-01-12 09:24:15",
        "version": 1,
        "uuid": "e05ac030-6b0c-11eb-be4a-c1abf8ad48a4",
        "folio": "NTKBCR-5458",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 158
        },
        "chargesDetails": [
            {
                "id": 8588,
                "createdAt": "2021-01-12 09:24:06",
                "updatedAt": "2021-01-12 09:24:06",
                "version": 1,
                "uuid": "e09c7420-6b0c-11eb-a3b5-a358137ef1ee",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "inscripci\u00f3n o Reinscripci\u00f3n Secundaria",
                "quantity": 1,
                "price": 400,
                "schoolCharge": {
                    "id": 5458
                },
                "schoolPlanPayment": {
                    "id": 15616
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2021-01-12 09:24:06",
                "updatedAt": "2021-01-12 09:24:15",
                "version": 1,
                "uuid": "e09c78c0-6b0c-11eb-9c27-df6b3af3453d",
                "folio": "NTKBCR-5458",
                "change": 0,
                "quantity": 400,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5458
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5464,
                        "createdAt": "2021-01-12 09:24:06",
                        "updatedAt": "2021-01-12 09:24:06",
                        "version": 1,
                        "uuid": "e09c7da0-6b0c-11eb-a255-c5246327f33d",
                        "codePaymentMethod": "03",
                        "quantity": 400,
                        "date": "2021-01-12",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5760,
                        "createdAt": "2021-01-12 09:24:13",
                        "updatedAt": "2021-01-12 09:24:15",
                        "version": 1,
                        "folio": "ACAKMCR-5760",
                        "uuid": "D907C8E2-54E1-11EB-A359-4B65423DA21D",
                        "businessName": "EVELYN AHUEJOTE JIMENEZ",
                        "rfc": "XAXX010101000",
                        "total": 400,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5458
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5459,
        "createdAt": "2021-01-12 09:28:09",
        "updatedAt": "2021-01-12 09:28:22",
        "version": 1,
        "uuid": "e09c8500-6b0c-11eb-a57b-d590f23277da",
        "folio": "NTKBCR-5459",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 203
        },
        "chargesDetails": [
            {
                "id": 8589,
                "createdAt": "2021-01-12 09:28:09",
                "updatedAt": "2021-01-12 09:28:09",
                "version": 1,
                "uuid": "e0ddd120-6b0c-11eb-8417-7fee5a0dd4bc",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "inscripci\u00f3n o Reinscripci\u00f3n Secundaria",
                "quantity": 1,
                "price": 760,
                "schoolCharge": {
                    "id": 5459
                },
                "schoolPlanPayment": {
                    "id": 15633
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2021-01-12 09:28:09",
                "updatedAt": "2021-01-12 09:28:22",
                "version": 1,
                "uuid": "e0ddd4f0-6b0c-11eb-97d0-09dd4b2d9238",
                "folio": "NTKBCR-5459",
                "change": 0,
                "quantity": 760,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5459
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5465,
                        "createdAt": "2021-01-12 09:28:09",
                        "updatedAt": "2021-01-12 09:28:09",
                        "version": 1,
                        "uuid": "e0ddd8f0-6b0c-11eb-9fe1-355158b0ebc1",
                        "codePaymentMethod": "03",
                        "quantity": 760,
                        "date": "2021-01-12",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5761,
                        "createdAt": "2021-01-12 09:28:20",
                        "updatedAt": "2021-01-12 09:28:22",
                        "version": 1,
                        "folio": "ACAKMCR-5761",
                        "uuid": "6BCAE20E-54E2-11EB-9660-251E9FCD62E6",
                        "businessName": "STACY AHUEJOTE JIMENEZ",
                        "rfc": "XAXX010101000",
                        "total": 760,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5459
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5460,
        "createdAt": "2021-01-12 09:38:20",
        "updatedAt": "2021-01-12 09:38:33",
        "version": 1,
        "uuid": "e0dddee0-6b0c-11eb-bfd2-3b79a9b0d9c9",
        "folio": "NTKBCR-5460",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 114
        },
        "chargesDetails": [
            {
                "id": 8590,
                "createdAt": "2021-01-12 09:38:20",
                "updatedAt": "2021-01-12 09:38:20",
                "version": 1,
                "uuid": "e11ec3e0-6b0c-11eb-91d8-b1b097092a6b",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n primaria",
                "quantity": 1,
                "price": 612,
                "schoolCharge": {
                    "id": 5460
                },
                "schoolPlanPayment": {
                    "id": 15651
                }
            },
            {
                "id": 8591,
                "createdAt": "2021-01-12 09:38:20",
                "updatedAt": "2021-01-12 09:38:20",
                "version": 1,
                "uuid": "e11ec7f0-6b0c-11eb-a010-6d0b14096400",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Primaria",
                "quantity": 1,
                "price": 160,
                "schoolCharge": {
                    "id": 5460
                },
                "schoolPlanPayment": {
                    "id": 15662
                }
            },
            {
                "id": 8592,
                "createdAt": "2021-01-12 09:38:20",
                "updatedAt": "2021-01-12 09:38:20",
                "version": 1,
                "uuid": "e11ecae0-6b0c-11eb-9d91-ddfc88c95ede",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5460
                },
                "schoolPlanPayment": {
                    "id": 15663
                }
            },
            {
                "id": 8593,
                "createdAt": "2021-01-12 09:38:20",
                "updatedAt": "2021-01-12 09:38:20",
                "version": 1,
                "uuid": "e11ecd80-6b0c-11eb-b936-1d784a23835e",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Primaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5460
                },
                "schoolPlanPayment": {
                    "id": 15664
                }
            },
            {
                "id": 8594,
                "createdAt": "2021-01-12 09:38:20",
                "updatedAt": "2021-01-12 09:38:20",
                "version": 1,
                "uuid": "e11ed060-6b0c-11eb-a9e4-b9943e8cc791",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Primaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5460
                },
                "schoolPlanPayment": {
                    "id": 15665
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2021-01-12 09:38:20",
                "updatedAt": "2021-01-12 09:38:33",
                "version": 1,
                "uuid": "e11ed240-6b0c-11eb-8d4c-fbcd457fea69",
                "folio": "NTKBCR-5460",
                "change": 0,
                "quantity": 1772,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5460
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5466,
                        "createdAt": "2021-01-12 09:38:20",
                        "updatedAt": "2021-01-12 09:38:20",
                        "version": 1,
                        "uuid": "e11ed4e0-6b0c-11eb-8217-ddb1829fa649",
                        "codePaymentMethod": "01",
                        "quantity": 1772,
                        "date": "2021-01-12",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 1
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5762,
                        "createdAt": "2021-01-12 09:38:30",
                        "updatedAt": "2021-01-12 09:38:33",
                        "version": 1,
                        "folio": "ACAKMCR-5762",
                        "uuid": "D7F7AB50-54E3-11EB-9429-55D743FB9948",
                        "businessName": "JADE ESMERALDA MENDOZA DIAZ",
                        "rfc": "XAXX010101000",
                        "total": 1772,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5460
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5461,
        "createdAt": "2021-01-12 09:54:35",
        "updatedAt": "2021-01-12 09:54:46",
        "version": 1,
        "uuid": "e11ed880-6b0c-11eb-bcd8-f7ae6c7e4e3c",
        "folio": "NTKBCR-5461",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 635
        },
        "chargesDetails": [
            {
                "id": 8595,
                "createdAt": "2021-01-12 09:54:35",
                "updatedAt": "2021-01-12 09:54:35",
                "version": 1,
                "uuid": "e1611e40-6b0c-11eb-b1c3-2bfb498ad1e5",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n primaria",
                "quantity": 1,
                "price": 980,
                "schoolCharge": {
                    "id": 5461
                },
                "schoolPlanPayment": {
                    "id": 15668
                }
            },
            {
                "id": 8596,
                "createdAt": "2021-01-12 09:54:35",
                "updatedAt": "2021-01-12 09:54:35",
                "version": 1,
                "uuid": "e1612330-6b0c-11eb-a4b3-a9e045199984",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Primaria",
                "quantity": 1,
                "price": 160,
                "schoolCharge": {
                    "id": 5461
                },
                "schoolPlanPayment": {
                    "id": 15679
                }
            },
            {
                "id": 8597,
                "createdAt": "2021-01-12 09:54:36",
                "updatedAt": "2021-01-12 09:54:36",
                "version": 1,
                "uuid": "e1612980-6b0c-11eb-9b54-6f41a563eb54",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5461
                },
                "schoolPlanPayment": {
                    "id": 15680
                }
            },
            {
                "id": 8598,
                "createdAt": "2021-01-12 09:54:36",
                "updatedAt": "2021-01-12 09:54:36",
                "version": 1,
                "uuid": "e1612fa0-6b0c-11eb-9f3b-4bdff3f27ccf",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Primaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5461
                },
                "schoolPlanPayment": {
                    "id": 15681
                }
            },
            {
                "id": 8599,
                "createdAt": "2021-01-12 09:54:36",
                "updatedAt": "2021-01-12 09:54:36",
                "version": 1,
                "uuid": "e1613520-6b0c-11eb-a7b9-29886a6990b8",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Primaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5461
                },
                "schoolPlanPayment": {
                    "id": 15682
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2021-01-12 09:54:35",
                "updatedAt": "2021-01-12 09:54:46",
                "version": 1,
                "uuid": "e1613880-6b0c-11eb-916e-b96ac460f1ad",
                "folio": "NTKBCR-5461",
                "change": 0,
                "quantity": 2140,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5461
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5467,
                        "createdAt": "2021-01-12 09:54:36",
                        "updatedAt": "2021-01-12 09:54:36",
                        "version": 1,
                        "uuid": "e1613d40-6b0c-11eb-91d3-d54773b652d5",
                        "codePaymentMethod": "03",
                        "quantity": 2140,
                        "date": "2021-01-12",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5763,
                        "createdAt": "2021-01-12 09:54:44",
                        "updatedAt": "2021-01-12 09:54:46",
                        "version": 1,
                        "folio": "ACAKMCR-5763",
                        "uuid": "1C62F810-54E6-11EB-B715-D18E8288F791",
                        "businessName": "NICOLAS MEDINA DELGADO",
                        "rfc": "XAXX010101000",
                        "total": 2140,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5461
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5462,
        "createdAt": "2021-01-12 10:05:01",
        "updatedAt": "2021-01-12 10:05:14",
        "version": 1,
        "uuid": "e1614500-6b0c-11eb-9983-576a2847e8b6",
        "folio": "NTKBCR-5462",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 141
        },
        "chargesDetails": [
            {
                "id": 8600,
                "createdAt": "2021-01-12 10:05:01",
                "updatedAt": "2021-01-12 10:05:01",
                "version": 1,
                "uuid": "e1a588d0-6b0c-11eb-bb9a-75dd64471347",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n primaria",
                "quantity": 1,
                "price": 612,
                "schoolCharge": {
                    "id": 5462
                },
                "schoolPlanPayment": {
                    "id": 15685
                }
            },
            {
                "id": 8601,
                "createdAt": "2021-01-12 10:05:01",
                "updatedAt": "2021-01-12 10:05:01",
                "version": 1,
                "uuid": "e1a58fc0-6b0c-11eb-800e-9fc679c976e6",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Primaria",
                "quantity": 1,
                "price": 160,
                "schoolCharge": {
                    "id": 5462
                },
                "schoolPlanPayment": {
                    "id": 15696
                }
            },
            {
                "id": 8602,
                "createdAt": "2021-01-12 10:05:01",
                "updatedAt": "2021-01-12 10:05:01",
                "version": 1,
                "uuid": "e1a595e0-6b0c-11eb-965b-f7c8c2fab1f9",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5462
                },
                "schoolPlanPayment": {
                    "id": 15697
                }
            },
            {
                "id": 8603,
                "createdAt": "2021-01-12 10:05:01",
                "updatedAt": "2021-01-12 10:05:01",
                "version": 1,
                "uuid": "e1a59bc0-6b0c-11eb-9537-eb31f092fca1",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Primaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5462
                },
                "schoolPlanPayment": {
                    "id": 15698
                }
            },
            {
                "id": 8604,
                "createdAt": "2021-01-12 10:05:01",
                "updatedAt": "2021-01-12 10:05:01",
                "version": 1,
                "uuid": "e1a59fa0-6b0c-11eb-958f-29f6c13b97d9",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Primaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5462
                },
                "schoolPlanPayment": {
                    "id": 15699
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2021-01-12 10:05:01",
                "updatedAt": "2021-01-12 10:05:14",
                "version": 1,
                "uuid": "e1a5a1c0-6b0c-11eb-9a5a-d32e71aa9357",
                "folio": "NTKBCR-5462",
                "change": 0,
                "quantity": 1772,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5462
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5468,
                        "createdAt": "2021-01-12 10:05:01",
                        "updatedAt": "2021-01-12 10:05:01",
                        "version": 1,
                        "uuid": "e1a5a4c0-6b0c-11eb-9b89-5db2c9cb7e22",
                        "codePaymentMethod": "01",
                        "quantity": 1772,
                        "date": "2021-01-12",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 1
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5764,
                        "createdAt": "2021-01-12 10:05:08",
                        "updatedAt": "2021-01-12 10:05:14",
                        "version": 1,
                        "folio": "ACAKMCR-5764",
                        "uuid": "9131BFEA-54E7-11EB-8AB3-79644A721BA8",
                        "businessName": "GABRIEL FRANCISCO REYES CAUICH",
                        "rfc": "XAXX010101000",
                        "total": 1772,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5462
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5463,
        "createdAt": "2021-01-12 10:55:58",
        "updatedAt": "2021-01-12 10:56:08",
        "version": 1,
        "uuid": "e1a5a8e0-6b0c-11eb-97e6-c32cc038d97c",
        "folio": "NTKBCR-5463",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 568
        },
        "chargesDetails": [
            {
                "id": 8605,
                "createdAt": "2021-01-12 10:55:58",
                "updatedAt": "2021-01-12 10:55:58",
                "version": 1,
                "uuid": "e1e97880-6b0c-11eb-b28d-35f80576fa28",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n primaria",
                "quantity": 1,
                "price": 1225,
                "schoolCharge": {
                    "id": 5463
                },
                "schoolPlanPayment": {
                    "id": 15702
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2021-01-12 10:55:58",
                "updatedAt": "2021-01-12 10:56:08",
                "version": 1,
                "uuid": "e1e97bb0-6b0c-11eb-a8ae-1d9b0142a9ce",
                "folio": "NTKBCR-5463",
                "change": 0,
                "quantity": 1225,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5463
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5469,
                        "createdAt": "2021-01-12 10:55:58",
                        "updatedAt": "2021-01-12 10:55:58",
                        "version": 1,
                        "uuid": "e1e97ec0-6b0c-11eb-91b5-9981d725e576",
                        "codePaymentMethod": "03",
                        "quantity": 1225,
                        "date": "2021-01-12",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5765,
                        "createdAt": "2021-01-12 10:56:06",
                        "updatedAt": "2021-01-12 10:56:08",
                        "version": 1,
                        "folio": "ACAKMCR-5765",
                        "uuid": "AEE4B31A-54EE-11EB-B35D-1F978BF5B83A",
                        "businessName": "PAUL CABRERA OSORIO",
                        "rfc": "CAOP7311268L1",
                        "total": 1225,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5463
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5464,
        "createdAt": "2021-01-12 11:03:30",
        "updatedAt": "2021-01-12 11:03:39",
        "version": 1,
        "uuid": "e1e98300-6b0c-11eb-8603-e7a3a1b7e315",
        "folio": "NTKBCR-5464",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 569
        },
        "chargesDetails": [
            {
                "id": 8606,
                "createdAt": "2021-01-12 11:03:30",
                "updatedAt": "2021-01-12 11:03:30",
                "version": 1,
                "uuid": "e22b11c0-6b0c-11eb-be6c-7dac708933f6",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n preescolar",
                "quantity": 1,
                "price": 525,
                "schoolCharge": {
                    "id": 5464
                },
                "schoolPlanPayment": {
                    "id": 15719
                }
            },
            {
                "id": 8607,
                "createdAt": "2021-01-12 11:03:30",
                "updatedAt": "2021-01-12 11:03:30",
                "version": 1,
                "uuid": "e22b1600-6b0c-11eb-a8ac-dd77d0c7f45f",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Preescolar",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5464
                },
                "schoolPlanPayment": {
                    "id": 15730
                }
            },
            {
                "id": 8608,
                "createdAt": "2021-01-12 11:03:30",
                "updatedAt": "2021-01-12 11:03:30",
                "version": 1,
                "uuid": "e22b1910-6b0c-11eb-810d-fbb11adcd369",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5464
                },
                "schoolPlanPayment": {
                    "id": 15731
                }
            },
            {
                "id": 8609,
                "createdAt": "2021-01-12 11:03:30",
                "updatedAt": "2021-01-12 11:03:30",
                "version": 1,
                "uuid": "e22b1bf0-6b0c-11eb-962f-5baeb197dc05",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Preescolar",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5464
                },
                "schoolPlanPayment": {
                    "id": 15732
                }
            },
            {
                "id": 8610,
                "createdAt": "2021-01-12 11:03:30",
                "updatedAt": "2021-01-12 11:03:30",
                "version": 1,
                "uuid": "e22b1ec0-6b0c-11eb-b624-f7bfc5c067a9",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Preescolar",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5464
                },
                "schoolPlanPayment": {
                    "id": 15733
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2021-01-12 11:03:30",
                "updatedAt": "2021-01-12 11:03:39",
                "version": 1,
                "uuid": "e22b20a0-6b0c-11eb-b3e0-1ff48ce94d25",
                "folio": "NTKBCR-5464",
                "change": 0,
                "quantity": 1675,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5464
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5470,
                        "createdAt": "2021-01-12 11:03:30",
                        "updatedAt": "2021-01-12 11:03:30",
                        "version": 1,
                        "uuid": "e22b2380-6b0c-11eb-bed9-13583755f166",
                        "codePaymentMethod": "01",
                        "quantity": 1675,
                        "date": "2021-01-12",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 1
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5766,
                        "createdAt": "2021-01-12 11:03:37",
                        "updatedAt": "2021-01-12 11:03:39",
                        "version": 1,
                        "folio": "ACAKMCR-5766",
                        "uuid": "BBB1A70A-54EF-11EB-9288-674F108F7332",
                        "businessName": "JULIETTE ALESSANDRA RUIZ MEZ",
                        "rfc": "XAXX010101000",
                        "total": 1675,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5464
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5465,
        "createdAt": "2021-01-12 11:29:44",
        "updatedAt": "2021-01-12 11:31:26",
        "version": 1,
        "uuid": "e22b27a0-6b0c-11eb-ba31-839a1d7341ea",
        "folio": "NTKBCR-5465",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 668
        },
        "chargesDetails": [
            {
                "id": 8611,
                "createdAt": "2021-01-12 11:29:44",
                "updatedAt": "2021-01-12 11:29:44",
                "version": 1,
                "uuid": "e26c1b00-6b0c-11eb-b75f-9d74e1a0cf86",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n preescolar",
                "quantity": 1,
                "price": 600,
                "schoolCharge": {
                    "id": 5465
                },
                "schoolPlanPayment": {
                    "id": 15598
                }
            },
            {
                "id": 8612,
                "createdAt": "2021-01-12 11:29:44",
                "updatedAt": "2021-01-12 11:29:44",
                "version": 1,
                "uuid": "e26c1eb0-6b0c-11eb-b568-ad2ee844816a",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Preescolar",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5465
                },
                "schoolPlanPayment": {
                    "id": 15609
                }
            },
            {
                "id": 8613,
                "createdAt": "2021-01-12 11:29:44",
                "updatedAt": "2021-01-12 11:29:44",
                "version": 1,
                "uuid": "e26c2170-6b0c-11eb-849b-b5ce1479a232",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5465
                },
                "schoolPlanPayment": {
                    "id": 15610
                }
            },
            {
                "id": 8614,
                "createdAt": "2021-01-12 11:29:44",
                "updatedAt": "2021-01-12 11:29:44",
                "version": 1,
                "uuid": "e26c24c0-6b0c-11eb-86fc-6f9bde40b6fd",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Preescolar",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5465
                },
                "schoolPlanPayment": {
                    "id": 15611
                }
            },
            {
                "id": 8615,
                "createdAt": "2021-01-12 11:29:44",
                "updatedAt": "2021-01-12 11:29:44",
                "version": 1,
                "uuid": "e26c2780-6b0c-11eb-815f-5ffb15c21365",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Preescolar",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5465
                },
                "schoolPlanPayment": {
                    "id": 15612
                }
            },
            {
                "id": 8616,
                "createdAt": "2021-01-12 11:29:44",
                "updatedAt": "2021-01-12 11:29:44",
                "version": 1,
                "uuid": "e26c2980-6b0c-11eb-86fa-0fcaef2a4144",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n preescolar",
                "quantity": 1,
                "price": 200,
                "schoolCharge": {
                    "id": 5465
                },
                "schoolPlanPayment": {
                    "id": 15598
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2021-01-12 11:29:44",
                "updatedAt": "2021-01-12 11:31:26",
                "version": 1,
                "uuid": "e26c2b40-6b0c-11eb-9c91-ab1b0d559c5d",
                "folio": "NTKBCR-5465",
                "change": 0,
                "quantity": 1950,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5465
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5471,
                        "createdAt": "2021-01-12 11:29:44",
                        "updatedAt": "2021-01-12 11:29:44",
                        "version": 1,
                        "uuid": "e26c2e30-6b0c-11eb-810d-9be331aaac23",
                        "codePaymentMethod": "03",
                        "quantity": 1950,
                        "date": "2021-01-12",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5767,
                        "createdAt": "2021-01-12 11:31:24",
                        "updatedAt": "2021-01-12 11:31:26",
                        "version": 1,
                        "folio": "ACAKMCR-5767",
                        "uuid": "9D4516CC-54F3-11EB-978A-25995203074E",
                        "businessName": "MATIAS ISIDRO CANTO UCAN",
                        "rfc": "XAXX010101000",
                        "total": 1950,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5465
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5488,
        "createdAt": "2021-01-13 07:55:09",
        "updatedAt": "2021-01-13 07:55:18",
        "version": 1,
        "uuid": "e26c3220-6b0c-11eb-9ab7-d5388b4c126b",
        "folio": "NTKBCR-5488",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 138
        },
        "chargesDetails": [
            {
                "id": 8641,
                "createdAt": "2021-01-13 07:55:09",
                "updatedAt": "2021-01-13 07:55:09",
                "version": 1,
                "uuid": "e2b03510-6b0c-11eb-a1f0-af5bbca5b5d3",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n primaria",
                "quantity": 1,
                "price": 700,
                "schoolCharge": {
                    "id": 5488
                },
                "schoolPlanPayment": {
                    "id": 15754
                }
            },
            {
                "id": 8642,
                "createdAt": "2021-01-13 07:55:09",
                "updatedAt": "2021-01-13 07:55:09",
                "version": 1,
                "uuid": "e2b038a0-6b0c-11eb-8c07-ad6698a6cc7e",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Primaria",
                "quantity": 1,
                "price": 160,
                "schoolCharge": {
                    "id": 5488
                },
                "schoolPlanPayment": {
                    "id": 15765
                }
            },
            {
                "id": 8643,
                "createdAt": "2021-01-13 07:55:09",
                "updatedAt": "2021-01-13 07:55:09",
                "version": 1,
                "uuid": "e2b03bb0-6b0c-11eb-b0b1-f557a2c84751",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5488
                },
                "schoolPlanPayment": {
                    "id": 15766
                }
            },
            {
                "id": 8644,
                "createdAt": "2021-01-13 07:55:09",
                "updatedAt": "2021-01-13 07:55:09",
                "version": 1,
                "uuid": "e2b03e60-6b0c-11eb-b796-5914983b2ba7",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Primaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5488
                },
                "schoolPlanPayment": {
                    "id": 15767
                }
            },
            {
                "id": 8645,
                "createdAt": "2021-01-13 07:55:09",
                "updatedAt": "2021-01-13 07:55:09",
                "version": 1,
                "uuid": "e2b040f0-6b0c-11eb-9121-c3c50dfa4c8d",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Primaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5488
                },
                "schoolPlanPayment": {
                    "id": 15768
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2021-01-13 07:55:09",
                "updatedAt": "2021-01-13 07:55:18",
                "version": 1,
                "uuid": "e2b042b0-6b0c-11eb-99ae-bda9f477cf20",
                "folio": "NTKBCR-5488",
                "change": 0,
                "quantity": 1860,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5488
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5494,
                        "createdAt": "2021-01-13 07:55:09",
                        "updatedAt": "2021-01-13 07:55:09",
                        "version": 1,
                        "uuid": "e2b04550-6b0c-11eb-868d-1f87793bb332",
                        "codePaymentMethod": "03",
                        "quantity": 1860,
                        "date": "2021-01-13",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5790,
                        "createdAt": "2021-01-13 07:55:16",
                        "updatedAt": "2021-01-13 07:55:18",
                        "version": 1,
                        "folio": "ACAKMCR-5790",
                        "uuid": "9651AE7E-559E-11EB-8336-7DA54F2E0BE8",
                        "businessName": "JOHAN DAVID MUKUL CANUL",
                        "rfc": "XAXX010101000",
                        "total": 1860,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5488
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5490,
        "createdAt": "2021-01-13 08:32:58",
        "updatedAt": "2021-01-13 08:33:26",
        "version": 1,
        "uuid": "e2b04c10-6b0c-11eb-a9f4-1397c4ceee53",
        "folio": "NTKBCR-5490",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 626
        },
        "chargesDetails": [
            {
                "id": 8647,
                "createdAt": "2021-01-13 08:32:58",
                "updatedAt": "2021-01-13 08:32:58",
                "version": 1,
                "uuid": "e2f1b6b0-6b0c-11eb-a94c-cbe81c19332c",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n primaria",
                "quantity": 1,
                "price": 200,
                "schoolCharge": {
                    "id": 5490
                },
                "schoolPlanPayment": {
                    "id": 15788
                }
            },
            {
                "id": 8648,
                "createdAt": "2021-01-13 08:32:58",
                "updatedAt": "2021-01-13 08:32:58",
                "version": 1,
                "uuid": "e2f1be90-6b0c-11eb-b58a-03ab57efa44b",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5490
                },
                "schoolPlanPayment": {
                    "id": 15800
                }
            },
            {
                "id": 8649,
                "createdAt": "2021-01-13 08:32:58",
                "updatedAt": "2021-01-13 08:32:58",
                "version": 1,
                "uuid": "e2f1c4c0-6b0c-11eb-aea9-8b105abdf262",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Primaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5490
                },
                "schoolPlanPayment": {
                    "id": 15801
                }
            },
            {
                "id": 8650,
                "createdAt": "2021-01-13 08:32:58",
                "updatedAt": "2021-01-13 08:32:58",
                "version": 1,
                "uuid": "e2f1caa0-6b0c-11eb-89bd-111df5e4c800",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Primaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5490
                },
                "schoolPlanPayment": {
                    "id": 15802
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2021-01-13 08:32:58",
                "updatedAt": "2021-01-13 08:33:26",
                "version": 1,
                "uuid": "e2f1ce90-6b0c-11eb-8b52-c5479e9a7045",
                "folio": "NTKBCR-5490",
                "change": 0,
                "quantity": 1200,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5490
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5496,
                        "createdAt": "2021-01-13 08:32:58",
                        "updatedAt": "2021-01-13 08:32:58",
                        "version": 1,
                        "uuid": "e2f1d410-6b0c-11eb-a94d-d3458be21051",
                        "codePaymentMethod": "01",
                        "quantity": 1200,
                        "date": "2021-01-13",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 1
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5793,
                        "createdAt": "2021-01-13 08:33:24",
                        "updatedAt": "2021-01-13 08:33:26",
                        "version": 1,
                        "folio": "ACAKMCR-5793",
                        "uuid": "E9C35E2C-55A3-11EB-9735-2558BA1D2846",
                        "businessName": "FERNANDO ENRIQUE POOL HOIL",
                        "rfc": "POHF9407017J6",
                        "total": 1200,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5490
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5500,
        "createdAt": "2021-01-13 10:24:05",
        "updatedAt": "2021-01-13 10:24:14",
        "version": 1,
        "uuid": "e2f1dc60-6b0c-11eb-bc7f-219065a8cc18",
        "folio": "NTKBCR-5500",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 125
        },
        "chargesDetails": [
            {
                "id": 8660,
                "createdAt": "2021-01-13 10:24:05",
                "updatedAt": "2021-01-13 10:24:05",
                "version": 1,
                "uuid": "e333b640-6b0c-11eb-844c-49e1d9647a0b",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n primaria",
                "quantity": 1,
                "price": 700,
                "schoolCharge": {
                    "id": 5500
                },
                "schoolPlanPayment": {
                    "id": 15771
                }
            },
            {
                "id": 8661,
                "createdAt": "2021-01-13 10:24:05",
                "updatedAt": "2021-01-13 10:24:05",
                "version": 1,
                "uuid": "e333b9d0-6b0c-11eb-8edd-45ec042dd438",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Primaria",
                "quantity": 1,
                "price": 160,
                "schoolCharge": {
                    "id": 5500
                },
                "schoolPlanPayment": {
                    "id": 15782
                }
            },
            {
                "id": 8662,
                "createdAt": "2021-01-13 10:24:05",
                "updatedAt": "2021-01-13 10:24:05",
                "version": 1,
                "uuid": "e333bc60-6b0c-11eb-a0db-21f123096597",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5500
                },
                "schoolPlanPayment": {
                    "id": 15783
                }
            },
            {
                "id": 8663,
                "createdAt": "2021-01-13 10:24:05",
                "updatedAt": "2021-01-13 10:24:05",
                "version": 1,
                "uuid": "e333bee0-6b0c-11eb-a17d-0bd03562fdc1",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Primaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5500
                },
                "schoolPlanPayment": {
                    "id": 15784
                }
            },
            {
                "id": 8664,
                "createdAt": "2021-01-13 10:24:05",
                "updatedAt": "2021-01-13 10:24:05",
                "version": 1,
                "uuid": "e333c160-6b0c-11eb-9857-05d34f794e79",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Primaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5500
                },
                "schoolPlanPayment": {
                    "id": 15785
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2021-01-13 10:24:05",
                "updatedAt": "2021-01-13 10:24:14",
                "version": 1,
                "uuid": "e333c330-6b0c-11eb-9097-0bd8fa1c6c9b",
                "folio": "NTKBCR-5500",
                "change": 0,
                "quantity": 1860,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5500
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5506,
                        "createdAt": "2021-01-13 10:24:05",
                        "updatedAt": "2021-01-13 10:24:05",
                        "version": 1,
                        "uuid": "e333c5c0-6b0c-11eb-982c-778fdb2c1cc8",
                        "codePaymentMethod": "01",
                        "quantity": 1860,
                        "date": "2021-01-13",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 1
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5803,
                        "createdAt": "2021-01-13 10:24:12",
                        "updatedAt": "2021-01-13 10:24:14",
                        "version": 1,
                        "folio": "ACAKMCR-5803",
                        "uuid": "64654960-55B3-11EB-9753-E14C99659C5B",
                        "businessName": "ALEXIS MATEO CHI TUZ",
                        "rfc": "XAXX010101000",
                        "total": 1860,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5500
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5501,
        "createdAt": "2021-01-13 11:21:45",
        "updatedAt": "2021-01-13 11:22:04",
        "version": 1,
        "uuid": "e333c980-6b0c-11eb-b49b-e97214861f01",
        "folio": "NTKBCR-5501",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 117
        },
        "chargesDetails": [
            {
                "id": 8665,
                "createdAt": "2021-01-13 11:21:45",
                "updatedAt": "2021-01-13 11:21:45",
                "version": 1,
                "uuid": "e3748730-6b0c-11eb-8bcc-6f349458a0a2",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n primaria",
                "quantity": 1,
                "price": 700,
                "schoolCharge": {
                    "id": 5501
                },
                "schoolPlanPayment": {
                    "id": 15809
                }
            },
            {
                "id": 8666,
                "createdAt": "2021-01-13 11:21:46",
                "updatedAt": "2021-01-13 11:21:46",
                "version": 1,
                "uuid": "e37491c0-6b0c-11eb-9cf9-2dde75918fba",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Primaria",
                "quantity": 1,
                "price": 160,
                "schoolCharge": {
                    "id": 5501
                },
                "schoolPlanPayment": {
                    "id": 15820
                }
            },
            {
                "id": 8667,
                "createdAt": "2021-01-13 11:21:46",
                "updatedAt": "2021-01-13 11:21:46",
                "version": 1,
                "uuid": "e3749770-6b0c-11eb-8679-0d425f940ffd",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5501
                },
                "schoolPlanPayment": {
                    "id": 15821
                }
            },
            {
                "id": 8668,
                "createdAt": "2021-01-13 11:21:46",
                "updatedAt": "2021-01-13 11:21:46",
                "version": 1,
                "uuid": "e3749c90-6b0c-11eb-82fc-835de4b5d326",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Primaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5501
                },
                "schoolPlanPayment": {
                    "id": 15822
                }
            },
            {
                "id": 8669,
                "createdAt": "2021-01-13 11:21:46",
                "updatedAt": "2021-01-13 11:21:46",
                "version": 1,
                "uuid": "e374a110-6b0c-11eb-9d2f-9159cdfabc95",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Primaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5501
                },
                "schoolPlanPayment": {
                    "id": 15823
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2021-01-13 11:21:45",
                "updatedAt": "2021-01-13 11:22:04",
                "version": 1,
                "uuid": "e374a340-6b0c-11eb-ace2-3dd7da3f944e",
                "folio": "NTKBCR-5501",
                "change": 0,
                "quantity": 1860,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5501
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5507,
                        "createdAt": "2021-01-13 11:21:46",
                        "updatedAt": "2021-01-13 11:21:46",
                        "version": 1,
                        "uuid": "e374a640-6b0c-11eb-8c7c-89487545db02",
                        "codePaymentMethod": "03",
                        "quantity": 1860,
                        "date": "2021-01-13",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5804,
                        "createdAt": "2021-01-13 11:22:01",
                        "updatedAt": "2021-01-13 11:22:04",
                        "version": 1,
                        "folio": "ACAKMCR-5804",
                        "uuid": "786DBC00-55BB-11EB-A5D3-6B7900CB2A90",
                        "businessName": "IAN MORA MOSQUERA",
                        "rfc": "XAXX010101000",
                        "total": 1860,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5501
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5502,
        "createdAt": "2021-01-13 11:24:44",
        "updatedAt": "2021-01-13 11:24:52",
        "version": 1,
        "uuid": "e374aa50-6b0c-11eb-9841-cfebfb7c4ba2",
        "folio": "NTKBCR-5502",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 432
        },
        "chargesDetails": [
            {
                "id": 8670,
                "createdAt": "2021-01-13 11:24:44",
                "updatedAt": "2021-01-13 11:24:44",
                "version": 1,
                "uuid": "e44b5df0-6b0c-11eb-955c-a722ae4268a1",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Colegiatura Secundaria - Diciembre",
                "quantity": 1,
                "price": 950,
                "schoolCharge": {
                    "id": 5502
                },
                "schoolPlanPayment": {
                    "id": 14261
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2021-01-13 11:24:44",
                "updatedAt": "2021-01-13 11:24:52",
                "version": 1,
                "uuid": "e44b60d0-6b0c-11eb-b5c1-5d2458ba97bd",
                "folio": "NTKBCR-5502",
                "change": 0,
                "quantity": 950,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5502
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5508,
                        "createdAt": "2021-01-13 11:24:45",
                        "updatedAt": "2021-01-13 11:24:45",
                        "version": 1,
                        "uuid": "e44b63e0-6b0c-11eb-ab47-dd11a913218b",
                        "codePaymentMethod": "03",
                        "quantity": 950,
                        "date": "2021-01-13",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5805,
                        "createdAt": "2021-01-13 11:24:49",
                        "updatedAt": "2021-01-13 11:24:52",
                        "version": 1,
                        "folio": "ACAKMCR-5805",
                        "uuid": "DC980F96-55BB-11EB-BA2C-89B9271D76E4",
                        "businessName": "JAVIER CARRERA FLORES",
                        "rfc": "XAXX010101000",
                        "total": 950,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5502
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5503,
        "createdAt": "2021-01-13 11:25:37",
        "updatedAt": "2021-01-13 11:25:53",
        "version": 1,
        "uuid": "e44b6870-6b0c-11eb-ac2b-bd3fddf0da1f",
        "folio": "NTKBCR-5503",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 442
        },
        "chargesDetails": [
            {
                "id": 8671,
                "createdAt": "2021-01-13 11:25:38",
                "updatedAt": "2021-01-13 11:25:38",
                "version": 1,
                "uuid": "e48ef510-6b0c-11eb-90c4-8df56e9fe92a",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Colegiatura primaria (por alumno) - Diciembre",
                "quantity": 1,
                "price": 875,
                "schoolCharge": {
                    "id": 5503
                },
                "schoolPlanPayment": {
                    "id": 14244
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2021-01-13 11:25:37",
                "updatedAt": "2021-01-13 11:25:53",
                "version": 1,
                "uuid": "e48ef9d0-6b0c-11eb-8bd7-b5c35e9b2877",
                "folio": "NTKBCR-5503",
                "change": 0,
                "quantity": 875,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5503
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5509,
                        "createdAt": "2021-01-13 11:25:38",
                        "updatedAt": "2021-01-13 11:25:38",
                        "version": 1,
                        "uuid": "e48f0030-6b0c-11eb-9875-1590598ec42c",
                        "codePaymentMethod": "03",
                        "quantity": 875,
                        "date": "2021-01-13",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5806,
                        "createdAt": "2021-01-13 11:25:44",
                        "updatedAt": "2021-01-13 11:25:53",
                        "version": 1,
                        "folio": "ACAKMCR-5806",
                        "uuid": "007D502E-55BC-11EB-9634-BF1AE765F474",
                        "businessName": "JAVIER CARRERA FLORES",
                        "rfc": "CAFJ850131MV4",
                        "total": 875,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5503
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5554,
        "createdAt": "2021-01-19 08:43:48",
        "updatedAt": "2021-01-19 09:54:24",
        "version": 1,
        "uuid": "e48f06a0-6b0c-11eb-afb6-bb8a23e871d1",
        "folio": "NTKBCR-5554",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 496
        },
        "chargesDetails": [
            {
                "id": 8757,
                "createdAt": "2021-01-19 08:43:49",
                "updatedAt": "2021-01-19 08:43:49",
                "version": 1,
                "uuid": "e4d090f0-6b0c-11eb-b6a7-a929066336d0",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n primaria",
                "quantity": 1,
                "price": 210,
                "schoolCharge": {
                    "id": 5554
                },
                "schoolPlanPayment": {
                    "id": 15893
                }
            },
            {
                "id": 8758,
                "createdAt": "2021-01-19 08:43:49",
                "updatedAt": "2021-01-19 08:43:49",
                "version": 1,
                "uuid": "e4d09790-6b0c-11eb-8aa1-4d53c2fb1e73",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Primaria",
                "quantity": 1,
                "price": 160,
                "schoolCharge": {
                    "id": 5554
                },
                "schoolPlanPayment": {
                    "id": 15904
                }
            },
            {
                "id": 8759,
                "createdAt": "2021-01-19 08:43:49",
                "updatedAt": "2021-01-19 08:43:49",
                "version": 1,
                "uuid": "e4d09d00-6b0c-11eb-afb7-4fbe4a5b619c",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5554
                },
                "schoolPlanPayment": {
                    "id": 15905
                }
            },
            {
                "id": 8760,
                "createdAt": "2021-01-19 08:43:49",
                "updatedAt": "2021-01-19 08:43:49",
                "version": 1,
                "uuid": "e4d0a210-6b0c-11eb-9100-2d03406a31d2",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Primaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5554
                },
                "schoolPlanPayment": {
                    "id": 15906
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2021-01-19 08:43:48",
                "updatedAt": "2021-01-19 09:54:24",
                "version": 1,
                "uuid": "e4d0a550-6b0c-11eb-8975-e36e2121403e",
                "folio": "NTKBCR-5554",
                "change": 0,
                "quantity": 870,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5554
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5560,
                        "createdAt": "2021-01-19 08:43:49",
                        "updatedAt": "2021-01-19 08:43:49",
                        "version": 1,
                        "uuid": "e4d0a9e0-6b0c-11eb-aabe-6599ed697d88",
                        "codePaymentMethod": "03",
                        "quantity": 870,
                        "date": "2021-01-19",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5859,
                        "createdAt": "2021-01-19 09:54:21",
                        "updatedAt": "2021-01-19 09:54:24",
                        "version": 1,
                        "folio": "ACAKMCR-5859",
                        "uuid": "37F31256-5A66-11EB-AC23-7738236802E0",
                        "businessName": "GOMEZ CRUZ BRITANY GERALDINE",
                        "rfc": "XAXX010101000",
                        "total": 870,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5554
                        },
                        "agentBilling": {
                            "id": 2
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5555,
        "createdAt": "2021-01-19 10:41:55",
        "updatedAt": "2021-01-19 10:42:14",
        "version": 1,
        "uuid": "e4d0b0c0-6b0c-11eb-b58b-f97a9937eebc",
        "folio": "NTKBCR-5555",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 437
        },
        "chargesDetails": [
            {
                "id": 8761,
                "createdAt": "2021-01-19 10:41:55",
                "updatedAt": "2021-01-19 10:41:55",
                "version": 1,
                "uuid": "e5120960-6b0c-11eb-839a-fff57f8a5805",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n primaria",
                "quantity": 1,
                "price": 680,
                "schoolCharge": {
                    "id": 5555
                },
                "schoolPlanPayment": {
                    "id": 15974
                }
            },
            {
                "id": 8762,
                "createdAt": "2021-01-19 10:41:55",
                "updatedAt": "2021-01-19 10:41:55",
                "version": 1,
                "uuid": "e5120d60-6b0c-11eb-b5f7-d9e9964fbc35",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Primaria",
                "quantity": 1,
                "price": 160,
                "schoolCharge": {
                    "id": 5555
                },
                "schoolPlanPayment": {
                    "id": 15985
                }
            },
            {
                "id": 8763,
                "createdAt": "2021-01-19 10:41:55",
                "updatedAt": "2021-01-19 10:41:55",
                "version": 1,
                "uuid": "e5121030-6b0c-11eb-970f-2fe157ca2a30",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5555
                },
                "schoolPlanPayment": {
                    "id": 15986
                }
            },
            {
                "id": 8764,
                "createdAt": "2021-01-19 10:41:55",
                "updatedAt": "2021-01-19 10:41:55",
                "version": 1,
                "uuid": "e5121330-6b0c-11eb-81f4-ef74f18361bb",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Primaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5555
                },
                "schoolPlanPayment": {
                    "id": 15987
                }
            },
            {
                "id": 8765,
                "createdAt": "2021-01-19 10:41:55",
                "updatedAt": "2021-01-19 10:41:55",
                "version": 1,
                "uuid": "e51215f0-6b0c-11eb-b201-63f30768803a",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Primaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5555
                },
                "schoolPlanPayment": {
                    "id": 15988
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2021-01-19 10:41:55",
                "updatedAt": "2021-01-19 10:42:14",
                "version": 1,
                "uuid": "e51217c0-6b0c-11eb-abc7-f578989e5875",
                "folio": "NTKBCR-5555",
                "change": 0,
                "quantity": 1840,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5555
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5561,
                        "createdAt": "2021-01-19 10:41:55",
                        "updatedAt": "2021-01-19 10:41:55",
                        "version": 1,
                        "uuid": "e5121a80-6b0c-11eb-a3d2-f1dcac9808e9",
                        "codePaymentMethod": "01",
                        "quantity": 1840,
                        "date": "2021-01-19",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 1
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5860,
                        "createdAt": "2021-01-19 10:42:12",
                        "updatedAt": "2021-01-19 10:42:14",
                        "version": 1,
                        "folio": "ACAKMCR-5860",
                        "uuid": "E6DBD284-5A6C-11EB-A920-5F738E31C29A",
                        "businessName": "BRYAN ESAU UC LOEZA",
                        "rfc": "XAXX010101000",
                        "total": 1840,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5555
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5556,
        "createdAt": "2021-01-19 11:01:34",
        "updatedAt": "2021-01-19 11:01:44",
        "version": 1,
        "uuid": "e5121e80-6b0c-11eb-80b6-e13bbf14c1ee",
        "folio": "NTKBCR-5556",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 75
        },
        "chargesDetails": [
            {
                "id": 8766,
                "createdAt": "2021-01-19 11:01:34",
                "updatedAt": "2021-01-19 11:01:34",
                "version": 1,
                "uuid": "e5579cc0-6b0c-11eb-9ebd-1993511c4e8f",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n primaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5556
                },
                "schoolPlanPayment": {
                    "id": 16026
                }
            },
            {
                "id": 8767,
                "createdAt": "2021-01-19 11:01:34",
                "updatedAt": "2021-01-19 11:01:34",
                "version": 1,
                "uuid": "e557a3c0-6b0c-11eb-83d0-99c018809802",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Primaria",
                "quantity": 1,
                "price": 160,
                "schoolCharge": {
                    "id": 5556
                },
                "schoolPlanPayment": {
                    "id": 16037
                }
            },
            {
                "id": 8768,
                "createdAt": "2021-01-19 11:01:34",
                "updatedAt": "2021-01-19 11:01:34",
                "version": 1,
                "uuid": "e557a9d0-6b0c-11eb-8446-198f517e22e4",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5556
                },
                "schoolPlanPayment": {
                    "id": 16038
                }
            },
            {
                "id": 8769,
                "createdAt": "2021-01-19 11:01:34",
                "updatedAt": "2021-01-19 11:01:34",
                "version": 1,
                "uuid": "e557aff0-6b0c-11eb-b652-1ba07e00d2bd",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Primaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5556
                },
                "schoolPlanPayment": {
                    "id": 16039
                }
            },
            {
                "id": 8770,
                "createdAt": "2021-01-19 11:01:34",
                "updatedAt": "2021-01-19 11:01:34",
                "version": 1,
                "uuid": "e557b620-6b0c-11eb-b383-813a6b9a97ca",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Primaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5556
                },
                "schoolPlanPayment": {
                    "id": 16040
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2021-01-19 11:01:34",
                "updatedAt": "2021-01-19 11:01:44",
                "version": 1,
                "uuid": "e557b9e0-6b0c-11eb-97a4-abbbf9d464f2",
                "folio": "NTKBCR-5556",
                "change": 0,
                "quantity": 1510,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5556
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5562,
                        "createdAt": "2021-01-19 11:01:34",
                        "updatedAt": "2021-01-19 11:01:34",
                        "version": 1,
                        "uuid": "e557bf00-6b0c-11eb-ae5a-8de2cce0c1b2",
                        "codePaymentMethod": "01",
                        "quantity": 1510,
                        "date": "2021-01-19",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 1
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5861,
                        "createdAt": "2021-01-19 11:01:42",
                        "updatedAt": "2021-01-19 11:01:44",
                        "version": 1,
                        "folio": "ACAKMCR-5861",
                        "uuid": "9FEAB8BA-5A6F-11EB-A338-1556C863335D",
                        "businessName": "KEVIN GABRIEL JIMENEZ CASTRO",
                        "rfc": "XAXX010101000",
                        "total": 1510,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5556
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5557,
        "createdAt": "2021-01-19 11:08:22",
        "updatedAt": "2021-01-19 11:08:29",
        "version": 1,
        "uuid": "e557c760-6b0c-11eb-8d4b-378acbc53ff7",
        "folio": "NTKBCR-5557",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 451
        },
        "chargesDetails": [
            {
                "id": 8771,
                "createdAt": "2021-01-19 11:08:22",
                "updatedAt": "2021-01-19 11:08:22",
                "version": 1,
                "uuid": "e59a7f20-6b0c-11eb-85b2-8f049fa1cc16",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "inscripci\u00f3n o Reinscripci\u00f3n Secundaria",
                "quantity": 1,
                "price": 1330,
                "schoolCharge": {
                    "id": 5557
                },
                "schoolPlanPayment": {
                    "id": 15991
                }
            },
            {
                "id": 8772,
                "createdAt": "2021-01-19 11:08:22",
                "updatedAt": "2021-01-19 11:08:22",
                "version": 1,
                "uuid": "e59a8350-6b0c-11eb-b72a-d5dc4060b875",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "CUOTA SEQ",
                "quantity": 1,
                "price": 200,
                "schoolCharge": {
                    "id": 5557
                },
                "schoolPlanPayment": {
                    "id": 16002
                }
            },
            {
                "id": 8773,
                "createdAt": "2021-01-19 11:08:22",
                "updatedAt": "2021-01-19 11:08:22",
                "version": 1,
                "uuid": "e59a8670-6b0c-11eb-a2e9-d3dd7e28ccd6",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "ESCUELA PARA PADRES",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5557
                },
                "schoolPlanPayment": {
                    "id": 16003
                }
            },
            {
                "id": 8774,
                "createdAt": "2021-01-19 11:08:22",
                "updatedAt": "2021-01-19 11:08:22",
                "version": 1,
                "uuid": "e59a8a10-6b0c-11eb-a3d8-f50d915816dc",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Secundaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5557
                },
                "schoolPlanPayment": {
                    "id": 16004
                }
            },
            {
                "id": 8775,
                "createdAt": "2021-01-19 11:08:22",
                "updatedAt": "2021-01-19 11:08:22",
                "version": 1,
                "uuid": "e59a8e20-6b0c-11eb-85cf-bd644e4d0cb2",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Secundaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5557
                },
                "schoolPlanPayment": {
                    "id": 16005
                }
            },
            {
                "id": 8776,
                "createdAt": "2021-01-19 11:08:22",
                "updatedAt": "2021-01-19 11:08:22",
                "version": 1,
                "uuid": "e59a9160-6b0c-11eb-bd71-c9389f899aac",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Prueba de Antidoping (Tercer grado)",
                "quantity": 1,
                "price": 200,
                "schoolCharge": {
                    "id": 5557
                },
                "schoolPlanPayment": {
                    "id": 16006
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2021-01-19 11:08:22",
                "updatedAt": "2021-01-19 11:08:29",
                "version": 1,
                "uuid": "e59a9360-6b0c-11eb-8965-354a5ef04364",
                "folio": "NTKBCR-5557",
                "change": 0,
                "quantity": 2730,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5557
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5563,
                        "createdAt": "2021-01-19 11:08:22",
                        "updatedAt": "2021-01-19 11:08:22",
                        "version": 1,
                        "uuid": "e59a9690-6b0c-11eb-b80a-0bcc190e60bd",
                        "codePaymentMethod": "03",
                        "quantity": 2730,
                        "date": "2021-01-19",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5862,
                        "createdAt": "2021-01-19 11:08:27",
                        "updatedAt": "2021-01-19 11:08:29",
                        "version": 1,
                        "folio": "ACAKMCR-5862",
                        "uuid": "914DECD6-5A70-11EB-A222-1D2E0D0768ED",
                        "businessName": "GUILLERMO PEREZ HERNANDEZ",
                        "rfc": "PEHG780306BP4",
                        "total": 2730,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5557
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5558,
        "createdAt": "2021-01-19 11:20:26",
        "updatedAt": "2021-01-19 11:20:36",
        "version": 1,
        "uuid": "e59a9be0-6b0c-11eb-887a-c9bece2c39e3",
        "folio": "NTKBCR-5558",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 609
        },
        "chargesDetails": [
            {
                "id": 8777,
                "createdAt": "2021-01-19 11:20:26",
                "updatedAt": "2021-01-19 11:20:26",
                "version": 1,
                "uuid": "e5dd2550-6b0c-11eb-8e8a-a93855223e47",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n primaria",
                "quantity": 1,
                "price": 1040,
                "schoolCharge": {
                    "id": 5558
                },
                "schoolPlanPayment": {
                    "id": 16095
                }
            },
            {
                "id": 8778,
                "createdAt": "2021-01-19 11:20:26",
                "updatedAt": "2021-01-19 11:20:26",
                "version": 1,
                "uuid": "e5dd29d0-6b0c-11eb-bb58-2b1d99f8e961",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Primaria",
                "quantity": 1,
                "price": 160,
                "schoolCharge": {
                    "id": 5558
                },
                "schoolPlanPayment": {
                    "id": 16106
                }
            },
            {
                "id": 8779,
                "createdAt": "2021-01-19 11:20:26",
                "updatedAt": "2021-01-19 11:20:26",
                "version": 1,
                "uuid": "e5dd2e80-6b0c-11eb-b32c-b3ab15f583ff",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5558
                },
                "schoolPlanPayment": {
                    "id": 16107
                }
            },
            {
                "id": 8780,
                "createdAt": "2021-01-19 11:20:26",
                "updatedAt": "2021-01-19 11:20:26",
                "version": 1,
                "uuid": "e5dd3200-6b0c-11eb-bb4d-57789aa375fc",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Primaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5558
                },
                "schoolPlanPayment": {
                    "id": 16108
                }
            },
            {
                "id": 8781,
                "createdAt": "2021-01-19 11:20:26",
                "updatedAt": "2021-01-19 11:20:26",
                "version": 1,
                "uuid": "e5dd3500-6b0c-11eb-beff-55478f09d2cd",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Primaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5558
                },
                "schoolPlanPayment": {
                    "id": 16109
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2021-01-19 11:20:26",
                "updatedAt": "2021-01-19 11:20:36",
                "version": 1,
                "uuid": "e5dd3700-6b0c-11eb-9cc9-c99438988eef",
                "folio": "NTKBCR-5558",
                "change": 0,
                "quantity": 2200,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5558
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5564,
                        "createdAt": "2021-01-19 11:20:26",
                        "updatedAt": "2021-01-19 11:20:26",
                        "version": 1,
                        "uuid": "e5dd39f0-6b0c-11eb-aaff-b13e9893e318",
                        "codePaymentMethod": "01",
                        "quantity": 2200,
                        "date": "2021-01-19",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 1
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5863,
                        "createdAt": "2021-01-19 11:20:34",
                        "updatedAt": "2021-01-19 11:20:36",
                        "version": 1,
                        "folio": "ACAKMCR-5863",
                        "uuid": "42B23A26-5A72-11EB-8A01-9D73E1549AC7",
                        "businessName": "ELIOENAI BERNARDO REYES",
                        "rfc": "XAXX010101000",
                        "total": 2200,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5558
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5559,
        "createdAt": "2021-01-19 11:23:59",
        "updatedAt": "2021-01-19 11:24:08",
        "version": 1,
        "uuid": "e5dd3e40-6b0c-11eb-bda7-750e0296dbdd",
        "folio": "NTKBCR-5559",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 632
        },
        "chargesDetails": [
            {
                "id": 8782,
                "createdAt": "2021-01-19 11:23:59",
                "updatedAt": "2021-01-19 11:23:59",
                "version": 1,
                "uuid": "e61fd080-6b0c-11eb-b46a-5335c11cf65d",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n primaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5559
                },
                "schoolPlanPayment": {
                    "id": 16112
                }
            },
            {
                "id": 8783,
                "createdAt": "2021-01-19 11:23:59",
                "updatedAt": "2021-01-19 11:23:59",
                "version": 1,
                "uuid": "e61fd520-6b0c-11eb-8c9e-696cedbc3560",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Primaria",
                "quantity": 1,
                "price": 160,
                "schoolCharge": {
                    "id": 5559
                },
                "schoolPlanPayment": {
                    "id": 16113
                }
            },
            {
                "id": 8784,
                "createdAt": "2021-01-19 11:24:00",
                "updatedAt": "2021-01-19 11:24:00",
                "version": 1,
                "uuid": "e61fd860-6b0c-11eb-a57d-8709fce405bf",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5559
                },
                "schoolPlanPayment": {
                    "id": 16114
                }
            },
            {
                "id": 8785,
                "createdAt": "2021-01-19 11:24:00",
                "updatedAt": "2021-01-19 11:24:00",
                "version": 1,
                "uuid": "e61fdbf0-6b0c-11eb-81ad-b58084adc167",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Primaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5559
                },
                "schoolPlanPayment": {
                    "id": 16115
                }
            },
            {
                "id": 8786,
                "createdAt": "2021-01-19 11:24:00",
                "updatedAt": "2021-01-19 11:24:00",
                "version": 1,
                "uuid": "e61fdef0-6b0c-11eb-b494-87f0ab350d2a",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Primaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5559
                },
                "schoolPlanPayment": {
                    "id": 16116
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2021-01-19 11:23:59",
                "updatedAt": "2021-01-19 11:24:08",
                "version": 1,
                "uuid": "e61fe190-6b0c-11eb-9003-4b27e9f3e96c",
                "folio": "NTKBCR-5559",
                "change": 0,
                "quantity": 1510,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5559
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5565,
                        "createdAt": "2021-01-19 11:24:00",
                        "updatedAt": "2021-01-19 11:24:00",
                        "version": 1,
                        "uuid": "e61fe4a0-6b0c-11eb-a11d-99b1a161afb3",
                        "codePaymentMethod": "01",
                        "quantity": 1510,
                        "date": "2021-01-19",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 1
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5864,
                        "createdAt": "2021-01-19 11:24:06",
                        "updatedAt": "2021-01-19 11:24:08",
                        "version": 1,
                        "folio": "ACAKMCR-5864",
                        "uuid": "C129BE38-5A72-11EB-9A62-3F417039827F",
                        "businessName": "VIRGINIA DEL CARMEN VELAZCO ALVAREZ",
                        "rfc": "XAXX010101000",
                        "total": 1510,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5559
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5560,
        "createdAt": "2021-01-19 11:39:35",
        "updatedAt": "2021-01-19 11:39:43",
        "version": 1,
        "uuid": "e61fe8e0-6b0c-11eb-902f-8d607e2f23fd",
        "folio": "NTKBCR-5560",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 662
        },
        "chargesDetails": [
            {
                "id": 8787,
                "createdAt": "2021-01-19 11:39:35",
                "updatedAt": "2021-01-19 11:39:35",
                "version": 1,
                "uuid": "e6613ae0-6b0c-11eb-8907-d1251bf7db1d",
                "codeConcept": "86121601",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n o Reinscripci\u00f3n Preparatoria",
                "quantity": 1,
                "price": 210,
                "schoolCharge": {
                    "id": 5560
                },
                "schoolPlanPayment": {
                    "id": 16117
                }
            },
            {
                "id": 8788,
                "createdAt": "2021-01-19 11:39:35",
                "updatedAt": "2021-01-19 11:39:35",
                "version": 1,
                "uuid": "e6613ec0-6b0c-11eb-ba24-a37b4d0c5c45",
                "codeConcept": "86121601",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para Padres",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5560
                },
                "schoolPlanPayment": {
                    "id": 16129
                }
            },
            {
                "id": 8789,
                "createdAt": "2021-01-19 11:39:35",
                "updatedAt": "2021-01-19 11:39:35",
                "version": 1,
                "uuid": "e66141a0-6b0c-11eb-bcba-1141ba5b9df4",
                "codeConcept": "86121601",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de Orfandad",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5560
                },
                "schoolPlanPayment": {
                    "id": 16130
                }
            },
            {
                "id": 8790,
                "createdAt": "2021-01-19 11:39:35",
                "updatedAt": "2021-01-19 11:39:35",
                "version": 1,
                "uuid": "e6614580-6b0c-11eb-aee8-2d179a6147dd",
                "codeConcept": "86121601",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Prueba de Antidoping",
                "quantity": 1,
                "price": 200,
                "schoolCharge": {
                    "id": 5560
                },
                "schoolPlanPayment": {
                    "id": 16131
                }
            },
            {
                "id": 8791,
                "createdAt": "2021-01-19 11:39:35",
                "updatedAt": "2021-01-19 11:39:35",
                "version": 1,
                "uuid": "e66147d0-6b0c-11eb-9f54-e5926fa0034c",
                "codeConcept": "86121601",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota Seyc",
                "quantity": 1,
                "price": 200,
                "schoolCharge": {
                    "id": 5560
                },
                "schoolPlanPayment": {
                    "id": 16118
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2021-01-19 11:39:35",
                "updatedAt": "2021-01-19 11:39:43",
                "version": 1,
                "uuid": "e66149b0-6b0c-11eb-90e6-a59c944fcacc",
                "folio": "NTKBCR-5560",
                "change": 0,
                "quantity": 1110,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5560
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5566,
                        "createdAt": "2021-01-19 11:39:35",
                        "updatedAt": "2021-01-19 11:39:35",
                        "version": 1,
                        "uuid": "e6614c70-6b0c-11eb-8fdb-3dfd4cceb115",
                        "codePaymentMethod": "03",
                        "quantity": 1110,
                        "date": "2021-01-19",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5865,
                        "createdAt": "2021-01-19 11:39:41",
                        "updatedAt": "2021-01-19 11:39:43",
                        "version": 1,
                        "folio": "ACAKMCR-5865",
                        "uuid": "EE76FE08-5A74-11EB-9990-B7FE101655DE",
                        "businessName": "VIVIAN LUCIA AVILES AGUILAR",
                        "rfc": "XAXX010101000",
                        "total": 1110,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5560
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5561,
        "createdAt": "2021-01-19 11:40:29",
        "updatedAt": "2021-01-19 11:40:37",
        "version": 1,
        "uuid": "e66150c0-6b0c-11eb-9ff5-a31c27e306b1",
        "folio": "NTKBCR-5561",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 512
        },
        "chargesDetails": [
            {
                "id": 8792,
                "createdAt": "2021-01-19 11:40:29",
                "updatedAt": "2021-01-19 11:40:29",
                "version": 1,
                "uuid": "e6a92350-6b0c-11eb-92e3-4715aa254156",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n preescolar",
                "quantity": 1,
                "price": 210,
                "schoolCharge": {
                    "id": 5561
                },
                "schoolPlanPayment": {
                    "id": 16043
                }
            },
            {
                "id": 8793,
                "createdAt": "2021-01-19 11:40:29",
                "updatedAt": "2021-01-19 11:40:29",
                "version": 1,
                "uuid": "e6a928a0-6b0c-11eb-b584-e5359d8c364e",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Preescolar",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5561
                },
                "schoolPlanPayment": {
                    "id": 16054
                }
            },
            {
                "id": 8794,
                "createdAt": "2021-01-19 11:40:29",
                "updatedAt": "2021-01-19 11:40:29",
                "version": 1,
                "uuid": "e6a92d40-6b0c-11eb-addf-d10a49866d48",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5561
                },
                "schoolPlanPayment": {
                    "id": 16055
                }
            },
            {
                "id": 8795,
                "createdAt": "2021-01-19 11:40:29",
                "updatedAt": "2021-01-19 11:40:29",
                "version": 1,
                "uuid": "e6a93180-6b0c-11eb-b1ba-b163c548f9b5",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Preescolar",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5561
                },
                "schoolPlanPayment": {
                    "id": 16056
                }
            },
            {
                "id": 8796,
                "createdAt": "2021-01-19 11:40:29",
                "updatedAt": "2021-01-19 11:40:29",
                "version": 1,
                "uuid": "e6a93700-6b0c-11eb-8b64-7bf9831f9ba9",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Preescolar",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5561
                },
                "schoolPlanPayment": {
                    "id": 16057
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2021-01-19 11:40:29",
                "updatedAt": "2021-01-19 11:40:37",
                "version": 1,
                "uuid": "e6a93ad0-6b0c-11eb-8f46-c319c3425ce9",
                "folio": "NTKBCR-5561",
                "change": 0,
                "quantity": 1360,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5561
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5567,
                        "createdAt": "2021-01-19 11:40:29",
                        "updatedAt": "2021-01-19 11:40:29",
                        "version": 1,
                        "uuid": "e6a94010-6b0c-11eb-a626-bb7cba18fcfe",
                        "codePaymentMethod": "01",
                        "quantity": 1360,
                        "date": "2021-01-19",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 1
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5866,
                        "createdAt": "2021-01-19 11:40:35",
                        "updatedAt": "2021-01-19 11:40:37",
                        "version": 1,
                        "folio": "ACAKMCR-5866",
                        "uuid": "0E5D8192-5A75-11EB-973D-C71B51351078",
                        "businessName": "DAFNE ABISAI PEREZ GONZALEZ",
                        "rfc": "XAXX010101000",
                        "total": 1360,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5561
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5562,
        "createdAt": "2021-01-19 11:47:40",
        "updatedAt": "2021-01-19 11:47:48",
        "version": 1,
        "uuid": "e6a945d0-6b0c-11eb-9c3a-0ddbe81f1856",
        "folio": "NTKBCR-5562",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 460
        },
        "chargesDetails": [
            {
                "id": 8797,
                "createdAt": "2021-01-19 11:47:40",
                "updatedAt": "2021-01-19 11:47:40",
                "version": 1,
                "uuid": "e6eb8bb0-6b0c-11eb-9c69-019aa94f0eed",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "inscripci\u00f3n o Reinscripci\u00f3n Secundaria",
                "quantity": 1,
                "price": 950,
                "schoolCharge": {
                    "id": 5562
                },
                "schoolPlanPayment": {
                    "id": 16077
                }
            },
            {
                "id": 8798,
                "createdAt": "2021-01-19 11:47:40",
                "updatedAt": "2021-01-19 11:47:40",
                "version": 1,
                "uuid": "e6eb92c0-6b0c-11eb-ac21-e7c76a07d168",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "CUOTA SEQ",
                "quantity": 1,
                "price": 200,
                "schoolCharge": {
                    "id": 5562
                },
                "schoolPlanPayment": {
                    "id": 16088
                }
            },
            {
                "id": 8799,
                "createdAt": "2021-01-19 11:47:40",
                "updatedAt": "2021-01-19 11:47:40",
                "version": 1,
                "uuid": "e6eb9890-6b0c-11eb-97ce-6942e4f9925c",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "ESCUELA PARA PADRES",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5562
                },
                "schoolPlanPayment": {
                    "id": 16089
                }
            },
            {
                "id": 8800,
                "createdAt": "2021-01-19 11:47:40",
                "updatedAt": "2021-01-19 11:47:40",
                "version": 1,
                "uuid": "e6eb9e00-6b0c-11eb-a409-ffbe6c783249",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Secundaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5562
                },
                "schoolPlanPayment": {
                    "id": 16090
                }
            },
            {
                "id": 8801,
                "createdAt": "2021-01-19 11:47:40",
                "updatedAt": "2021-01-19 11:47:40",
                "version": 1,
                "uuid": "e6eba350-6b0c-11eb-9e7f-bb19b041ae66",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Secundaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5562
                },
                "schoolPlanPayment": {
                    "id": 16091
                }
            },
            {
                "id": 8802,
                "createdAt": "2021-01-19 11:47:40",
                "updatedAt": "2021-01-19 11:47:40",
                "version": 1,
                "uuid": "e6eba890-6b0c-11eb-9090-474bfeec55cb",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Prueba de Antidoping (Tercer grado)",
                "quantity": 1,
                "price": 200,
                "schoolCharge": {
                    "id": 5562
                },
                "schoolPlanPayment": {
                    "id": 16092
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2021-01-19 11:47:40",
                "updatedAt": "2021-01-19 11:47:48",
                "version": 1,
                "uuid": "e6ebacc0-6b0c-11eb-8a03-733c73b4ba6d",
                "folio": "NTKBCR-5562",
                "change": 0,
                "quantity": 2350,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5562
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5568,
                        "createdAt": "2021-01-19 11:47:40",
                        "updatedAt": "2021-01-19 11:47:40",
                        "version": 1,
                        "uuid": "e6ebb1a0-6b0c-11eb-94c4-37ef88da8294",
                        "codePaymentMethod": "03",
                        "quantity": 2350,
                        "date": "2021-01-19",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5867,
                        "createdAt": "2021-01-19 11:47:46",
                        "updatedAt": "2021-01-19 11:47:48",
                        "version": 1,
                        "folio": "ACAKMCR-5867",
                        "uuid": "0F287B58-5A76-11EB-AB97-7F3AA7AEAB8A",
                        "businessName": "DIEGO ISAAC HERRERA LEYVA",
                        "rfc": "XAXX010101000",
                        "total": 2350,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5562
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5563,
        "createdAt": "2021-01-19 11:52:14",
        "updatedAt": "2021-01-19 11:52:23",
        "version": 1,
        "uuid": "e6ebb8a0-6b0c-11eb-b1fa-65c7d150cc40",
        "folio": "NTKBCR-5563",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 158
        },
        "chargesDetails": [
            {
                "id": 8803,
                "createdAt": "2021-01-19 11:52:14",
                "updatedAt": "2021-01-19 11:52:14",
                "version": 1,
                "uuid": "e72dbe00-6b0c-11eb-bfa1-7d81a1264800",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "CUOTA SEQ",
                "quantity": 1,
                "price": 200,
                "schoolCharge": {
                    "id": 5563
                },
                "schoolPlanPayment": {
                    "id": 15627
                }
            },
            {
                "id": 8804,
                "createdAt": "2021-01-19 11:52:14",
                "updatedAt": "2021-01-19 11:52:14",
                "version": 1,
                "uuid": "e72dc550-6b0c-11eb-acbf-d55b99eb211a",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "ESCUELA PARA PADRES",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5563
                },
                "schoolPlanPayment": {
                    "id": 15628
                }
            },
            {
                "id": 8805,
                "createdAt": "2021-01-19 11:52:14",
                "updatedAt": "2021-01-19 11:52:14",
                "version": 1,
                "uuid": "e72dcc10-6b0c-11eb-8b05-273252c09dcc",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Secundaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5563
                },
                "schoolPlanPayment": {
                    "id": 15629
                }
            },
            {
                "id": 8806,
                "createdAt": "2021-01-19 11:52:14",
                "updatedAt": "2021-01-19 11:52:14",
                "version": 1,
                "uuid": "e72dd1f0-6b0c-11eb-9e3f-cf7e3c64c1ea",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Secundaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5563
                },
                "schoolPlanPayment": {
                    "id": 15630
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2021-01-19 11:52:14",
                "updatedAt": "2021-01-19 11:52:23",
                "version": 1,
                "uuid": "e72dd5b0-6b0c-11eb-b88d-2936a50b1a4f",
                "folio": "NTKBCR-5563",
                "change": 0,
                "quantity": 1200,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5563
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5569,
                        "createdAt": "2021-01-19 11:52:14",
                        "updatedAt": "2021-01-19 11:52:14",
                        "version": 1,
                        "uuid": "e72ddad0-6b0c-11eb-b0d3-7fd88e9af8e9",
                        "codePaymentMethod": "03",
                        "quantity": 1200,
                        "date": "2021-01-19",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5868,
                        "createdAt": "2021-01-19 11:52:21",
                        "updatedAt": "2021-01-19 11:52:23",
                        "version": 1,
                        "folio": "ACAKMCR-5868",
                        "uuid": "B3743166-5A76-11EB-AB5F-E7BB6BF38FB3",
                        "businessName": "EVELYN AHUEJOTE JIMENEZ",
                        "rfc": "XAXX010101000",
                        "total": 1200,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5563
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5564,
        "createdAt": "2021-01-19 11:56:20",
        "updatedAt": "2021-01-19 11:56:29",
        "version": 1,
        "uuid": "e72de2b0-6b0c-11eb-ac3b-1bef1614eaf7",
        "folio": "NTKBCR-5564",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 203
        },
        "chargesDetails": [
            {
                "id": 8807,
                "createdAt": "2021-01-19 11:56:20",
                "updatedAt": "2021-01-19 11:56:20",
                "version": 1,
                "uuid": "e7702970-6b0c-11eb-845f-8d6a585a0306",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "CUOTA SEQ",
                "quantity": 1,
                "price": 200,
                "schoolCharge": {
                    "id": 5564
                },
                "schoolPlanPayment": {
                    "id": 15644
                }
            },
            {
                "id": 8808,
                "createdAt": "2021-01-19 11:56:20",
                "updatedAt": "2021-01-19 11:56:20",
                "version": 1,
                "uuid": "e7702d40-6b0c-11eb-96fb-0f5f4427bf68",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "ESCUELA PARA PADRES",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5564
                },
                "schoolPlanPayment": {
                    "id": 15645
                }
            },
            {
                "id": 8809,
                "createdAt": "2021-01-19 11:56:20",
                "updatedAt": "2021-01-19 11:56:20",
                "version": 1,
                "uuid": "e7703020-6b0c-11eb-a9cf-757e13d0ab2a",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Secundaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5564
                },
                "schoolPlanPayment": {
                    "id": 15646
                }
            },
            {
                "id": 8810,
                "createdAt": "2021-01-19 11:56:20",
                "updatedAt": "2021-01-19 11:56:20",
                "version": 1,
                "uuid": "e7703330-6b0c-11eb-a486-611115798391",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Secundaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5564
                },
                "schoolPlanPayment": {
                    "id": 15647
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2021-01-19 11:56:20",
                "updatedAt": "2021-01-19 11:56:29",
                "version": 1,
                "uuid": "e7703520-6b0c-11eb-9a58-43501004b484",
                "folio": "NTKBCR-5564",
                "change": 0,
                "quantity": 1200,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5564
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5570,
                        "createdAt": "2021-01-19 11:56:20",
                        "updatedAt": "2021-01-19 11:56:20",
                        "version": 1,
                        "uuid": "e77037e0-6b0c-11eb-9831-5f5e2c34bcb8",
                        "codePaymentMethod": "03",
                        "quantity": 1200,
                        "date": "2021-01-19",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5869,
                        "createdAt": "2021-01-19 11:56:27",
                        "updatedAt": "2021-01-19 11:56:29",
                        "version": 1,
                        "folio": "ACAKMCR-5869",
                        "uuid": "4635BE52-5A77-11EB-A186-CBF00E4FA990",
                        "businessName": "STACY AHUEJOTE JIMENEZ",
                        "rfc": "XAXX010101000",
                        "total": 1200,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5564
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5565,
        "createdAt": "2021-01-19 12:06:12",
        "updatedAt": "2021-01-19 12:06:21",
        "version": 1,
        "uuid": "e7703c10-6b0c-11eb-b12b-29bc9e513fd9",
        "folio": "NTKBCR-5565",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 506
        },
        "chargesDetails": [
            {
                "id": 8811,
                "createdAt": "2021-01-19 12:06:13",
                "updatedAt": "2021-01-19 12:06:13",
                "version": 1,
                "uuid": "e7d342b0-6b0c-11eb-96fc-43a16de0178f",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "inscripci\u00f3n o Reinscripci\u00f3n Secundaria",
                "quantity": 1,
                "price": 1330,
                "schoolCharge": {
                    "id": 5565
                },
                "schoolPlanPayment": {
                    "id": 16009
                }
            },
            {
                "id": 8812,
                "createdAt": "2021-01-19 12:06:13",
                "updatedAt": "2021-01-19 12:06:13",
                "version": 1,
                "uuid": "e7d34680-6b0c-11eb-bf48-c9a187f3cbc3",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "CUOTA SEQ",
                "quantity": 1,
                "price": 200,
                "schoolCharge": {
                    "id": 5565
                },
                "schoolPlanPayment": {
                    "id": 16020
                }
            },
            {
                "id": 8813,
                "createdAt": "2021-01-19 12:06:13",
                "updatedAt": "2021-01-19 12:06:13",
                "version": 1,
                "uuid": "e7d34950-6b0c-11eb-b4a7-ef8cbe9df317",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "ESCUELA PARA PADRES",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5565
                },
                "schoolPlanPayment": {
                    "id": 16021
                }
            },
            {
                "id": 8814,
                "createdAt": "2021-01-19 12:06:13",
                "updatedAt": "2021-01-19 12:06:13",
                "version": 1,
                "uuid": "e7d34c80-6b0c-11eb-a9be-83871609b1b6",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Secundaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5565
                },
                "schoolPlanPayment": {
                    "id": 16022
                }
            },
            {
                "id": 8815,
                "createdAt": "2021-01-19 12:06:13",
                "updatedAt": "2021-01-19 12:06:13",
                "version": 1,
                "uuid": "e7d34f50-6b0c-11eb-b90f-f77f9891f59b",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Secundaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5565
                },
                "schoolPlanPayment": {
                    "id": 16023
                }
            },
            {
                "id": 8816,
                "createdAt": "2021-01-19 12:06:13",
                "updatedAt": "2021-01-19 12:06:13",
                "version": 1,
                "uuid": "e7d35230-6b0c-11eb-8bdd-b3fa2e603e78",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Prueba de Antidoping (Tercer grado)",
                "quantity": 1,
                "price": 200,
                "schoolCharge": {
                    "id": 5565
                },
                "schoolPlanPayment": {
                    "id": 16134
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2021-01-19 12:06:12",
                "updatedAt": "2021-01-19 12:06:21",
                "version": 1,
                "uuid": "e7d35410-6b0c-11eb-99da-f3de269a3367",
                "folio": "NTKBCR-5565",
                "change": 0,
                "quantity": 2730,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5565
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5571,
                        "createdAt": "2021-01-19 12:06:13",
                        "updatedAt": "2021-01-19 12:06:13",
                        "version": 1,
                        "uuid": "e7d356c0-6b0c-11eb-a1fe-a5b9473a5c30",
                        "codePaymentMethod": "03",
                        "quantity": 2730,
                        "date": "2021-01-19",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5870,
                        "createdAt": "2021-01-19 12:06:19",
                        "updatedAt": "2021-01-19 12:06:21",
                        "version": 1,
                        "folio": "ACAKMCR-5870",
                        "uuid": "A6CFFEFC-5A78-11EB-A8B5-3BCB917C0F84",
                        "businessName": "ETHAN FRANCISCO GIBAL OLAN",
                        "rfc": "XAXX010101000",
                        "total": 2730,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5565
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5566,
        "createdAt": "2021-01-19 12:14:28",
        "updatedAt": "2021-01-19 12:14:38",
        "version": 1,
        "uuid": "e7d35ad0-6b0c-11eb-98d5-f520ffb6068d",
        "folio": "NTKBCR-5566",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 140
        },
        "chargesDetails": [
            {
                "id": 8817,
                "createdAt": "2021-01-19 12:14:28",
                "updatedAt": "2021-01-19 12:14:28",
                "version": 1,
                "uuid": "e814efe0-6b0c-11eb-9a38-49109be96c0a",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n primaria",
                "quantity": 1,
                "price": 540,
                "schoolCharge": {
                    "id": 5566
                },
                "schoolPlanPayment": {
                    "id": 16060
                }
            },
            {
                "id": 8818,
                "createdAt": "2021-01-19 12:14:28",
                "updatedAt": "2021-01-19 12:14:28",
                "version": 1,
                "uuid": "e814f470-6b0c-11eb-a841-75d76ad376bf",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Primaria",
                "quantity": 1,
                "price": 160,
                "schoolCharge": {
                    "id": 5566
                },
                "schoolPlanPayment": {
                    "id": 16071
                }
            },
            {
                "id": 8819,
                "createdAt": "2021-01-19 12:14:28",
                "updatedAt": "2021-01-19 12:14:28",
                "version": 1,
                "uuid": "e814f870-6b0c-11eb-981d-33b12bd23927",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5566
                },
                "schoolPlanPayment": {
                    "id": 16072
                }
            },
            {
                "id": 8820,
                "createdAt": "2021-01-19 12:14:28",
                "updatedAt": "2021-01-19 12:14:28",
                "version": 1,
                "uuid": "e814fd20-6b0c-11eb-8b33-391aee4561bd",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Primaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5566
                },
                "schoolPlanPayment": {
                    "id": 16073
                }
            },
            {
                "id": 8821,
                "createdAt": "2021-01-19 12:14:28",
                "updatedAt": "2021-01-19 12:14:28",
                "version": 1,
                "uuid": "e8150150-6b0c-11eb-8cbc-01f338df0f28",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Primaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5566
                },
                "schoolPlanPayment": {
                    "id": 16074
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2021-01-19 12:14:28",
                "updatedAt": "2021-01-19 12:14:38",
                "version": 1,
                "uuid": "e8150360-6b0c-11eb-9e83-33aaccc376ad",
                "folio": "NTKBCR-5566",
                "change": 0,
                "quantity": 1700,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5566
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5572,
                        "createdAt": "2021-01-19 12:14:28",
                        "updatedAt": "2021-01-19 12:14:28",
                        "version": 1,
                        "uuid": "e8150630-6b0c-11eb-bb3a-995e46db7b6b",
                        "codePaymentMethod": "01",
                        "quantity": 1700,
                        "date": "2021-01-19",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 1
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5871,
                        "createdAt": "2021-01-19 12:14:36",
                        "updatedAt": "2021-01-19 12:14:38",
                        "version": 1,
                        "folio": "ACAKMCR-5871",
                        "uuid": "CF0DAF80-5A79-11EB-8690-C5B0DC71A0AC",
                        "businessName": "MIGUEL ADOLFO PEREZ GONZALEZ",
                        "rfc": "XAXX010101000",
                        "total": 1700,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5566
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5567,
        "createdAt": "2021-01-19 12:32:59",
        "updatedAt": "2021-01-19 12:33:16",
        "version": 1,
        "uuid": "e8150a40-6b0c-11eb-8e48-bb7a4b8cb0ca",
        "folio": "NTKBCR-5567",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 210
        },
        "chargesDetails": [
            {
                "id": 8822,
                "createdAt": "2021-01-19 12:32:59",
                "updatedAt": "2021-01-19 12:32:59",
                "version": 1,
                "uuid": "e8574240-6b0c-11eb-b5af-83915773bb55",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "inscripci\u00f3n o Reinscripci\u00f3n Secundaria",
                "quantity": 1,
                "price": 560,
                "schoolCharge": {
                    "id": 5567
                },
                "schoolPlanPayment": {
                    "id": 16136
                }
            },
            {
                "id": 8823,
                "createdAt": "2021-01-19 12:32:59",
                "updatedAt": "2021-01-19 12:32:59",
                "version": 1,
                "uuid": "e8574740-6b0c-11eb-83fa-032d934f497a",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "CUOTA SEQ",
                "quantity": 1,
                "price": 200,
                "schoolCharge": {
                    "id": 5567
                },
                "schoolPlanPayment": {
                    "id": 16147
                }
            },
            {
                "id": 8824,
                "createdAt": "2021-01-19 12:32:59",
                "updatedAt": "2021-01-19 12:32:59",
                "version": 1,
                "uuid": "e8574ae0-6b0c-11eb-9fc5-d1a3efd5fa3c",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "ESCUELA PARA PADRES",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5567
                },
                "schoolPlanPayment": {
                    "id": 16148
                }
            },
            {
                "id": 8825,
                "createdAt": "2021-01-19 12:32:59",
                "updatedAt": "2021-01-19 12:32:59",
                "version": 1,
                "uuid": "e8574df0-6b0c-11eb-ad36-b35295a59989",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Secundaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5567
                },
                "schoolPlanPayment": {
                    "id": 16149
                }
            },
            {
                "id": 8826,
                "createdAt": "2021-01-19 12:32:59",
                "updatedAt": "2021-01-19 12:32:59",
                "version": 1,
                "uuid": "e8575180-6b0c-11eb-8bf4-771f9b791ffb",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Secundaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5567
                },
                "schoolPlanPayment": {
                    "id": 16150
                }
            },
            {
                "id": 8827,
                "createdAt": "2021-01-19 12:32:59",
                "updatedAt": "2021-01-19 12:32:59",
                "version": 1,
                "uuid": "e8575480-6b0c-11eb-846a-31db211e2dbb",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Prueba de Antidoping (Tercer grado)",
                "quantity": 1,
                "price": 200,
                "schoolCharge": {
                    "id": 5567
                },
                "schoolPlanPayment": {
                    "id": 16151
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2021-01-19 12:32:59",
                "updatedAt": "2021-01-19 12:33:16",
                "version": 1,
                "uuid": "e85757e0-6b0c-11eb-9de4-83faedbcb8dd",
                "folio": "NTKBCR-5567",
                "change": 0,
                "quantity": 1960,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5567
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5573,
                        "createdAt": "2021-01-19 12:32:59",
                        "updatedAt": "2021-01-19 12:32:59",
                        "version": 1,
                        "uuid": "e8575b10-6b0c-11eb-958a-cbb76a82bec8",
                        "codePaymentMethod": "01",
                        "quantity": 1960,
                        "date": "2021-01-19",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 1
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5872,
                        "createdAt": "2021-01-19 12:33:14",
                        "updatedAt": "2021-01-19 12:33:16",
                        "version": 1,
                        "folio": "ACAKMCR-5872",
                        "uuid": "69367996-5A7C-11EB-AEB9-819D32BC86CC",
                        "businessName": "BRAYAN MANUEL KATT VALENTE",
                        "rfc": "XAXX010101000",
                        "total": 1960,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5567
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5582,
        "createdAt": "2021-01-20 12:18:14",
        "updatedAt": "2021-01-20 12:18:26",
        "version": 1,
        "uuid": "e8575fc0-6b0c-11eb-9cee-2b71747a55dc",
        "folio": "NTKBCR-5582",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 443
        },
        "chargesDetails": [
            {
                "id": 8849,
                "createdAt": "2021-01-20 12:18:14",
                "updatedAt": "2021-01-20 12:18:14",
                "version": 1,
                "uuid": "e89bdc00-6b0c-11eb-93f6-e168f41f2ca5",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Colegiatura Secundaria - Agosto",
                "quantity": 1,
                "price": 1615,
                "schoolCharge": {
                    "id": 5582
                },
                "schoolPlanPayment": {
                    "id": 13985
                }
            },
            {
                "id": 8850,
                "createdAt": "2021-01-20 12:18:15",
                "updatedAt": "2021-01-20 12:18:15",
                "version": 1,
                "uuid": "e89bdfe0-6b0c-11eb-bd64-5786e6931ef8",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Colegiatura Secundaria - Septiembre",
                "quantity": 1,
                "price": 30,
                "schoolCharge": {
                    "id": 5582
                },
                "schoolPlanPayment": {
                    "id": 13986
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2021-01-20 12:18:14",
                "updatedAt": "2021-01-20 12:18:26",
                "version": 1,
                "uuid": "e89be200-6b0c-11eb-855c-7758d026bc7c",
                "folio": "NTKBCR-5582",
                "change": 0,
                "quantity": 1645,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5582
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5588,
                        "createdAt": "2021-01-20 12:18:15",
                        "updatedAt": "2021-01-20 12:18:15",
                        "version": 1,
                        "uuid": "e89be4c0-6b0c-11eb-b432-fdea0847ded5",
                        "codePaymentMethod": "03",
                        "quantity": 1645,
                        "date": "2021-01-20",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5887,
                        "createdAt": "2021-01-20 12:18:25",
                        "updatedAt": "2021-01-20 12:18:26",
                        "version": 1,
                        "folio": "ACAKMCR-5887",
                        "uuid": "818D860C-5B43-11EB-9C19-B7717BC339C6",
                        "businessName": "DIEGO HERNANDEZ CAMPOS",
                        "rfc": "XAXX010101000",
                        "total": 1645,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5582
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5583,
        "createdAt": "2021-01-21 11:07:13",
        "updatedAt": "2021-01-21 11:07:25",
        "version": 1,
        "uuid": "e89be8a0-6b0c-11eb-926d-c3e85ebe02af",
        "folio": "NTKBCR-5583",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 180
        },
        "chargesDetails": [
            {
                "id": 8851,
                "createdAt": "2021-01-21 11:07:13",
                "updatedAt": "2021-01-21 11:07:13",
                "version": 1,
                "uuid": "e8de60a0-6b0c-11eb-9967-b303215a7d30",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "inscripci\u00f3n o Reinscripci\u00f3n Secundaria",
                "quantity": 1,
                "price": 595,
                "schoolCharge": {
                    "id": 5583
                },
                "schoolPlanPayment": {
                    "id": 16188
                }
            },
            {
                "id": 8852,
                "createdAt": "2021-01-21 11:07:13",
                "updatedAt": "2021-01-21 11:07:13",
                "version": 1,
                "uuid": "e8de6480-6b0c-11eb-b041-e3ec47ba8f7a",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "CUOTA SEQ",
                "quantity": 1,
                "price": 200,
                "schoolCharge": {
                    "id": 5583
                },
                "schoolPlanPayment": {
                    "id": 16199
                }
            },
            {
                "id": 8853,
                "createdAt": "2021-01-21 11:07:13",
                "updatedAt": "2021-01-21 11:07:13",
                "version": 1,
                "uuid": "e8de6760-6b0c-11eb-9788-cb216314f68f",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "ESCUELA PARA PADRES",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5583
                },
                "schoolPlanPayment": {
                    "id": 16200
                }
            },
            {
                "id": 8854,
                "createdAt": "2021-01-21 11:07:13",
                "updatedAt": "2021-01-21 11:07:13",
                "version": 1,
                "uuid": "e8de6a20-6b0c-11eb-930b-d3a0cbb74edc",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Secundaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5583
                },
                "schoolPlanPayment": {
                    "id": 16201
                }
            },
            {
                "id": 8855,
                "createdAt": "2021-01-21 11:07:13",
                "updatedAt": "2021-01-21 11:07:13",
                "version": 1,
                "uuid": "e8de6cd0-6b0c-11eb-916e-df8daa5b9a42",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Secundaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5583
                },
                "schoolPlanPayment": {
                    "id": 16202
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2021-01-21 11:07:13",
                "updatedAt": "2021-01-21 11:07:25",
                "version": 1,
                "uuid": "e8de6eb0-6b0c-11eb-b0de-67dc40fea359",
                "folio": "NTKBCR-5583",
                "change": 0,
                "quantity": 1795,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5583
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5589,
                        "createdAt": "2021-01-21 11:07:13",
                        "updatedAt": "2021-01-21 11:07:13",
                        "version": 1,
                        "uuid": "e8de7170-6b0c-11eb-8627-b1af6dbfd458",
                        "codePaymentMethod": "01",
                        "quantity": 1795,
                        "date": "2021-01-21",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 1
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5888,
                        "createdAt": "2021-01-21 11:07:23",
                        "updatedAt": "2021-01-21 11:07:25",
                        "version": 1,
                        "folio": "ACAKMCR-5888",
                        "uuid": "C0509F7C-5C02-11EB-AEC4-EF74E63BF465",
                        "businessName": "CARLOS JACINTO HERNANDEZ MENDEZ",
                        "rfc": "XAXX010101000",
                        "total": 1795,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5583
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5584,
        "createdAt": "2021-01-21 11:08:57",
        "updatedAt": "2021-01-21 11:09:06",
        "version": 1,
        "uuid": "e8de7580-6b0c-11eb-ad72-8d245e8771f2",
        "folio": "NTKBCR-5584",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 417
        },
        "chargesDetails": [
            {
                "id": 8856,
                "createdAt": "2021-01-21 11:08:57",
                "updatedAt": "2021-01-21 11:08:57",
                "version": 1,
                "uuid": "e9204a00-6b0c-11eb-92d1-e9fe694c646c",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n preescolar",
                "quantity": 1,
                "price": 525,
                "schoolCharge": {
                    "id": 5584
                },
                "schoolPlanPayment": {
                    "id": 16205
                }
            },
            {
                "id": 8857,
                "createdAt": "2021-01-21 11:08:57",
                "updatedAt": "2021-01-21 11:08:57",
                "version": 1,
                "uuid": "e92051d0-6b0c-11eb-91df-6fe0fcf343c2",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Preescolar",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5584
                },
                "schoolPlanPayment": {
                    "id": 16216
                }
            },
            {
                "id": 8858,
                "createdAt": "2021-01-21 11:08:57",
                "updatedAt": "2021-01-21 11:08:57",
                "version": 1,
                "uuid": "e92058a0-6b0c-11eb-a68e-556c07c643bc",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5584
                },
                "schoolPlanPayment": {
                    "id": 16217
                }
            },
            {
                "id": 8859,
                "createdAt": "2021-01-21 11:08:57",
                "updatedAt": "2021-01-21 11:08:57",
                "version": 1,
                "uuid": "e9205f20-6b0c-11eb-a6e3-9b6f967673b4",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Preescolar",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5584
                },
                "schoolPlanPayment": {
                    "id": 16218
                }
            },
            {
                "id": 8860,
                "createdAt": "2021-01-21 11:08:57",
                "updatedAt": "2021-01-21 11:08:57",
                "version": 1,
                "uuid": "e92065c0-6b0c-11eb-b9cb-1ff878aa96ba",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Preescolar",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5584
                },
                "schoolPlanPayment": {
                    "id": 16219
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2021-01-21 11:08:57",
                "updatedAt": "2021-01-21 11:09:06",
                "version": 1,
                "uuid": "e92069a0-6b0c-11eb-85dc-cf72b4aa5aa8",
                "folio": "NTKBCR-5584",
                "change": 0,
                "quantity": 1675,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5584
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5590,
                        "createdAt": "2021-01-21 11:08:57",
                        "updatedAt": "2021-01-21 11:08:57",
                        "version": 1,
                        "uuid": "e9206f60-6b0c-11eb-ac43-adf297cb1724",
                        "codePaymentMethod": "01",
                        "quantity": 1675,
                        "date": "2021-01-21",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 1
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5889,
                        "createdAt": "2021-01-21 11:09:04",
                        "updatedAt": "2021-01-21 11:09:06",
                        "version": 1,
                        "folio": "ACAKMCR-5889",
                        "uuid": "FC1D8010-5C02-11EB-B8F0-631583097E12",
                        "businessName": "ANYI MARIA HERNANDEZ MENDEZ",
                        "rfc": "XAXX010101000",
                        "total": 1675,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5584
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5620,
        "createdAt": "2021-01-26 12:00:54",
        "updatedAt": "2021-01-26 12:01:04",
        "version": 1,
        "uuid": "e92077a0-6b0c-11eb-b0bc-51bf3b901a9b",
        "folio": "NTKBCR-5620",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 446
        },
        "chargesDetails": [
            {
                "id": 8908,
                "createdAt": "2021-01-26 12:00:54",
                "updatedAt": "2021-01-26 12:00:54",
                "version": 1,
                "uuid": "e97394a0-6b0c-11eb-a3bc-e92e1358b667",
                "codeConcept": "86121601",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n o Reinscripci\u00f3n Preparatoria",
                "quantity": 1,
                "price": 1050,
                "schoolCharge": {
                    "id": 5620
                },
                "schoolPlanPayment": {
                    "id": 16223
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2021-01-26 12:00:54",
                "updatedAt": "2021-01-26 12:01:04",
                "version": 1,
                "uuid": "e9739990-6b0c-11eb-a822-83e30d0b261d",
                "folio": "NTKBCR-5620",
                "change": 0,
                "quantity": 1050,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5620
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5626,
                        "createdAt": "2021-01-26 12:00:54",
                        "updatedAt": "2021-01-26 12:00:54",
                        "version": 1,
                        "uuid": "e9739f40-6b0c-11eb-85ae-777353d739c3",
                        "codePaymentMethod": "03",
                        "quantity": 1050,
                        "date": "2021-01-26",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5925,
                        "createdAt": "2021-01-26 12:01:02",
                        "updatedAt": "2021-01-26 12:01:04",
                        "version": 1,
                        "folio": "ACAKMCR-5925",
                        "uuid": "12AC95CA-5FF8-11EB-A902-39717EDA4C5E",
                        "businessName": "RODRIGO EMILIANO ALCARAZ ALONSO",
                        "rfc": "XAXX010101000",
                        "total": 1050,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5620
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5621,
        "createdAt": "2021-01-26 12:04:25",
        "updatedAt": "2021-01-26 12:04:33",
        "version": 1,
        "uuid": "e973a770-6b0c-11eb-a5ea-ab0a8db4ec97",
        "folio": "NTKBCR-5621",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 173
        },
        "chargesDetails": [
            {
                "id": 8909,
                "createdAt": "2021-01-26 12:04:25",
                "updatedAt": "2021-01-26 12:04:25",
                "version": 1,
                "uuid": "e9d4d010-6b0c-11eb-a6c5-a19632ad2dc5",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "inscripci\u00f3n o Reinscripci\u00f3n Secundaria",
                "quantity": 1,
                "price": 950,
                "schoolCharge": {
                    "id": 5621
                },
                "schoolPlanPayment": {
                    "id": 16241
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2021-01-26 12:04:25",
                "updatedAt": "2021-01-26 12:04:33",
                "version": 1,
                "uuid": "e9d4d500-6b0c-11eb-9e0d-63bb6bb5ae0b",
                "folio": "NTKBCR-5621",
                "change": 0,
                "quantity": 950,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5621
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5627,
                        "createdAt": "2021-01-26 12:04:25",
                        "updatedAt": "2021-01-26 12:04:25",
                        "version": 1,
                        "uuid": "e9d4da60-6b0c-11eb-bb7a-abf5cb0c63c1",
                        "codePaymentMethod": "03",
                        "quantity": 950,
                        "date": "2021-01-26",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5926,
                        "createdAt": "2021-01-26 12:04:31",
                        "updatedAt": "2021-01-26 12:04:33",
                        "version": 1,
                        "folio": "ACAKMCR-5926",
                        "uuid": "8F8501C2-5FF8-11EB-B4DE-9DA803112380",
                        "businessName": "GUILLERMO SANTIAGO ALCARAZ ALONSO",
                        "rfc": "XAXX010101000",
                        "total": 950,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5621
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5622,
        "createdAt": "2021-01-26 12:09:41",
        "updatedAt": "2021-01-26 12:09:50",
        "version": 1,
        "uuid": "e9d4e2a0-6b0c-11eb-89cd-8b92583e103a",
        "folio": "NTKBCR-5622",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 128
        },
        "chargesDetails": [
            {
                "id": 8910,
                "createdAt": "2021-01-26 12:09:41",
                "updatedAt": "2021-01-26 12:09:41",
                "version": 1,
                "uuid": "ea35d8b0-6b0c-11eb-8212-f71b952e4e9e",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n primaria",
                "quantity": 1,
                "price": 612,
                "schoolCharge": {
                    "id": 5622
                },
                "schoolPlanPayment": {
                    "id": 16246
                }
            },
            {
                "id": 8911,
                "createdAt": "2021-01-26 12:09:41",
                "updatedAt": "2021-01-26 12:09:41",
                "version": 1,
                "uuid": "ea35de00-6b0c-11eb-b57c-a52d52e74f00",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Primaria",
                "quantity": 1,
                "price": 160,
                "schoolCharge": {
                    "id": 5622
                },
                "schoolPlanPayment": {
                    "id": 16257
                }
            },
            {
                "id": 8912,
                "createdAt": "2021-01-26 12:09:41",
                "updatedAt": "2021-01-26 12:09:41",
                "version": 1,
                "uuid": "ea35e1a0-6b0c-11eb-98eb-8716c94824a0",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5622
                },
                "schoolPlanPayment": {
                    "id": 16258
                }
            },
            {
                "id": 8913,
                "createdAt": "2021-01-26 12:09:41",
                "updatedAt": "2021-01-26 12:09:41",
                "version": 1,
                "uuid": "ea35e560-6b0c-11eb-aa1d-2f689413a7b7",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Primaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5622
                },
                "schoolPlanPayment": {
                    "id": 16259
                }
            },
            {
                "id": 8914,
                "createdAt": "2021-01-26 12:09:41",
                "updatedAt": "2021-01-26 12:09:41",
                "version": 1,
                "uuid": "ea35e8a0-6b0c-11eb-9d13-5bde33caa91b",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Primaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5622
                },
                "schoolPlanPayment": {
                    "id": 16260
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2021-01-26 12:09:41",
                "updatedAt": "2021-01-26 12:09:50",
                "version": 1,
                "uuid": "ea35ead0-6b0c-11eb-a4ed-2faca59ebb41",
                "folio": "NTKBCR-5622",
                "change": 0,
                "quantity": 1772,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5622
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5628,
                        "createdAt": "2021-01-26 12:09:41",
                        "updatedAt": "2021-01-26 12:09:41",
                        "version": 1,
                        "uuid": "ea35edf0-6b0c-11eb-acd0-c5692a5406ba",
                        "codePaymentMethod": "01",
                        "quantity": 1772,
                        "date": "2021-01-26",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 1
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5927,
                        "createdAt": "2021-01-26 12:09:48",
                        "updatedAt": "2021-01-26 12:09:50",
                        "version": 1,
                        "folio": "ACAKMCR-5927",
                        "uuid": "4C4E3A30-5FF9-11EB-B3A4-476186B9AB05",
                        "businessName": "NADIA REGINA DOMINGUEZ TORRES",
                        "rfc": "XAXX010101000",
                        "total": 1772,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5622
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5623,
        "createdAt": "2021-01-26 12:13:38",
        "updatedAt": "2021-01-26 12:13:56",
        "version": 1,
        "uuid": "ea35f240-6b0c-11eb-8db4-fd2200db1c48",
        "folio": "NTKBCR-5623",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 145
        },
        "chargesDetails": [
            {
                "id": 8915,
                "createdAt": "2021-01-26 12:13:38",
                "updatedAt": "2021-01-26 12:13:38",
                "version": 1,
                "uuid": "ea939bf0-6b0c-11eb-98cf-6fbc9a7ff2be",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n primaria",
                "quantity": 1,
                "price": 612.5,
                "schoolCharge": {
                    "id": 5623
                },
                "schoolPlanPayment": {
                    "id": 16263
                }
            },
            {
                "id": 8916,
                "createdAt": "2021-01-26 12:13:38",
                "updatedAt": "2021-01-26 12:13:38",
                "version": 1,
                "uuid": "ea93a060-6b0c-11eb-9f71-05a4352a15bf",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Primaria",
                "quantity": 1,
                "price": 160,
                "schoolCharge": {
                    "id": 5623
                },
                "schoolPlanPayment": {
                    "id": 16274
                }
            },
            {
                "id": 8917,
                "createdAt": "2021-01-26 12:13:38",
                "updatedAt": "2021-01-26 12:13:38",
                "version": 1,
                "uuid": "ea93a3a0-6b0c-11eb-8e0c-41d51d45ba12",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5623
                },
                "schoolPlanPayment": {
                    "id": 16275
                }
            },
            {
                "id": 8918,
                "createdAt": "2021-01-26 12:13:38",
                "updatedAt": "2021-01-26 12:13:38",
                "version": 1,
                "uuid": "ea93a730-6b0c-11eb-9911-c9ec2fd17edf",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Primaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5623
                },
                "schoolPlanPayment": {
                    "id": 16276
                }
            },
            {
                "id": 8919,
                "createdAt": "2021-01-26 12:13:38",
                "updatedAt": "2021-01-26 12:13:38",
                "version": 1,
                "uuid": "ea93aa50-6b0c-11eb-a7bc-31bd148ad8db",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Primaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5623
                },
                "schoolPlanPayment": {
                    "id": 16277
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2021-01-26 12:13:38",
                "updatedAt": "2021-01-26 12:13:56",
                "version": 1,
                "uuid": "ea93ac40-6b0c-11eb-be6d-6fe45520aabb",
                "folio": "NTKBCR-5623",
                "change": 0,
                "quantity": 1772.5,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5623
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5629,
                        "createdAt": "2021-01-26 12:13:38",
                        "updatedAt": "2021-01-26 12:13:38",
                        "version": 1,
                        "uuid": "ea93af40-6b0c-11eb-8bfe-2b042be79922",
                        "codePaymentMethod": "03",
                        "quantity": 1772.5,
                        "date": "2021-01-26",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5928,
                        "createdAt": "2021-01-26 12:13:53",
                        "updatedAt": "2021-01-26 12:13:56",
                        "version": 1,
                        "folio": "ACAKMCR-5928",
                        "uuid": "DEF1C1E0-5FF9-11EB-8643-8D8EB6E6B649",
                        "businessName": "WILLIAM ISRAEL MOLINA ROBLES",
                        "rfc": "MORW820507L75",
                        "total": 1772.5,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5623
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5625,
        "createdAt": "2021-01-28 11:19:14",
        "updatedAt": "2021-01-28 11:20:14",
        "version": 1,
        "uuid": "ea93b380-6b0c-11eb-b053-ef30f568e256",
        "folio": "NTKBCR-5625",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 671
        },
        "chargesDetails": [
            {
                "id": 8921,
                "createdAt": "2021-01-28 11:19:14",
                "updatedAt": "2021-01-28 11:19:14",
                "version": 1,
                "uuid": "eaf16080-6b0c-11eb-b25c-4dcf29951619",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n preescolar",
                "quantity": 1,
                "price": 1200,
                "schoolCharge": {
                    "id": 5625
                },
                "schoolPlanPayment": {
                    "id": 16281
                }
            },
            {
                "id": 8922,
                "createdAt": "2021-01-28 11:19:14",
                "updatedAt": "2021-01-28 11:19:14",
                "version": 1,
                "uuid": "eaf164b0-6b0c-11eb-a601-db64a988f259",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Preescolar",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5625
                },
                "schoolPlanPayment": {
                    "id": 16292
                }
            },
            {
                "id": 8923,
                "createdAt": "2021-01-28 11:19:14",
                "updatedAt": "2021-01-28 11:19:14",
                "version": 1,
                "uuid": "eaf167d0-6b0c-11eb-9fad-11f8399042d4",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5625
                },
                "schoolPlanPayment": {
                    "id": 16293
                }
            },
            {
                "id": 8924,
                "createdAt": "2021-01-28 11:19:14",
                "updatedAt": "2021-01-28 11:19:14",
                "version": 1,
                "uuid": "eaf16b00-6b0c-11eb-90df-23e6b5ddd3ab",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Preescolar",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5625
                },
                "schoolPlanPayment": {
                    "id": 16294
                }
            },
            {
                "id": 8925,
                "createdAt": "2021-01-28 11:19:14",
                "updatedAt": "2021-01-28 11:19:14",
                "version": 1,
                "uuid": "eaf16e00-6b0c-11eb-b6f9-0fb4c11d04b8",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Preescolar",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5625
                },
                "schoolPlanPayment": {
                    "id": 16295
                }
            },
            {
                "id": 8926,
                "createdAt": "2021-01-28 11:19:14",
                "updatedAt": "2021-01-28 11:19:14",
                "version": 1,
                "uuid": "eaf17040-6b0c-11eb-9a11-c1e276eef26f",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n preescolar",
                "quantity": 1,
                "price": 200,
                "schoolCharge": {
                    "id": 5625
                },
                "schoolPlanPayment": {
                    "id": 16281
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2021-01-28 11:19:14",
                "updatedAt": "2021-01-28 11:20:14",
                "version": 1,
                "uuid": "eaf17230-6b0c-11eb-ab88-2367cadfd7ff",
                "folio": "NTKBCR-5625",
                "change": 0,
                "quantity": 2550,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5625
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5631,
                        "createdAt": "2021-01-28 11:19:14",
                        "updatedAt": "2021-01-28 11:19:14",
                        "version": 1,
                        "uuid": "eaf17500-6b0c-11eb-8b46-8757cf3379a0",
                        "codePaymentMethod": "01",
                        "quantity": 2550,
                        "date": "2021-01-28",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 1
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5930,
                        "createdAt": "2021-01-28 11:20:11",
                        "updatedAt": "2021-01-28 11:20:14",
                        "version": 1,
                        "folio": "ACAKMCR-5930",
                        "uuid": "B36FB3C4-6184-11EB-84AE-9DDA7ABC4EA5",
                        "businessName": "THAUMATINI ISABELLA STAMOS RAMIREZ",
                        "rfc": "XAXX010101000",
                        "total": 2550,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5625
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5629,
        "createdAt": "2021-01-28 12:04:20",
        "updatedAt": "2021-01-28 12:04:29",
        "version": 1,
        "uuid": "eaf17930-6b0c-11eb-bed8-d36c3e76c420",
        "folio": "NTKBCR-5629",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 624
        },
        "chargesDetails": [
            {
                "id": 8933,
                "createdAt": "2021-01-28 12:04:20",
                "updatedAt": "2021-01-28 12:04:20",
                "version": 1,
                "uuid": "ec62d2d0-6b0c-11eb-aab8-859fa878bd5c",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n primaria",
                "quantity": 1,
                "price": 240,
                "schoolCharge": {
                    "id": 5629
                },
                "schoolPlanPayment": {
                    "id": 16299
                }
            },
            {
                "id": 8934,
                "createdAt": "2021-01-28 12:04:20",
                "updatedAt": "2021-01-28 12:04:20",
                "version": 1,
                "uuid": "ec62db30-6b0c-11eb-bed1-1bb4b11f0a05",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Primaria",
                "quantity": 1,
                "price": 160,
                "schoolCharge": {
                    "id": 5629
                },
                "schoolPlanPayment": {
                    "id": 16310
                }
            },
            {
                "id": 8935,
                "createdAt": "2021-01-28 12:04:20",
                "updatedAt": "2021-01-28 12:04:20",
                "version": 1,
                "uuid": "ec62e200-6b0c-11eb-9074-b5aa198d651c",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5629
                },
                "schoolPlanPayment": {
                    "id": 16311
                }
            },
            {
                "id": 8936,
                "createdAt": "2021-01-28 12:04:20",
                "updatedAt": "2021-01-28 12:04:20",
                "version": 1,
                "uuid": "ec62e970-6b0c-11eb-860f-917cacfde231",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Primaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5629
                },
                "schoolPlanPayment": {
                    "id": 16312
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2021-01-28 12:04:20",
                "updatedAt": "2021-01-28 12:04:29",
                "version": 1,
                "uuid": "ec62edd0-6b0c-11eb-be77-69abf52da85f",
                "folio": "NTKBCR-5629",
                "change": 0,
                "quantity": 900,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5629
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5635,
                        "createdAt": "2021-01-28 12:04:20",
                        "updatedAt": "2021-01-28 12:04:20",
                        "version": 1,
                        "uuid": "ec62f3c0-6b0c-11eb-bd83-65cd7c295ae4",
                        "codePaymentMethod": "01",
                        "quantity": 900,
                        "date": "2021-01-28",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 1
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5934,
                        "createdAt": "2021-01-28 12:04:27",
                        "updatedAt": "2021-01-28 12:04:29",
                        "version": 1,
                        "folio": "ACAKMCR-5934",
                        "uuid": "E1D95390-618A-11EB-8B34-4982A82D3586",
                        "businessName": "NATHALIA VELAZQUEZ HERNANDEZ",
                        "rfc": "XAXX010101000",
                        "total": 900,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5629
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5630,
        "createdAt": "2021-01-28 12:26:29",
        "updatedAt": "2021-01-28 12:26:41",
        "version": 1,
        "uuid": "ec62fc90-6b0c-11eb-a829-6f3a92ad89d3",
        "folio": "NTKBCR-5630",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 553
        },
        "chargesDetails": [
            {
                "id": 8937,
                "createdAt": "2021-01-28 12:26:29",
                "updatedAt": "2021-01-28 12:26:29",
                "version": 1,
                "uuid": "eca74bb0-6b0c-11eb-9675-7731304be657",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n preescolar",
                "quantity": 1,
                "price": 300,
                "schoolCharge": {
                    "id": 5630
                },
                "schoolPlanPayment": {
                    "id": 16315
                }
            },
            {
                "id": 8938,
                "createdAt": "2021-01-28 12:26:29",
                "updatedAt": "2021-01-28 12:26:29",
                "version": 1,
                "uuid": "eca75330-6b0c-11eb-8065-69645cfff237",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Preescolar",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5630
                },
                "schoolPlanPayment": {
                    "id": 16326
                }
            },
            {
                "id": 8939,
                "createdAt": "2021-01-28 12:26:29",
                "updatedAt": "2021-01-28 12:26:29",
                "version": 1,
                "uuid": "eca75970-6b0c-11eb-85da-55f104e6c333",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5630
                },
                "schoolPlanPayment": {
                    "id": 16327
                }
            },
            {
                "id": 8940,
                "createdAt": "2021-01-28 12:26:29",
                "updatedAt": "2021-01-28 12:26:29",
                "version": 1,
                "uuid": "eca75fc0-6b0c-11eb-a916-f3046545def1",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Preescolar",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5630
                },
                "schoolPlanPayment": {
                    "id": 16328
                }
            },
            {
                "id": 8941,
                "createdAt": "2021-01-28 12:26:29",
                "updatedAt": "2021-01-28 12:26:29",
                "version": 1,
                "uuid": "eca76640-6b0c-11eb-80b4-675abfd603d4",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Preescolar",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5630
                },
                "schoolPlanPayment": {
                    "id": 16329
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2021-01-28 12:26:29",
                "updatedAt": "2021-01-28 12:26:41",
                "version": 1,
                "uuid": "eca76a70-6b0c-11eb-b2a6-2d2926dab0df",
                "folio": "NTKBCR-5630",
                "change": 0,
                "quantity": 1450,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5630
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5636,
                        "createdAt": "2021-01-28 12:26:29",
                        "updatedAt": "2021-01-28 12:26:29",
                        "version": 1,
                        "uuid": "eca76f90-6b0c-11eb-b06a-77dafb35aa20",
                        "codePaymentMethod": "01",
                        "quantity": 1450,
                        "date": "2021-01-28",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 1
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5935,
                        "createdAt": "2021-01-28 12:26:39",
                        "updatedAt": "2021-01-28 12:26:41",
                        "version": 1,
                        "folio": "ACAKMCR-5935",
                        "uuid": "FBB8DD8C-618D-11EB-B54D-F7E69E5E4F70",
                        "businessName": "BREANNA PAOLA JIMENEZ SANCHEZ",
                        "rfc": "XAXX010101000",
                        "total": 1450,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5630
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5633,
        "createdAt": "2021-01-28 13:25:52",
        "updatedAt": "2021-01-28 13:25:59",
        "version": 1,
        "uuid": "eca77790-6b0c-11eb-8b81-1fb4a03006d3",
        "folio": "NTKBCR-5633",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 663
        },
        "chargesDetails": [
            {
                "id": 8945,
                "createdAt": "2021-01-28 13:25:52",
                "updatedAt": "2021-01-28 13:25:52",
                "version": 1,
                "uuid": "ece7ff60-6b0c-11eb-b992-89903b46aa75",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n primaria",
                "quantity": 1,
                "price": 750,
                "schoolCharge": {
                    "id": 5633
                },
                "schoolPlanPayment": {
                    "id": 16332
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2021-01-28 13:25:52",
                "updatedAt": "2021-01-28 13:25:59",
                "version": 1,
                "uuid": "ece804d0-6b0c-11eb-9590-cd0f02ed85cf",
                "folio": "NTKBCR-5633",
                "change": 0,
                "quantity": 750,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5633
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5639,
                        "createdAt": "2021-01-28 13:25:52",
                        "updatedAt": "2021-01-28 13:25:52",
                        "version": 1,
                        "uuid": "ece80af0-6b0c-11eb-980a-75ae38b06e04",
                        "codePaymentMethod": "03",
                        "quantity": 750,
                        "date": "2021-01-28",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5938,
                        "createdAt": "2021-01-28 13:25:57",
                        "updatedAt": "2021-01-28 13:25:59",
                        "version": 1,
                        "folio": "ACAKMCR-5938",
                        "uuid": "44640F68-6196-11EB-8E0C-B12ACCD51870",
                        "businessName": "DAVID EMILIO JAUREGUI VAZQUEZ",
                        "rfc": "XAXX010101000",
                        "total": 750,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5633
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5634,
        "createdAt": "2021-01-29 10:11:59",
        "updatedAt": "2021-01-29 10:12:44",
        "version": 1,
        "uuid": "ece813e0-6b0c-11eb-a635-89089576e3e9",
        "folio": "NTKBCR-5634",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 672
        },
        "chargesDetails": [
            {
                "id": 8946,
                "createdAt": "2021-01-29 10:11:59",
                "updatedAt": "2021-01-29 10:11:59",
                "version": 1,
                "uuid": "ed2873c0-6b0c-11eb-b281-b3576b9d4e2e",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n primaria",
                "quantity": 1,
                "price": 1180,
                "schoolCharge": {
                    "id": 5634
                },
                "schoolPlanPayment": {
                    "id": 16350
                }
            },
            {
                "id": 8947,
                "createdAt": "2021-01-29 10:11:59",
                "updatedAt": "2021-01-29 10:11:59",
                "version": 1,
                "uuid": "ed287b60-6b0c-11eb-8404-7177ba6b4c7e",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Primaria",
                "quantity": 1,
                "price": 160,
                "schoolCharge": {
                    "id": 5634
                },
                "schoolPlanPayment": {
                    "id": 16361
                }
            },
            {
                "id": 8948,
                "createdAt": "2021-01-29 10:11:59",
                "updatedAt": "2021-01-29 10:11:59",
                "version": 1,
                "uuid": "ed2881d0-6b0c-11eb-b029-0f871b99e94a",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5634
                },
                "schoolPlanPayment": {
                    "id": 16362
                }
            },
            {
                "id": 8949,
                "createdAt": "2021-01-29 10:11:59",
                "updatedAt": "2021-01-29 10:11:59",
                "version": 1,
                "uuid": "ed2887f0-6b0c-11eb-a733-b50ad69634bf",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Primaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5634
                },
                "schoolPlanPayment": {
                    "id": 16363
                }
            },
            {
                "id": 8950,
                "createdAt": "2021-01-29 10:11:59",
                "updatedAt": "2021-01-29 10:11:59",
                "version": 1,
                "uuid": "ed288e10-6b0c-11eb-84e7-cb1812da1e0c",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Primaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5634
                },
                "schoolPlanPayment": {
                    "id": 16364
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2021-01-29 10:11:59",
                "updatedAt": "2021-01-29 10:12:44",
                "version": 1,
                "uuid": "ed2891d0-6b0c-11eb-ba9f-49334bdc6a7d",
                "folio": "NTKBCR-5634",
                "change": 0,
                "quantity": 2340,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5634
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5640,
                        "createdAt": "2021-01-29 10:11:59",
                        "updatedAt": "2021-01-29 10:11:59",
                        "version": 1,
                        "uuid": "ed289710-6b0c-11eb-916a-dd668eadf95f",
                        "codePaymentMethod": "03",
                        "quantity": 2340,
                        "date": "2021-01-29",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5939,
                        "createdAt": "2021-01-29 10:12:42",
                        "updatedAt": "2021-01-29 10:12:44",
                        "version": 1,
                        "folio": "ACAKMCR-5939",
                        "uuid": "6FBC8484-6244-11EB-891C-D192D667DD38",
                        "businessName": "MATEO SALINAS BORQUEZ",
                        "rfc": "XAXX010101000",
                        "total": 2340,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5634
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5636,
        "createdAt": "2021-01-29 12:55:14",
        "updatedAt": "2021-01-29 12:56:03",
        "version": 1,
        "uuid": "ed289f10-6b0c-11eb-8781-21d65b19e558",
        "folio": "NTKBCR-5636",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 4
        },
        "chargesDetails": [
            {
                "id": 8952,
                "createdAt": "2021-01-29 12:55:14",
                "updatedAt": "2021-01-29 12:55:14",
                "version": 1,
                "uuid": "ed6a00c0-6b0c-11eb-9e52-87e89b750c9f",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n primaria",
                "quantity": 1,
                "price": 875,
                "schoolCharge": {
                    "id": 5636
                },
                "schoolPlanPayment": {
                    "id": 16367
                }
            },
            {
                "id": 8953,
                "createdAt": "2021-01-29 12:55:14",
                "updatedAt": "2021-01-29 12:55:14",
                "version": 1,
                "uuid": "ed6a0850-6b0c-11eb-a081-2b65a78e46e0",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Primaria",
                "quantity": 1,
                "price": 160,
                "schoolCharge": {
                    "id": 5636
                },
                "schoolPlanPayment": {
                    "id": 16378
                }
            },
            {
                "id": 8954,
                "createdAt": "2021-01-29 12:55:14",
                "updatedAt": "2021-01-29 12:55:14",
                "version": 1,
                "uuid": "ed6a0ef0-6b0c-11eb-8e71-ff83a3d7f7eb",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5636
                },
                "schoolPlanPayment": {
                    "id": 16379
                }
            },
            {
                "id": 8955,
                "createdAt": "2021-01-29 12:55:14",
                "updatedAt": "2021-01-29 12:55:14",
                "version": 1,
                "uuid": "ed6a1530-6b0c-11eb-8fd4-db3c35d603da",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Primaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5636
                },
                "schoolPlanPayment": {
                    "id": 16380
                }
            },
            {
                "id": 8956,
                "createdAt": "2021-01-29 12:55:14",
                "updatedAt": "2021-01-29 12:55:14",
                "version": 1,
                "uuid": "ed6a1b70-6b0c-11eb-9441-e96d29f34cbc",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Primaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5636
                },
                "schoolPlanPayment": {
                    "id": 16381
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2021-01-29 12:55:14",
                "updatedAt": "2021-01-29 12:56:03",
                "version": 1,
                "uuid": "ed6a1f30-6b0c-11eb-b1d8-5f2923f58e24",
                "folio": "NTKBCR-5636",
                "change": 0,
                "quantity": 2035,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5636
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5642,
                        "createdAt": "2021-01-29 12:55:14",
                        "updatedAt": "2021-01-29 12:55:14",
                        "version": 1,
                        "uuid": "ed6a2470-6b0c-11eb-81bb-3745da83986f",
                        "codePaymentMethod": "03",
                        "quantity": 2035,
                        "date": "2021-01-29",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5941,
                        "createdAt": "2021-01-29 12:56:00",
                        "updatedAt": "2021-01-29 12:56:03",
                        "version": 1,
                        "folio": "ACAKMCR-5941",
                        "uuid": "4002B3B4-625B-11EB-8428-55D5F66196C8",
                        "businessName": "KARLA ISABELLA MAGA\u00d1A MAGA\u00d1A",
                        "rfc": "XAXX010101000",
                        "total": 2035,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5636
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 5637,
        "createdAt": "2021-01-29 13:00:22",
        "updatedAt": "2021-01-29 13:00:43",
        "version": 1,
        "uuid": "ed6a2ca0-6b0c-11eb-b047-5ba9cf12dd09",
        "folio": "NTKBCR-5637",
        "iva": 16,
        "change": 0,
        "status": 2,
        "schoolCampus": {
            "id": 1
        },
        "schoolBranchOfficeSet": {
            "id": 2
        },
        "schoolCycle": {
            "id": 5
        },
        "cashier": {
            "id": 18
        },
        "schoolStudent": {
            "id": 34
        },
        "chargesDetails": [
            {
                "id": 8957,
                "createdAt": "2021-01-29 13:00:23",
                "updatedAt": "2021-01-29 13:00:23",
                "version": 1,
                "uuid": "edab6ea0-6b0c-11eb-891d-8f30d9cd06e2",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Inscripci\u00f3n primaria",
                "quantity": 1,
                "price": 875,
                "schoolCharge": {
                    "id": 5637
                },
                "schoolPlanPayment": {
                    "id": 16384
                }
            },
            {
                "id": 8958,
                "createdAt": "2021-01-29 13:00:23",
                "updatedAt": "2021-01-29 13:00:23",
                "version": 1,
                "uuid": "edab7380-6b0c-11eb-9eaf-ef7128091f31",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota SEQ Primaria",
                "quantity": 1,
                "price": 160,
                "schoolCharge": {
                    "id": 5637
                },
                "schoolPlanPayment": {
                    "id": 16385
                }
            },
            {
                "id": 8959,
                "createdAt": "2021-01-29 13:00:23",
                "updatedAt": "2021-01-29 13:00:23",
                "version": 1,
                "uuid": "edab7750-6b0c-11eb-a8da-93d770dba467",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Escuela para padres (por alumno)",
                "quantity": 1,
                "price": 150,
                "schoolCharge": {
                    "id": 5637
                },
                "schoolPlanPayment": {
                    "id": 16386
                }
            },
            {
                "id": 8960,
                "createdAt": "2021-01-29 13:00:23",
                "updatedAt": "2021-01-29 13:00:23",
                "version": 1,
                "uuid": "edab7bd0-6b0c-11eb-bb87-8b6f9a658284",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Cuota \u00fanica de mantenimiento Primaria",
                "quantity": 1,
                "price": 500,
                "schoolCharge": {
                    "id": 5637
                },
                "schoolPlanPayment": {
                    "id": 16388
                }
            },
            {
                "id": 8961,
                "createdAt": "2021-01-29 13:00:23",
                "updatedAt": "2021-01-29 13:00:23",
                "version": 1,
                "uuid": "edab7fc0-6b0c-11eb-b29b-f37ebd37b230",
                "codeConcept": "86121500",
                "codeUnit": "E48",
                "unidad": "Unidad de servicio",
                "concept": "Beca de orfandad Primaria",
                "quantity": 1,
                "price": 350,
                "schoolCharge": {
                    "id": 5637
                },
                "schoolPlanPayment": {
                    "id": 16389
                }
            }
        ],
        "chargesPayments": [
            {
                "createdAt": "2021-01-29 13:00:22",
                "updatedAt": "2021-01-29 13:00:43",
                "version": 1,
                "uuid": "edab82c0-6b0c-11eb-9d78-f9bfa9a01785",
                "folio": "NTKBCR-5637",
                "change": 0,
                "quantity": 2035,
                "stamping": 0,
                "isIVA": false,
                "schoolPaymentOffice": {
                    "id": 1
                },
                "schoolPaymentOfficeSet": {
                    "id": 2
                },
                "schoolCharge": {
                    "id": 5637
                },
                "paymentStatus": 2,
                "methodsPayments": [
                    {
                        "id": 5643,
                        "createdAt": "2021-01-29 13:00:23",
                        "updatedAt": "2021-01-29 13:00:23",
                        "version": 1,
                        "uuid": "edab86e0-6b0c-11eb-885d-cf480d6b1faf",
                        "codePaymentMethod": "03",
                        "quantity": 2035,
                        "date": "2021-01-29",
                        "account": "",
                        "invoiceMethodPayment": {
                            "id": 3
                        }
                    }
                ],
                "cashierCharge": {
                    "id": 18
                },
                "schoolChargesInvoice": [
                    {
                        "id": 5942,
                        "createdAt": "2021-01-29 13:00:41",
                        "updatedAt": "2021-01-29 13:00:43",
                        "version": 1,
                        "folio": "ACAKMCR-5942",
                        "uuid": "E714D1F0-625B-11EB-87C4-1D5E8A1F49CA",
                        "businessName": "MICHAEL STEVE MAGA\u00d1A MAGA\u00d1A",
                        "rfc": "XAXX010101000",
                        "total": 2035,
                        "status": 1,
                        "invoiceType": "Income",
                        "idPlantel": "1",
                        "schoolCharge": {
                            "id": 5637
                        },
                        "agentBilling": {
                            "id": 18
                        },
                        "invoiceBranchOffice": {
                            "id": 1
                        },
                        "invoiceBranchOfficeSet": {
                            "id": 2
                        }
                    }
                ]
            }
        ]
    }
]
