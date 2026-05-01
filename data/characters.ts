import type { Character } from "./types";

export const characterJSON = {
  "Toxic": {
    "color": "#ff3913",
    "strokeColor": "#75ff13",
    "img_name": "toxic",
    "baseHeight": 138,
    "poses": [
      {
        "name": "swing",
        "imgSize": [
          215,
          158
        ],
        "hurtboxes": [
          [
            55,
            14,
            60,
            138
          ]
        ],
        "hitboxes": [
          [
            85,
            14,
            124,
            138
          ]
        ]
      },
      {
        "name": "smash",
        "imgSize": [
          213,
          240
        ],
        "hurtboxes": [
          [
            59,
            93,
            60,
            138
          ]
        ],
        "hitboxes": [
          [
            34,
            24,
            110,
            100
          ],
          [
            89,
            93,
            110,
            138
          ]
        ]
      },
      {
        "name": "spike",
        "imgSize": [
          165,
          278
        ],
        "hurtboxes": [
          [
            53,
            23,
            60,
            138
          ]
        ],
        "hitboxes": [
          [
            22,
            102,
            121,
            170
          ]
        ]
      },
      {
        "name": "bunt",
        "imgSize": [
          217,
          209
        ],
        "hurtboxes": [
          [
            64,
            60,
            60,
            138
          ]
        ],
        "hitboxes": [
          [
            127,
            20,
            77,
            75
          ],
          [
            94,
            95,
            110,
            103
          ]
        ]
      },
      {
        "name": "grab",
        "imgSize": [
          214,
          165
        ],
        "hurtboxes": [
          [
            64,
            18,
            60,
            138
          ]
        ],
        "hitboxes": [
          [
            94,
            18,
            110,
            138
          ]
        ],
        "canMirror": true,
        "fixedRelease": [
          110,
          49
        ]
      },
      {
        "name": "stand",
        "imgSize": [
          131,
          158
        ],
        "hurtboxes": [
          [
            15,
            12,
            60,
            138
          ]
        ],
        "hitboxes": []
      },
      {
        "name": "halfcrouch",
        "imgSize": [
          145,
          127
        ],
        "hurtboxes": [
          [
            42,
            23,
            60,
            96
          ]
        ],
        "hitboxes": [],
        "grounded": true,
        "groundOffset": 0
      },
      {
        "name": "crouch",
        "imgSize": [
          179,
          111
        ],
        "hurtboxes": [
          [
            53,
            36,
            80,
            64
          ]
        ],
        "hitboxes": [],
        "grounded": true,
        "groundOffset": 0
      },
      {
        "name": "lay",
        "imgSize": [
          179,
          72
        ],
        "hurtboxes": [
          [
            23,
            7,
            138,
            45
          ]
        ],
        "hitboxes": [],
        "grounded": true,
        "groundOffset": 7
      },
      {
        "name": "blaze",
        "imgSize": [
          400,
          352
        ],
        "hurtboxes": [
          [
            170,
            190,
            60,
            138
          ]
        ],
        "hitboxes": [
          [
            0,
            0,
            400,
            400
          ]
        ],
        "circle": true,
        "grounded": true,
        "groundOffset": 0
      }
    ],
    "angles": [
      {
        "name": "up",
        "degrees": -57,
        "validWhen": [
          "swing"
        ]
      },
      {
        "name": "ground-down",
        "degrees": 25,
        "validWhen": [
          "swing"
        ],
        "customOffset": 110
      },
      {
        "name": "smash",
        "degrees": 41,
        "validWhen": [
          "smash"
        ],
        "customOffset": 110
      },
      {
        "name": "air-down",
        "degrees": 35,
        "validWhen": [
          "swing"
        ],
        "customOffset": 70
      },
      {
        "name": "spike-forward",
        "degrees": 21,
        "validWhen": [
          "spike"
        ],
        "customOffset": 70
      },
      {
        "name": "spike-backward",
        "degrees": 106,
        "validWhen": [
          "spike"
        ]
      }
    ]
  },
  "Latch": {
    "color": "lightgreen",
    "strokeColor": "green",
    "img_name": "latch",
    "baseHeight": 136,
    "poses": [
      {
        "name": "swing",
        "imgSize": [
          209,
          163
        ],
        "hurtboxes": [
          [
            43,
            11,
            80,
            136
          ]
        ],
        "hitboxes": [
          [
            78,
            11,
            124,
            136
          ]
        ]
      },
      {
        "name": "spit",
        "imgSize": [
          209,
          151
        ],
        "hurtboxes": [
          [
            76,
            1,
            80,
            136
          ]
        ],
        "hitboxes": [],
        "canMirror": true,
        "fixedRelease": [
          65,
          53
        ]
      },
      {
        "name": "smash",
        "imgSize": [
          235,
          231
        ],
        "hurtboxes": [
          [
            76,
            80,
            80,
            136
          ]
        ],
        "hitboxes": [
          [
            61,
            8,
            110,
            72
          ],
          [
            111,
            80,
            124,
            136
          ]
        ]
      },
      {
        "name": "spike",
        "imgSize": [
          141,
          248
        ],
        "hurtboxes": [
          [
            33,
            0,
            80,
            136
          ]
        ],
        "hitboxes": [
          [
            13,
            78,
            120,
            170
          ]
        ]
      },
      {
        "name": "wallswing",
        "imgSize": [
          182,
          158
        ],
        "hurtboxes": [
          [
            22,
            22,
            80,
            136
          ]
        ],
        "hitboxes": [
          [
            52,
            0,
            130,
            158
          ]
        ],
        "wall": true
      },
      {
        "name": "bunt",
        "imgSize": [
          227,
          188
        ],
        "hurtboxes": [
          [
            68,
            40,
            80,
            136
          ]
        ],
        "hitboxes": [
          [
            148,
            0,
            79,
            74
          ],
          [
            103,
            74,
            124,
            102
          ]
        ]
      },
      {
        "name": "grab",
        "imgSize": [
          208,
          141
        ],
        "hurtboxes": [
          [
            49,
            0,
            80,
            135
          ]
        ],
        "hitboxes": [
          [
            84,
            0,
            124,
            136
          ]
        ],
        "canMirror": true,
        "fixedRelease": [
          120,
          68
        ]
      },
      {
        "name": "stand",
        "imgSize": [
          150,
          149
        ],
        "hurtboxes": [
          [
            46,
            0,
            80,
            136
          ]
        ],
        "hitboxes": []
      },
      {
        "name": "halfcrouch",
        "imgSize": [
          169,
          120
        ],
        "hurtboxes": [
          [
            39,
            0,
            80,
            96
          ]
        ],
        "hitboxes": [],
        "grounded": true,
        "groundOffset": 0
      },
      {
        "name": "crouch",
        "imgSize": [
          155,
          82
        ],
        "hurtboxes": [
          [
            26,
            5,
            80,
            60
          ]
        ],
        "hitboxes": [],
        "grounded": true,
        "groundOffset": 0
      },
      {
        "name": "lay",
        "imgSize": [
          196,
          69
        ],
        "hurtboxes": [
          [
            28,
            1,
            136,
            45
          ]
        ],
        "hitboxes": [],
        "grounded": true,
        "groundOffset": 6
      },
      {
        "name": "blaze",
        "imgSize": [
          400,
          346
        ],
        "hurtboxes": [
          [
            160,
            192,
            80,
            136
          ]
        ],
        "hitboxes": [
          [
            0,
            0,
            400,
            400
          ]
        ],
        "circle": true,
        "grounded": true,
        "groundOffset": 0
      }
    ],
    "angles": [
      {
        "name": "up",
        "degrees": -38,
        "validWhen": [
          "swing",
          "wallswing",
          "spit"
        ],
        "mirror": true
      },
      {
        "name": "ground-down",
        "degrees": 28,
        "validWhen": [
          "swing",
          "spit"
        ],
        "mirror": true
      },
      {
        "name": "smash",
        "degrees": 38,
        "validWhen": [
          "smash",
          "swing",
          "spit"
        ],
        "mirror": true,
        "customOffset": 110
      },
      {
        "name": "air-down",
        "degrees": 38,
        "validWhen": [
          "swing",
          "spit"
        ],
        "mirror": true
      },
      {
        "name": "spike-forward",
        "degrees": 66,
        "validWhen": [
          "spike"
        ]
      },
      {
        "name": "spike-backward",
        "degrees": -116,
        "validWhen": [
          "spike"
        ]
      },
      {
        "name": "wall-down",
        "degrees": 120,
        "validWhen": [
          "wallswing"
        ],
        "customOffset": 40
      },
      {
        "name": "special-down-forward",
        "degrees": 18,
        "validWhen": [
          "swing",
          "spit"
        ],
        "mirror": true,
        "customOffset": 110
      }
    ]
  },
  "Raptor": {
    "color": "red",
    "strokeColor": "purple",
    "img_name": "raptor",
    "baseHeight": 126,
    "poses": [
      {
        "name": "swing",
        "imgSize": [
          165,
          128
        ],
        "hurtboxes": [
          [
            16,
            0,
            60,
            126
          ]
        ],
        "hitboxes": [
          [
            41,
            0,
            124,
            126
          ]
        ],
        "canMirror": true
      },
      {
        "name": "smash",
        "imgSize": [
          213,
          201
        ],
        "hurtboxes": [
          [
            64,
            72,
            60,
            126
          ]
        ],
        "hitboxes": [
          [
            39,
            0,
            110,
            72
          ],
          [
            89,
            72,
            124,
            126
          ]
        ],
        "canMirror": true
      },
      {
        "name": "spike",
        "imgSize": [
          122,
          245
        ],
        "hurtboxes": [
          [
            31,
            2,
            60,
            126
          ]
        ],
        "hitboxes": [
          [
            0,
            75,
            122,
            170
          ]
        ],
        "canMirror": true
      },
      {
        "name": "bunt",
        "imgSize": [
          159,
          177
        ],
        "hurtboxes": [
          [
            10,
            40,
            60,
            126
          ]
        ],
        "hitboxes": [
          [
            70,
            0,
            89,
            72
          ],
          [
            35,
            72,
            124,
            94
          ]
        ]
      },
      {
        "name": "grab",
        "imgSize": [
          191,
          130
        ],
        "hurtboxes": [
          [
            42,
            0,
            60,
            126
          ]
        ],
        "hitboxes": [
          [
            67,
            0,
            124,
            126
          ]
        ],
        "canMirror": true,
        "fixedRelease": [
          110,
          43
        ]
      },
      {
        "name": "stand",
        "imgSize": [
          84,
          136
        ],
        "hurtboxes": [
          [
            12,
            5,
            60,
            126
          ]
        ],
        "hitboxes": []
      },
      {
        "name": "halfcrouch",
        "imgSize": [
          111,
          100
        ],
        "hurtboxes": [
          [
            0,
            2,
            60,
            96
          ]
        ],
        "hitboxes": [],
        "grounded": true,
        "groundOffset": 0
      },
      {
        "name": "crouch",
        "imgSize": [
          131,
          89
        ],
        "hurtboxes": [
          [
            0,
            18,
            80,
            64
          ]
        ],
        "hitboxes": [],
        "grounded": true,
        "groundOffset": 0
      },
      {
        "name": "lay",
        "imgSize": [
          184,
          54
        ],
        "hurtboxes": [
          [
            58,
            0,
            126,
            45
          ]
        ],
        "hitboxes": [],
        "grounded": true,
        "groundOffset": 1
      },
      {
        "name": "blaze",
        "imgSize": [
          400,
          352
        ],
        "hurtboxes": [
          [
            170,
            202,
            60,
            126
          ]
        ],
        "hitboxes": [
          [
            0,
            0,
            400,
            400
          ]
        ],
        "circle": true,
        "grounded": true,
        "groundOffset": 0
      }
    ],
    "angles": [
      {
        "name": "up",
        "degrees": -60,
        "validWhen": [
          "swing",
          "smash"
        ],
        "mirror": true
      },
      {
        "name": "ground-down",
        "degrees": 30,
        "validWhen": [
          "swing"
        ],
        "mirror": true
      },
      {
        "name": "smash",
        "degrees": 42,
        "validWhen": [
          "smash",
          "swing"
        ],
        "mirror": true
      },
      {
        "name": "air-down",
        "degrees": 42,
        "validWhen": [
          "swing"
        ],
        "mirror": true
      },
      {
        "name": "spike-forward",
        "degrees": 83,
        "validWhen": [
          "spike"
        ]
      },
      {
        "name": "spike-backward",
        "degrees": 97,
        "validWhen": [
          "spike"
        ]
      }
    ]
  },
  "Jet": {
    "color": "lightskyblue",
    "strokeColor": "royalblue",
    "img_name": "jet",
    "baseHeight": 148,
    "maxBubbleDistance": 230,
    "minBubbleOutDistance": 1472,
    "maxBubbleOutDistance": 3220,
    "bubbleMinHeight": 70,
    "bubbleStrokeColor": "cyan",
    "bubbleOutMinStrokeColor": "aquamarine",
    "bubbleOutMaxStrokeColor": "lightskyblue",
    "poses": [
      {
        "name": "swing",
        "imgSize": [
          158,
          157
        ],
        "hurtboxes": [
          [
            6,
            4,
            60,
            148
          ]
        ],
        "hitboxes": [
          [
            31,
            4,
            124,
            148
          ]
        ]
      },
      {
        "name": "smash",
        "imgSize": [
          196,
          217
        ],
        "hurtboxes": [
          [
            46,
            67,
            60,
            148
          ]
        ],
        "hitboxes": [
          [
            21,
            3,
            110,
            64
          ],
          [
            71,
            67,
            124,
            148
          ]
        ]
      },
      {
        "name": "spike",
        "imgSize": [
          128,
          257
        ],
        "hurtboxes": [
          [
            33,
            1,
            60,
            148
          ]
        ],
        "hitboxes": [
          [
            2,
            85,
            121,
            170
          ]
        ]
      },
      {
        "name": "bunt",
        "imgSize": [
          173,
          197
        ],
        "hurtboxes": [
          [
            21,
            43,
            60,
            148
          ]
        ],
        "hitboxes": [
          [
            81,
            3,
            89,
            74
          ],
          [
            46,
            77,
            124,
            114
          ]
        ]
      },
      {
        "name": "grab",
        "imgSize": [
          171,
          154
        ],
        "hurtboxes": [
          [
            18,
            2,
            60,
            148
          ]
        ],
        "hitboxes": [
          [
            43,
            2,
            124,
            148
          ]
        ],
        "canMirror": true,
        "fixedRelease": [
          110,
          74
        ]
      },
      {
        "name": "stand",
        "imgSize": [
          86,
          159
        ],
        "hurtboxes": [
          [
            15,
            6,
            60,
            148
          ]
        ],
        "hitboxes": []
      },
      {
        "name": "halfcrouch",
        "imgSize": [
          132,
          117
        ],
        "hurtboxes": [
          [
            27,
            4,
            60,
            104
          ]
        ],
        "hitboxes": [],
        "grounded": true,
        "groundOffset": 0
      },
      {
        "name": "crouch",
        "imgSize": [
          131,
          99
        ],
        "hurtboxes": [
          [
            17,
            17,
            80,
            70
          ]
        ],
        "hitboxes": [],
        "grounded": true,
        "groundOffset": 0
      },
      {
        "name": "lay",
        "imgSize": [
          174,
          76
        ],
        "hurtboxes": [
          [
            10,
            6,
            148,
            45
          ]
        ],
        "hitboxes": [],
        "grounded": true,
        "groundOffset": 12
      },
      {
        "name": "blaze",
        "imgSize": [
          400,
          352
        ],
        "hurtboxes": [
          [
            170,
            180,
            60,
            148
          ]
        ],
        "hitboxes": [
          [
            0,
            0,
            400,
            400
          ]
        ],
        "circle": true,
        "grounded": true,
        "groundOffset": 0
      }
    ],
    "angles": [
      {
        "name": "up",
        "degrees": -60,
        "validWhen": [
          "swing"
        ]
      },
      {
        "name": "ground-down",
        "degrees": 17,
        "validWhen": [
          "swing"
        ]
      },
      {
        "name": "smash",
        "degrees": 35,
        "validWhen": [
          "smash",
          "swing"
        ]
      },
      {
        "name": "air-down",
        "degrees": 35,
        "validWhen": [
          "swing"
        ]
      },
      {
        "name": "spike-forward",
        "degrees": 80,
        "validWhen": [
          "spike"
        ]
      },
      {
        "name": "spike-backward",
        "degrees": 100,
        "validWhen": [
          "spike"
        ]
      }
    ]
  },
  "Nitro": {
    "color": "white",
    "strokeColor": "black",
    "cuffStrokeColor": "#aaaaaa",
    "img_name": "nitro",
    "baseHeight": 148,
    "cuffReleaseOffset": [
      70,
      -26
    ],
    "cuffSpikeReleaseOffset": [
      0,
      35
    ],
    "afterCuffReleaseOffset": [
      80,
      0
    ],
    "nitroPullSpeed": 40,
    "ballPullSpeed": 40,
    "poses": [
      {
        "name": "swing",
        "imgSize": [
          225,
          163
        ],
        "hurtboxes": [
          [
            66,
            8,
            65,
            148
          ]
        ],
        "hitboxes": [
          [
            94,
            8,
            125,
            150
          ]
        ]
      },
      {
        "name": "smash",
        "imgSize": [
          226,
          224
        ],
        "hurtboxes": [
          [
            73,
            65,
            65,
            148
          ]
        ],
        "hitboxes": [
          [
            51,
            1,
            110,
            64
          ],
          [
            101,
            65,
            124,
            148
          ]
        ]
      },
      {
        "name": "spike",
        "imgSize": [
          128,
          258
        ],
        "hurtboxes": [
          [
            31,
            2,
            65,
            148
          ]
        ],
        "hitboxes": [
          [
            3,
            86,
            121,
            170
          ]
        ]
      },
      {
        "name": "bunt",
        "imgSize": [
          227,
          196
        ],
        "hurtboxes": [
          [
            53,
            42,
            65,
            148
          ]
        ],
        "hitboxes": [
          [
            119,
            2,
            86,
            76
          ],
          [
            81,
            79,
            124,
            111
          ]
        ]
      },
      {
        "name": "grab",
        "imgSize": [
          204,
          156
        ],
        "hurtboxes": [
          [
            48,
            3,
            65,
            148
          ]
        ],
        "hitboxes": [
          [
            76,
            3,
            124,
            148
          ]
        ],
        "canMirror": true,
        "fixedRelease": [
          102,
          48
        ]
      },
      {
        "name": "stand",
        "imgSize": [
          121,
          173
        ],
        "hurtboxes": [
          [
            38,
            16,
            65,
            148
          ]
        ],
        "hitboxes": []
      },
      {
        "name": "halfcrouch",
        "imgSize": [
          126,
          124
        ],
        "hurtboxes": [
          [
            46,
            2,
            66,
            114
          ]
        ],
        "hitboxes": [],
        "grounded": true,
        "groundOffset": 0
      },
      {
        "name": "crouch",
        "imgSize": [
          110,
          103
        ],
        "hurtboxes": [
          [
            28,
            7,
            80,
            90
          ]
        ],
        "hitboxes": [],
        "grounded": true,
        "groundOffset": 0
      },
      {
        "name": "lay",
        "imgSize": [
          204,
          73
        ],
        "hurtboxes": [
          [
            46,
            1,
            148,
            45
          ]
        ],
        "hitboxes": [],
        "grounded": true,
        "groundOffset": 12
      },
      {
        "name": "blaze",
        "imgSize": [
          400,
          352
        ],
        "hurtboxes": [
          [
            167.5,
            180,
            65,
            148
          ]
        ],
        "hitboxes": [
          [
            0,
            0,
            400,
            400
          ]
        ],
        "circle": true,
        "grounded": true,
        "groundOffset": 0
      }
    ],
    "angles": [
      {
        "name": "up",
        "degrees": -20,
        "validWhen": [
          "swing",
          "smash"
        ]
      },
      {
        "name": "ground-down",
        "degrees": 62,
        "validWhen": [
          "swing"
        ]
      },
      {
        "name": "air-down",
        "degrees": 62,
        "validWhen": [
          "swing"
        ]
      },
      {
        "name": "special-down",
        "degrees": 20,
        "validWhen": [
          "swing",
          "smash"
        ],
        "maxReflections": 1,
        "onlyCuff": true
      },
      {
        "name": "smash",
        "degrees": 41,
        "validWhen": [
          "smash"
        ]
      },
      {
        "name": "spike-forward",
        "degrees": 77,
        "validWhen": [
          "spike"
        ]
      },
      {
        "name": "spike-backward",
        "degrees": 180,
        "validWhen": [
          "spike"
        ],
        "maxReflections": 2
      }
    ],
    "angleOptionsOutOfCuff": [
      {
        "name": "up-out-of-cuff",
        "degrees": -20,
        "validWhen": [
          "swing"
        ]
      },
      {
        "name": "straight-out-of-cuff",
        "degrees": 0,
        "validWhen": [
          "swing"
        ],
        "maxReflections": 2
      },
      {
        "name": "down-out-of-cuff",
        "degrees": 62,
        "validWhen": [
          "swing"
        ]
      }
    ]
  },
  "Doombox": {
    "color": "#444",
    "strokeColor": "royalblue",
    "img_name": "db",
    "baseHeight": 170,
    "specialAngle": 15,
    "poses": [
      {
        "name": "swing",
        "imgSize": [
          341,
          233
        ],
        "hurtboxes": [
          [
            118,
            55,
            100,
            170
          ]
        ],
        "hitboxes": [
          [
            170,
            55,
            170,
            170
          ]
        ]
      },
      {
        "name": "smash",
        "imgSize": [
          322,
          295
        ],
        "hurtboxes": [
          [
            98,
            122,
            100,
            170
          ]
        ],
        "hitboxes": [
          [
            98,
            2,
            120,
            120
          ],
          [
            150,
            122,
            170,
            170
          ]
        ]
      },
      {
        "name": "spike",
        "imgSize": [
          166,
          310
        ],
        "hurtboxes": [
          [
            24,
            41,
            100,
            170
          ]
        ],
        "hitboxes": [
          [
            14,
            137,
            120,
            170
          ]
        ]
      },
      {
        "name": "bunt",
        "imgSize": [
          308,
          236
        ],
        "hurtboxes": [
          [
            83,
            58,
            100,
            170
          ]
        ],
        "hitboxes": [
          [
            185,
            18,
            120,
            82
          ],
          [
            135,
            100,
            170,
            128
          ]
        ]
      },
      {
        "name": "grab",
        "imgSize": [
          327,
          227
        ],
        "hurtboxes": [
          [
            88,
            50,
            100,
            170
          ]
        ],
        "hitboxes": [
          [
            140,
            50,
            170,
            170
          ]
        ],
        "canMirror": true,
        "fixedRelease": [
          130,
          85
        ]
      },
      {
        "name": "stand",
        "imgSize": [
          231,
          241
        ],
        "hurtboxes": [
          [
            51,
            51,
            100,
            170
          ]
        ],
        "hitboxes": []
      },
      {
        "name": "halfcrouch",
        "imgSize": [
          197,
          179
        ],
        "hurtboxes": [
          [
            45,
            74,
            100,
            84
          ]
        ],
        "hitboxes": [],
        "grounded": true,
        "groundOffset": 0
      },
      {
        "name": "crouch",
        "imgSize": [
          105,
          113
        ],
        "hurtboxes": [
          [
            4,
            47,
            100,
            60
          ]
        ],
        "hitboxes": [],
        "grounded": true,
        "groundOffset": -7
      },
      {
        "name": "pushbox",
        "imgSize": [
          332,
          117
        ],
        "hurtboxes": [
          [
            9,
            51,
            100,
            60
          ]
        ],
        "hitboxes": [
          [
            29,
            4,
            300,
            110
          ]
        ],
        "grounded": true,
        "groundOffset": -7
      },
      {
        "name": "lay",
        "imgSize": [
          290,
          121
        ],
        "hurtboxes": [
          [
            64,
            21,
            170,
            45
          ]
        ],
        "hitboxes": [],
        "grounded": true,
        "groundOffset": 22
      },
      {
        "name": "blaze",
        "imgSize": [
          400,
          329
        ],
        "hurtboxes": [
          [
            150,
            158,
            100,
            170
          ]
        ],
        "hitboxes": [
          [
            0,
            0,
            400,
            400
          ]
        ],
        "circle": true,
        "grounded": true,
        "groundOffset": 0
      }
    ],
    "angles": [
      {
        "name": "up",
        "degrees": -60,
        "validWhen": [
          "swing"
        ]
      },
      {
        "name": "ground-down",
        "degrees": 50,
        "validWhen": [
          "swing"
        ],
        "customOffset": 70
      },
      {
        "name": "smash",
        "degrees": 45,
        "validWhen": [
          "smash"
        ],
        "customOffset": 110
      },
      {
        "name": "air-down",
        "degrees": 64,
        "validWhen": [
          "swing"
        ],
        "customOffset": 70
      },
      {
        "name": "spike-forward",
        "degrees": 59,
        "validWhen": [
          "spike"
        ],
        "customOffset": 110
      },
      {
        "name": "spike-backward",
        "degrees": 160,
        "validWhen": [
          "spike"
        ]
      }
    ]
  },
  "Grid": {
    "color": "yellow",
    "strokeColor": "mediumpurple",
    "img_name": "grid",
    "baseHeight": 160,
    "teleportDistance": 330,
    "maxTeleports": 2,
    "teleport": [],
    "poses": [
      {
        "name": "swing",
        "imgSize": [
          217,
          166
        ],
        "hurtboxes": [
          [
            62,
            0,
            70,
            160
          ]
        ],
        "hitboxes": [
          [
            87,
            0,
            130,
            160
          ]
        ],
        "customTeleportPose": {
          "name": "swing_teleport",
          "imgSize": [
            233,
            169
          ],
          "hurtboxes": [
            [
              88,
              3,
              70,
              160
            ]
          ],
          "hitboxes": [],
          "teleportRelease": [
            122,
            80
          ],
          "teleportAngle": {
            "name": "straight",
            "degrees": 0,
            "maxReflections": 2
          }
        }
      },
      {
        "name": "smash",
        "imgSize": [
          222,
          252
        ],
        "hurtboxes": [
          [
            67,
            92,
            70,
            160
          ]
        ],
        "hitboxes": [
          [
            47,
            0,
            110,
            90
          ],
          [
            92,
            92,
            130,
            160
          ]
        ],
        "teleportRelease": [
          62,
          -93
        ],
        "teleportAngle": {
          "name": "smash",
          "degrees": 28,
          "customOffset": 130
        }
      },
      {
        "name": "spike",
        "imgSize": [
          122,
          260
        ],
        "hurtboxes": [
          [
            26,
            0,
            70,
            160
          ]
        ],
        "hitboxes": [
          [
            1,
            90,
            120,
            170
          ]
        ],
        "teleportRelease": [
          35,
          118
        ],
        "teleportAngle": {
          "name": "spike",
          "degrees": 90,
          "maxReflections": 2,
          "customOffset": 40
        }
      },
      {
        "name": "bunt",
        "imgSize": [
          201,
          210
        ],
        "hurtboxes": [
          [
            46,
            40,
            70,
            160
          ]
        ],
        "hitboxes": [
          [
            116,
            0,
            85,
            80
          ],
          [
            71,
            80,
            130,
            120
          ]
        ]
      },
      {
        "name": "grab",
        "imgSize": [
          232,
          169
        ],
        "hurtboxes": [
          [
            66,
            2,
            70,
            160
          ]
        ],
        "hitboxes": [
          [
            91,
            2,
            130,
            160
          ]
        ],
        "canMirror": true,
        "fixedRelease": [
          115,
          80
        ]
      },
      {
        "name": "stand",
        "imgSize": [
          163,
          191
        ],
        "hurtboxes": [
          [
            20,
            7,
            70,
            160
          ]
        ],
        "hitboxes": []
      },
      {
        "name": "halfcrouch",
        "imgSize": [
          149,
          162
        ],
        "hurtboxes": [
          [
            27,
            46,
            70,
            89
          ]
        ],
        "hitboxes": [],
        "grounded": true,
        "groundOffset": 0
      },
      {
        "name": "crouch",
        "imgSize": [
          139,
          148
        ],
        "hurtboxes": [
          [
            25,
            33,
            70,
            89
          ]
        ],
        "hitboxes": [],
        "grounded": true,
        "groundOffset": 0
      },
      {
        "name": "lay",
        "imgSize": [
          210,
          89
        ],
        "hurtboxes": [
          [
            6,
            1,
            160,
            45
          ]
        ],
        "hitboxes": [],
        "grounded": true,
        "groundOffset": 18
      },
      {
        "name": "blaze",
        "imgSize": [
          400,
          353
        ],
        "hurtboxes": [
          [
            165,
            168,
            70,
            160
          ]
        ],
        "hitboxes": [
          [
            0,
            0,
            400,
            400
          ]
        ],
        "circle": true,
        "grounded": true,
        "groundOffset": 0
      }
    ],
    "angles": [
      {
        "name": "up",
        "degrees": -50,
        "validWhen": [
          "swing"
        ]
      },
      {
        "name": "ground-down",
        "degrees": 50,
        "validWhen": [
          "swing"
        ]
      },
      {
        "name": "smash",
        "degrees": 28,
        "validWhen": [
          "smash"
        ],
        "customOffset": 110
      },
      {
        "name": "air-down",
        "degrees": 15,
        "validWhen": [
          "swing"
        ]
      },
      {
        "name": "spike-forward",
        "degrees": 32,
        "validWhen": [
          "spike"
        ],
        "customOffset": 70
      },
      {
        "name": "spike-backward",
        "degrees": 117,
        "validWhen": [
          "spike"
        ]
      }
    ]
  },
  "Switch": {
    "color": "slategrey",
    "strokeColor": "navy",
    "img_name": "switch",
    "baseHeight": 146,
    "poses": [
      {
        "name": "swing",
        "imgSize": [
          234,
          160
        ],
        "hurtboxes": [
          [
            80,
            2,
            60,
            146
          ]
        ],
        "hitboxes": [
          [
            105,
            2,
            124,
            146
          ]
        ]
      },
      {
        "name": "smash",
        "imgSize": [
          203,
          215
        ],
        "hurtboxes": [
          [
            53,
            65,
            60,
            146
          ]
        ],
        "hitboxes": [
          [
            28,
            3,
            110,
            62
          ],
          [
            78,
            65,
            124,
            146
          ]
        ],
        "canMirror": true
      },
      {
        "name": "spike",
        "imgSize": [
          135,
          263
        ],
        "hurtboxes": [
          [
            37,
            7,
            60,
            146
          ]
        ],
        "hitboxes": [
          [
            6,
            90,
            121,
            170
          ]
        ],
        "canMirror": true
      },
      {
        "name": "switchflip",
        "imgSize": [
          190,
          216
        ],
        "hurtboxes": [
          [
            57,
            28,
            60,
            146
          ]
        ],
        "hitboxes": [
          [
            12,
            83,
            150,
            130
          ]
        ],
        "canMirror": true
      },
      {
        "name": "overheadswitchflip",
        "imgSize": [
          178,
          245
        ],
        "hurtboxes": [
          [
            52,
            97,
            60,
            146
          ]
        ],
        "hitboxes": [
          [
            7,
            5,
            150,
            130
          ]
        ],
        "canMirror": true
      },
      {
        "name": "bunt",
        "imgSize": [
          195,
          220
        ],
        "hurtboxes": [
          [
            32,
            67,
            60,
            146
          ]
        ],
        "hitboxes": [
          [
            92,
            28,
            89,
            76
          ],
          [
            57,
            104,
            124,
            109
          ]
        ]
      },
      {
        "name": "grab",
        "imgSize": [
          187,
          176
        ],
        "hurtboxes": [
          [
            33,
            23,
            60,
            146
          ]
        ],
        "hitboxes": [
          [
            58,
            23,
            124,
            146
          ]
        ],
        "canMirror": true,
        "fixedRelease": [
          110,
          73
        ]
      },
      {
        "name": "stand",
        "imgSize": [
          120,
          160
        ],
        "hurtboxes": [
          [
            23,
            6,
            60,
            146
          ]
        ],
        "hitboxes": []
      },
      {
        "name": "halfcrouch",
        "imgSize": [
          149,
          123
        ],
        "hurtboxes": [
          [
            46,
            9,
            60,
            104
          ]
        ],
        "hitboxes": [],
        "grounded": true,
        "groundOffset": 0
      },
      {
        "name": "crouch",
        "imgSize": [
          156,
          92
        ],
        "hurtboxes": [
          [
            35,
            13,
            80,
            70
          ]
        ],
        "hitboxes": [],
        "grounded": true,
        "groundOffset": 0
      },
      {
        "name": "lay",
        "imgSize": [
          182,
          78
        ],
        "hurtboxes": [
          [
            25,
            8,
            146,
            45
          ]
        ],
        "hitboxes": [],
        "grounded": true,
        "groundOffset": 10
      },
      {
        "name": "blaze",
        "imgSize": [
          400,
          352
        ],
        "hurtboxes": [
          [
            170,
            182,
            60,
            146
          ]
        ],
        "hitboxes": [
          [
            0,
            0,
            400,
            400
          ]
        ],
        "circle": true,
        "grounded": true,
        "groundOffset": 0
      }
    ],
    "angles": [
      {
        "name": "up",
        "degrees": -120,
        "validWhen": [
          "swing"
        ]
      },
      {
        "name": "ground-down",
        "degrees": 17,
        "validWhen": [
          "swing",
          "switchflip",
          "overheadswitchflip",
          "smash"
        ],
        "mirror": true
      },
      {
        "name": "special",
        "degrees": 17,
        "validWhen": [
          "switchflip",
          "overheadswitchflip"
        ],
        "mirror": true
      },
      {
        "name": "smash",
        "degrees": 38,
        "validWhen": [
          "smash",
          "swing"
        ]
      },
      {
        "name": "air-down",
        "degrees": 38,
        "validWhen": [
          "swing"
        ]
      },
      {
        "name": "spike-forward",
        "degrees": 71,
        "validWhen": [
          "spike"
        ]
      },
      {
        "name": "spike-backward",
        "degrees": 109,
        "validWhen": [
          "spike"
        ]
      }
    ]
  },
  "Candyman": {
    "color": "gold",
    "strokeColor": "brown",
    "candyballStrokeColor": "yellow",
    "img_name": "candy",
    "baseHeight": 152,
    "poses": [
      {
        "name": "swing",
        "imgSize": [
          203,
          162
        ],
        "hurtboxes": [
          [
            49,
            6,
            60,
            152
          ]
        ],
        "hitboxes": [
          [
            74,
            6,
            124,
            152
          ]
        ]
      },
      {
        "name": "smash",
        "imgSize": [
          192,
          229
        ],
        "hurtboxes": [
          [
            44,
            73,
            60,
            152
          ]
        ],
        "hitboxes": [
          [
            19,
            3,
            110,
            70
          ],
          [
            69,
            73,
            124,
            152
          ]
        ]
      },
      {
        "name": "spike",
        "imgSize": [
          150,
          264
        ],
        "hurtboxes": [
          [
            51,
            5,
            60,
            152
          ]
        ],
        "hitboxes": [
          [
            20,
            91,
            121,
            170
          ]
        ]
      },
      {
        "name": "bunt",
        "imgSize": [
          224,
          201
        ],
        "hurtboxes": [
          [
            71,
            44,
            60,
            152
          ]
        ],
        "hitboxes": [
          [
            131,
            4,
            90,
            78
          ],
          [
            95,
            82,
            126,
            114
          ]
        ]
      },
      {
        "name": "grab",
        "imgSize": [
          178,
          164
        ],
        "hurtboxes": [
          [
            27,
            3,
            60,
            152
          ]
        ],
        "hitboxes": [
          [
            52,
            3,
            124,
            152
          ]
        ],
        "canMirror": true,
        "fixedRelease": [
          110,
          76
        ]
      },
      {
        "name": "stand",
        "imgSize": [
          100,
          171
        ],
        "hurtboxes": [
          [
            25,
            11,
            60,
            152
          ]
        ],
        "hitboxes": []
      },
      {
        "name": "halfcrouch",
        "imgSize": [
          157,
          119
        ],
        "hurtboxes": [
          [
            42,
            1,
            60,
            110
          ]
        ],
        "hitboxes": [],
        "grounded": true,
        "groundOffset": 0
      },
      {
        "name": "crouch",
        "imgSize": [
          162,
          92
        ],
        "hurtboxes": [
          [
            35,
            4,
            80,
            74
          ]
        ],
        "hitboxes": [],
        "grounded": true,
        "groundOffset": 0
      },
      {
        "name": "lay",
        "imgSize": [
          167,
          100
        ],
        "hurtboxes": [
          [
            6,
            32,
            152,
            45
          ]
        ],
        "hitboxes": [],
        "grounded": true,
        "groundOffset": 14
      },
      {
        "name": "blaze",
        "imgSize": [
          400,
          352
        ],
        "hurtboxes": [
          [
            170,
            176,
            60,
            152
          ]
        ],
        "hitboxes": [
          [
            0,
            0,
            400,
            400
          ]
        ],
        "circle": true,
        "grounded": true,
        "groundOffset": 0
      }
    ],
    "angles": [
      {
        "name": "up",
        "degrees": -25,
        "validWhen": [
          "swing",
          "smash"
        ]
      },
      {
        "name": "ground-down",
        "degrees": 55,
        "validWhen": [
          "swing"
        ]
      },
      {
        "name": "smash",
        "degrees": 70,
        "validWhen": [
          "smash"
        ],
        "customOffset": 90
      },
      {
        "name": "air-down",
        "degrees": 8,
        "validWhen": [
          "swing",
          "smash"
        ],
        "customOffset": 110
      },
      {
        "name": "spike-forward",
        "degrees": 25,
        "validWhen": [
          "spike"
        ]
      },
      {
        "name": "spike-backward",
        "degrees": -105,
        "validWhen": [
          "spike"
        ]
      }
    ]
  },
  "Sonata": {
    "color": "#3349cb",
    "strokeColor": "darkviolet",
    "sonataSpecialStrokeColor": "violet",
    "img_name": "sonata",
    "baseHeight": 140,
    "poses": [
      {
        "name": "swing",
        "imgSize": [
          209,
          150
        ],
        "hurtboxes": [
          [
            55,
            3,
            60,
            140
          ]
        ],
        "hitboxes": [
          [
            80,
            3,
            124,
            140
          ]
        ]
      },
      {
        "name": "smash",
        "imgSize": [
          232,
          227
        ],
        "hurtboxes": [
          [
            77,
            79,
            60,
            140
          ]
        ],
        "hitboxes": [
          [
            52,
            11,
            110,
            68
          ],
          [
            102,
            79,
            124,
            140
          ]
        ]
      },
      {
        "name": "spike",
        "imgSize": [
          147,
          279
        ],
        "hurtboxes": [
          [
            34,
            27,
            60,
            140
          ]
        ],
        "hitboxes": [
          [
            4,
            107,
            121,
            170
          ]
        ]
      },
      {
        "name": "bunt",
        "imgSize": [
          206,
          191
        ],
        "hurtboxes": [
          [
            53,
            43,
            60,
            140
          ]
        ],
        "hitboxes": [
          [
            113,
            3,
            89,
            74
          ],
          [
            78,
            77,
            124,
            106
          ]
        ]
      },
      {
        "name": "grab",
        "imgSize": [
          226,
          189
        ],
        "hurtboxes": [
          [
            69,
            41,
            60,
            140
          ]
        ],
        "hitboxes": [
          [
            94,
            41,
            124,
            140
          ]
        ],
        "canMirror": true,
        "fixedRelease": [
          110,
          70
        ]
      },
      {
        "name": "stand",
        "imgSize": [
          152,
          188
        ],
        "hurtboxes": [
          [
            11,
            40,
            60,
            140
          ]
        ],
        "hitboxes": []
      },
      {
        "name": "halfcrouch",
        "imgSize": [
          199,
          144
        ],
        "hurtboxes": [
          [
            52,
            28,
            60,
            104
          ]
        ],
        "hitboxes": [],
        "grounded": true,
        "groundOffset": 0
      },
      {
        "name": "crouch",
        "imgSize": [
          187,
          107
        ],
        "hurtboxes": [
          [
            34,
            29,
            80,
            70
          ]
        ],
        "hitboxes": [],
        "grounded": true,
        "groundOffset": 0
      },
      {
        "name": "lay",
        "imgSize": [
          221,
          74
        ],
        "hurtboxes": [
          [
            52,
            3,
            140,
            45
          ]
        ],
        "hitboxes": [],
        "grounded": true,
        "groundOffset": 8
      },
      {
        "name": "blaze",
        "imgSize": [
          400,
          352
        ],
        "hurtboxes": [
          [
            170,
            188,
            60,
            140
          ]
        ],
        "hitboxes": [
          [
            0,
            0,
            400,
            400
          ]
        ],
        "circle": true,
        "grounded": true,
        "groundOffset": 0
      }
    ],
    "specialButtonsCustomOffset": 42,
    "sonataSpecialSteps": [],
    "specialAngles": [
      {
        "name": "special-up",
        "degrees": -45,
        "validWhen": [
          "swing",
          "smash",
          "spike"
        ],
        "maxDistance": 320,
        "validForStep": [
          1,
          2,
          3
        ]
      },
      {
        "name": "special-down",
        "degrees": 45,
        "validWhen": [
          "swing",
          "smash",
          "spike"
        ],
        "maxDistance": 320,
        "validForStep": [
          1,
          2,
          3
        ]
      },
      {
        "name": "special-forward",
        "degrees": 0,
        "validWhen": [
          "swing",
          "smash",
          "spike"
        ],
        "maxDistance": 320,
        "maxReflections": 2,
        "validForStep": [
          1,
          2,
          3
        ]
      },
      {
        "name": "special-backward",
        "degrees": -180,
        "validWhen": [
          "swing",
          "smash",
          "spike"
        ],
        "maxDistance": 320,
        "maxReflections": 2,
        "validForStep": [
          2,
          3
        ]
      },
      {
        "name": "special-up-backward",
        "degrees": -135,
        "validWhen": [
          "swing",
          "smash",
          "spike"
        ],
        "maxDistance": 320,
        "validForStep": [
          2,
          3
        ]
      },
      {
        "name": "special-down-backward",
        "degrees": 135,
        "validWhen": [
          "swing",
          "smash",
          "spike"
        ],
        "maxDistance": 320,
        "validForStep": [
          2,
          3
        ]
      },
      {
        "name": "bring-it",
        "degrees": 90,
        "validWhen": [
          "swing",
          "smash",
          "spike"
        ],
        "maxDistance": 320,
        "maxReflections": 2,
        "validForStep": [
          3
        ]
      },
      {
        "name": "nice",
        "degrees": -90,
        "validWhen": [
          "swing",
          "smash",
          "spike"
        ],
        "maxDistance": 320,
        "maxReflections": 2,
        "validForStep": [
          3
        ]
      }
    ],
    "angles": [
      {
        "name": "up",
        "degrees": -20,
        "validWhen": [
          "swing"
        ]
      },
      {
        "name": "smash",
        "degrees": 55,
        "validWhen": [
          "swing",
          "smash",
          "spike"
        ]
      },
      {
        "name": "air-down",
        "degrees": 55,
        "validWhen": [
          "swing"
        ]
      },
      {
        "name": "ground-down",
        "degrees": 55,
        "validWhen": [
          "swing"
        ]
      },
      {
        "name": "spike-forward",
        "degrees": 55,
        "validWhen": [
          "spike"
        ]
      },
      {
        "name": "spike-backward",
        "degrees": -165,
        "validWhen": [
          "spike"
        ]
      }
    ]
  },
  "Dice": {
    "color": "saddlebrown",
    "strokeColor": "#c8de0a",
    "img_name": "dice",
    "baseHeight": 148,
    "poses": [
      {
        "name": "swing",
        "imgSize": [
          190,
          166
        ],
        "hurtboxes": [
          [
            36,
            9,
            60,
            148
          ]
        ],
        "hitboxes": [
          [
            61,
            9,
            124,
            148
          ]
        ]
      },
      {
        "name": "smash",
        "imgSize": [
          200,
          215
        ],
        "hurtboxes": [
          [
            50,
            66,
            60,
            148
          ]
        ],
        "hitboxes": [
          [
            25,
            2,
            110,
            64
          ],
          [
            75,
            66,
            124,
            148
          ]
        ]
      },
      {
        "name": "spike",
        "imgSize": [
          187,
          264
        ],
        "hurtboxes": [
          [
            58,
            4,
            60,
            148
          ]
        ],
        "hitboxes": [
          [
            28,
            88,
            120,
            170
          ]
        ]
      },
      {
        "name": "bunt",
        "imgSize": [
          187,
          199
        ],
        "hurtboxes": [
          [
            34,
            45,
            60,
            148
          ]
        ],
        "hitboxes": [
          [
            94,
            5,
            89,
            77
          ],
          [
            59,
            82,
            124,
            111
          ]
        ]
      },
      {
        "name": "grab",
        "imgSize": [
          194,
          160
        ],
        "hurtboxes": [
          [
            43,
            7,
            60,
            148
          ]
        ],
        "hitboxes": [
          [
            68,
            7,
            124,
            148
          ]
        ],
        "canMirror": true,
        "fixedRelease": [
          110,
          74
        ]
      },
      {
        "name": "stand",
        "imgSize": [
          77,
          162
        ],
        "hurtboxes": [
          [
            5,
            8,
            60,
            148
          ]
        ],
        "hitboxes": []
      },
      {
        "name": "halfcrouch",
        "imgSize": [
          82,
          124
        ],
        "hurtboxes": [
          [
            4,
            3,
            60,
            110
          ]
        ],
        "hitboxes": [],
        "grounded": true,
        "groundOffset": 0
      },
      {
        "name": "crouch",
        "imgSize": [
          105,
          104
        ],
        "hurtboxes": [
          [
            9,
            23,
            80,
            74
          ]
        ],
        "hitboxes": [],
        "grounded": true,
        "groundOffset": 0
      },
      {
        "name": "lay",
        "imgSize": [
          171,
          72
        ],
        "hurtboxes": [
          [
            8,
            2,
            148,
            45
          ]
        ],
        "hitboxes": [],
        "grounded": true,
        "groundOffset": 12
      },
      {
        "name": "blaze",
        "imgSize": [
          400,
          400
        ],
        "hurtboxes": [
          [
            170,
            180,
            60,
            148
          ]
        ],
        "hitboxes": [
          [
            0,
            0,
            400,
            400
          ]
        ],
        "circle": true,
        "grounded": true,
        "groundOffset": 0
      }
    ],
    "angles": [
      {
        "name": "up",
        "degrees": -80,
        "validWhen": [
          "swing"
        ]
      },
      {
        "name": "air-down",
        "degrees": 46,
        "validWhen": [
          "swing"
        ]
      },
      {
        "name": "ground-down",
        "degrees": 46,
        "validWhen": [
          "swing"
        ]
      },
      {
        "name": "smash",
        "degrees": 30,
        "validWhen": [
          "smash"
        ]
      },
      {
        "name": "spike-forward",
        "degrees": 80,
        "validWhen": [
          "spike"
        ]
      },
      {
        "name": "spike-backward",
        "degrees": 110,
        "validWhen": [
          "spike"
        ]
      },
      {
        "name": "spin",
        "degrees": -45,
        "validWhen": [
          "swing",
          "smash",
          "spike"
        ],
        "pong": true,
        "initialSpeed": 34,
        "pongStep": 2,
        "turnRate": 4.2,
        "maxReflections": 1,
        "customOffset": 115
      },
      {
        "name": "spin-up",
        "degrees": 275,
        "validWhen": [
          "swing",
          "smash",
          "spike"
        ],
        "pong": true,
        "initialSpeed": 34,
        "pongStep": 2,
        "turnRate": 5.25,
        "maxReflections": 1,
        "customOffset": 115
      },
      {
        "name": "spin-down",
        "degrees": 0,
        "validWhen": [
          "swing",
          "smash",
          "spike"
        ],
        "pong": true,
        "initialSpeed": 34,
        "pongStep": 2,
        "turnRate": 4,
        "maxReflections": 1,
        "customOffset": 115
      },
      {
        "name": "spin-back",
        "degrees": 260,
        "validWhen": [
          "swing",
          "smash",
          "spike"
        ],
        "pong": true,
        "initialSpeed": 34,
        "pongStep": 2,
        "turnRate": 6,
        "maxReflections": 1,
        "customOffset": 115
      }
    ],
    "specialPongFloorAngles": [
      {
        "name": "floor-pong-backward",
        "degrees": -172,
        "validWhen": [],
        "customOffset": 37,
        "pongFollowup": true
      },
      {
        "name": "floor-pong-forward",
        "degrees": -8,
        "validWhen": [],
        "customOffset": 37,
        "pongFollowup": true
      },
      {
        "name": "floor-pong-upward",
        "degrees": -90,
        "validWhen": [],
        "customOffset": 37,
        "pongFollowup": true,
        "maxReflections": 1
      }
    ],
    "specialPongAngles": [
      {
        "name": "floor-pong",
        "degrees": -172,
        "validWhen": [],
        "customOffset": 37,
        "pongWallFollowup": true
      },
      {
        "name": "floor-pong",
        "degrees": -8,
        "validWhen": [],
        "customOffset": 37,
        "pongWallFollowup": true
      },
      {
        "name": "ceiling-pong",
        "degrees": 135,
        "validWhen": [],
        "customOffset": 37,
        "pongWallFollowup": true
      },
      {
        "name": "ceiling-pong",
        "degrees": 45,
        "validWhen": [],
        "customOffset": 37,
        "pongWallFollowup": true
      },
      {
        "name": "ceiling-glitch",
        "degrees": 172,
        "validWhen": [],
        "customOffset": 66,
        "pongWallFollowup": true
      },
      {
        "name": "ceiling-glitch",
        "degrees": 8,
        "validWhen": [],
        "customOffset": 66,
        "pongWallFollowup": true
      }
    ]
  },
  "DustAndAshes": {
    "color": "#5d68b3",
    "strokeColor": "#23da7d",
    "img_name": "dust",
    "baseHeight": 142,
    "ashesSpecial": [
      {
        "enabled": false,
        "direction": -1
      },
      {
        "enabled": false,
        "direction": 1
      }
    ],
    "poses": [
      {
        "name": "swing",
        "imgSize": [
          243,
          150
        ],
        "hurtboxes": [
          [
            85,
            2,
            60,
            142
          ]
        ],
        "hitboxes": [
          [
            115,
            2,
            124,
            142
          ]
        ]
      },
      {
        "name": "smash",
        "imgSize": [
          256,
          250
        ],
        "hurtboxes": [
          [
            100,
            92,
            60,
            142
          ]
        ],
        "hitboxes": [
          [
            75,
            7,
            110,
            85
          ],
          [
            130,
            92,
            124,
            142
          ]
        ]
      },
      {
        "name": "spike",
        "imgSize": [
          145,
          256
        ],
        "hurtboxes": [
          [
            42,
            2,
            60,
            142
          ]
        ],
        "hitboxes": [
          [
            12,
            83,
            120,
            170
          ]
        ]
      },
      {
        "name": "bunt",
        "imgSize": [
          175,
          198
        ],
        "hurtboxes": [
          [
            29,
            47,
            60,
            142
          ]
        ],
        "hitboxes": [
          [
            89,
            7,
            80,
            75
          ],
          [
            59,
            82,
            110,
            107
          ]
        ]
      },
      {
        "name": "grab",
        "imgSize": [
          192,
          162
        ],
        "hurtboxes": [
          [
            42,
            11,
            60,
            142
          ]
        ],
        "hitboxes": [
          [
            72,
            11,
            110,
            142
          ]
        ],
        "canMirror": true,
        "fixedRelease": [
          110,
          51
        ]
      },
      {
        "name": "stand",
        "imgSize": [
          92,
          158
        ],
        "hurtboxes": [
          [
            9,
            4,
            60,
            142
          ]
        ],
        "hitboxes": []
      },
      {
        "name": "halfcrouch",
        "imgSize": [
          145,
          124
        ],
        "hurtboxes": [
          [
            33,
            4,
            60,
            96
          ]
        ],
        "hitboxes": [],
        "grounded": true,
        "groundOffset": 0
      },
      {
        "name": "crouch",
        "imgSize": [
          158,
          88
        ],
        "hurtboxes": [
          [
            28,
            2,
            80,
            64
          ]
        ],
        "hitboxes": [],
        "grounded": true,
        "groundOffset": 0
      },
      {
        "name": "lay",
        "imgSize": [
          167,
          72
        ],
        "hurtboxes": [
          [
            8,
            2,
            142,
            45
          ]
        ],
        "hitboxes": [],
        "grounded": true,
        "groundOffset": 8
      },
      {
        "name": "blaze",
        "imgSize": [
          400,
          352
        ],
        "hurtboxes": [
          [
            170,
            186,
            60,
            142
          ]
        ],
        "hitboxes": [
          [
            0,
            0,
            400,
            400
          ]
        ],
        "circle": true,
        "grounded": true,
        "groundOffset": 0
      }
    ],
    "angles": [
      {
        "name": "up",
        "degrees": -15,
        "validWhen": [
          "swing"
        ],
        "customOffset": 100
      },
      {
        "name": "air-down",
        "degrees": 21,
        "validWhen": [
          "swing"
        ],
        "customOffset": 100
      },
      {
        "name": "ground-down",
        "degrees": 57,
        "validWhen": [
          "swing"
        ],
        "customOffset": 100
      },
      {
        "name": "smash",
        "degrees": 33,
        "validWhen": [
          "smash"
        ],
        "customOffset": 100
      },
      {
        "name": "spike-forward",
        "degrees": 44,
        "validWhen": [
          "spike"
        ],
        "customOffset": 100
      },
      {
        "name": "spike-backward",
        "degrees": 163,
        "validWhen": [
          "spike"
        ],
        "customOffset": 100
      }
    ],
    "ashesPoses": [
      {
        "name": "swing",
        "imgSize": [
          190,
          104
        ],
        "hurtboxes": [
          [
            102,
            83,
            20,
            20
          ]
        ],
        "hitboxes": [
          [
            167,
            3,
            20,
            20
          ]
        ],
        "canMirror": true,
        "ashesRelease": [
          65,
          -80
        ]
      }
    ],
    "specialAngles": [
      {
        "name": "up",
        "degrees": -45,
        "validWhen": [
          "swing"
        ],
        "customOffset": 80,
        "mirror": true
      },
      {
        "name": "air-down",
        "degrees": 21,
        "validWhen": [
          "swing"
        ],
        "customOffset": 80,
        "mirror": true
      },
      {
        "name": "ground-down",
        "degrees": 57,
        "validWhen": [
          "swing"
        ],
        "customOffset": 80,
        "mirror": true
      },
      {
        "name": "straight",
        "degrees": 0,
        "validWhen": [
          "swing"
        ],
        "customOffset": 80,
        "maxReflections": 2,
        "mirror": true
      }
    ]
  }
} as const satisfies Record<string, Character>;
