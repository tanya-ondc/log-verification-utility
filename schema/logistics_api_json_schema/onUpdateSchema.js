module.exports = {
  $id: "http://example.com/schema/onUpdateSchema",
  type: "object",
  properties: {
    context: {
      type: "object",
      properties: {
        domain: {
          type: "string",
          const: "nic2004:60232",
        },
        country: {
          type: "string",
        },
        city: {
          type: "string",
          const: {$data: "/on_search/context/city"}
        },
        action: {
          type: "string",
          const: "on_update",
        },
        core_version: {
          type: "string",
          const: "1.1.0",
        },
        bap_id: {
          type: "string",
        },
        bap_uri: {
          type: "string",
        },
        bpp_id: {
          type: "string",
        },
        bpp_uri: {
          type: "string",
        },
        transaction_id: {
          type: "string",
          const: {$data: "/update/context/transaction_id"}
        },
        message_id: {
          type: "string",
          const: {$data: "/update/context/message_id"}
        },
        timestamp: {
          type: "string",
          format: "date-time",
        },
      },
      required: [
        "domain",
        "country",
        "city",
        "action",
        "core_version",
        "bap_id",
        "bap_uri",
        "bpp_id",
        "bpp_uri",
        "transaction_id",
        "message_id",
        "timestamp",
      ],
    },
    message: {
      type: "object",
      properties: {
        order: {
          type: "object",
          properties: {
            id: {
              type: "string",
              const: {$data: "/confirm/message/order/id"}
            },
            state: {
              type: "string",
              enum:["Created","Accepted","Cancelled", "In-progress"]
            },
            items: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                    const: {$data: "/confirm/message/order/items/0/id"}
                  },
                  category_id: {
                    type: "string",
                    const: {$data: "/confirm/message/order/items/0/category_id"}
                  },
                  descriptor: {
                    type: "object",
                    properties: {
                      code: {
                        type: "string",
                        const: {$data: "/confirm/message/order/items/0/descriptor/code"}
                      },
                    },
                    required: ["code"],
                  },
                },
                required: ["id", "category_id", "descriptor"],
              },
            },
            fulfillments: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                  },
                  type: {
                    type: "string",
                  },
                  "@ondc/org/awb_no": {
                    type: "string",
                    minLength: 11,
                    maxLength: 16
                  },
                  start: {
                    type: "object",
                    properties: {
                      time: {
                        type: "object",
                        properties: {
                          range: {
                            type: "object",
                            properties: {
                              start: {
                                type: "string",
                                minimum: {$data: "7/context/timestamp"},
                                errorMessage: "${7/context/timestamp}"
                              },
                              end: {
                                type: "string",
                              },
                            },
                            required: ["start", "end"],
                          },
                        },
                        required: ["range"],
                      },
                      instructions: {
                        type: "object",
                        properties: {
                          short_desc: {
                            type: "string",
                          },
                          images: {
                            type: "array",
                            items: {
                              type: "string",
                            },
                          },
                        },
                        required: ["short_desc"],
                      },
                    },
                    required: [],
                  },
                  agent: {
                    type: "object",
                    properties: {
                      name: {
                        type: "string",
                      },
                      phone: {
                        type: "string",
                      },
                    },
                    required: ["name", "phone"],
                  },
                  "@ondc/org/ewaybillno": {
                    type: "string",
                  },
                  "@ondc/org/ebnexpirydate": {
                    type: "string",
                  },
                },
                required: ["id", "type", "start"],
              },
            },
            updated_at: {
              type: "string",
            },
          },
          required: ["id", "state", "items", "fulfillments", "updated_at"],
          oneOf: [
            {
              allOf: [
                {
                  properties: {
                    items: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          descriptor: {
                            properties: {
                              code: {const: "P2H2P"}
                            }
                          }
                        }
                      }
                    }
                  }
                },
                {
                  anyOf: [
                    {
                      properties: {
                        fulfillments: {
                          required: ["@ondc/org/awb_no", "@ondc/org/ewaybillno", "@ondc/org/ebnexpirydate", "start/instructions/images"]
                        }
                      }
                    },
                    {
                      required: ["/update/message/order/fulfillments/@ondc/org/awb_no", "/update/message/order/fulfillments/@ondc/org/ewaybillno", "/update/message/order/fulfillments/@ondc/org/ebnexpirydate", "start/instructions/images"]
                    }
                  ]
                }
              ]
            },
            {
              properties: {
                items: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      descriptor: {
                        properties: {
                          code: {const: "P2P"}
                        }
                      }
                    }
                  }
                }
              }
            }
          ]
        },
      },
      required: ["order"],
    },
    search: {
      $ref: "searchSchema#"
    },
    on_search: {
      $ref: "onSearchSchema#"
    },
    init: {
      $ref: "initSchema#"
    },
    on_init: {
      $ref: "onInitSchema#"
    },
    confirm: {
      $ref: "confirmSchema#"
    },
    on_confirm: {
      $ref: "onConfirmSchema#"
    },
    update: {
      $ref: "updateSchema#"
    }
  },
  required: ["context", "message"],
};
