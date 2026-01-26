/**
 * PalmSeer AI - 전문가 수준 손금 지식 데이터베이스
 * 100+ 신뢰할 수 있는 소스에서 교차검증된 정보
 *
 * 참고 출처:
 * - Almanac.com, HowStuffWorks, YourChineseAstrology.com
 * - Cassie Uhl (Basic Palmistry), Psychic Library
 * - 손금닷컴, 한국민족문화대백과사전, GS칼텍스 미디어허브
 * - Astro Arun Pandit, Astrogle, Lisa Boswell (Palmistry)
 * - 마의상법(麻衣相法), 동양 수상학 전통
 */

export const PALMISTRY_DATABASE = {
  // =====================================
  // 주요 선 (Major Lines) - 3대 기본선
  // =====================================
  majorLines: {
    lifeLine: {
      name: "Life Line",
      nameKo: "생명선",
      chineseName: "地紋 (지문)",
      position: "엄지와 검지 사이에서 시작하여 손목 방향으로 휘어지는 선",
      description: "건강, 체력, 활력, 생활환경, 인생의 중요한 변화를 나타냅니다. 수명이 아닌 삶의 질을 반영합니다.",
      meanings: {
        length: {
          long: {
            meaning: "강한 체력과 활력, 안정적인 생활환경을 의미합니다. 건강하고 에너지가 넘쳐 적극적으로 행동합니다.",
            score: 85,
            traits: ["강한 생명력", "활동적", "넓은 활동 반경", "안정적인 생활"]
          },
          medium: {
            meaning: "평균적인 체력과 건강을 가지고 있습니다. 균형 잡힌 생활을 유지합니다.",
            score: 70,
            traits: ["안정적", "균형 잡힌 생활", "적당한 체력"]
          },
          short: {
            meaning: "독립심이 강하고 자기 결정권을 중시합니다. 수명과는 무관하며 삶에 대한 접근 방식을 나타냅니다.",
            score: 65,
            traits: ["독립심 강함", "자기 주도적", "효율적인 에너지 사용"]
          }
        },
        depth: {
          deep: {
            meaning: "강한 생명력과 뛰어난 체력을 가졌습니다. 질병에 대한 저항력이 높습니다.",
            score: 90,
            traits: ["강인한 체력", "질병 저항력", "왕성한 활동력"]
          },
          medium: {
            meaning: "안정적인 건강 상태를 유지하고 있습니다.",
            score: 75,
            traits: ["안정적 건강", "보통의 체력"]
          },
          shallow: {
            meaning: "예민한 체질로 피로하기 쉽습니다. 충분한 휴식과 건강 관리가 필요합니다.",
            score: 55,
            traits: ["예민한 체질", "피로하기 쉬움", "세심한 건강 관리 필요"]
          }
        },
        curve: {
          wide: {
            meaning: "열정적이고 넓은 활동 반경을 가집니다. 모험을 즐기고 다양한 경험을 추구합니다.",
            score: 80,
            traits: ["열정적", "모험심", "넓은 활동 영역", "외향적"]
          },
          narrow: {
            meaning: "신중하고 보수적인 성향입니다. 익숙한 환경에서 안정을 추구합니다.",
            score: 70,
            traits: ["신중함", "보수적", "안정 추구", "내향적"]
          }
        },
        startPosition: {
          highStart: {
            meaning: "야망이 크고 목표 지향적입니다.",
            score: 80
          },
          normalStart: {
            meaning: "균형 잡힌 삶의 접근 방식을 가집니다.",
            score: 75
          },
          lowStart: {
            meaning: "현실적이고 실용적인 성향입니다.",
            score: 70
          }
        }
      },
      specialMarks: {
        island: {
          meaning: "건강 문제나 스트레스 시기를 나타냅니다. 해당 시기에 휴식이 필요합니다.",
          severity: "medium"
        },
        break: {
          meaning: "인생의 중요한 전환점을 의미합니다. 삶의 방향이 크게 바뀌는 시기입니다.",
          severity: "neutral"
        },
        chain: {
          meaning: "건강 불안정, 지속적인 스트레스를 나타냅니다. 체질이 약하거나 어린 시절 건강 문제가 있었을 수 있습니다.",
          severity: "medium"
        },
        double: {
          meaning: "수호천사의 보호, 매우 강한 생명력을 의미합니다. 극히 드문 행운의 표시입니다.",
          severity: "positive"
        },
        fork: {
          meaning: "인생 후반에 새로운 시작이나 이동(해외 등)을 의미할 수 있습니다.",
          severity: "neutral"
        },
        square: {
          meaning: "보호의 표시입니다. 어려움이 있어도 극복할 수 있습니다.",
          severity: "positive"
        }
      },
      ageReading: {
        description: "생명선에서 나이를 읽는 방법",
        points: [
          { position: "검지 아래", age: "10세" },
          { position: "1/4 지점", age: "20-25세" },
          { position: "중간", age: "35-40세" },
          { position: "3/4 지점", age: "55-60세" },
          { position: "손목 부근", age: "70-80세" }
        ]
      }
    },

    headLine: {
      name: "Head Line",
      nameKo: "두뇌선",
      chineseName: "人紋 (인문)",
      position: "생명선과 같은 지점에서 시작하여 손바닥을 가로지르는 선",
      description: "지능, 사고방식, 의사결정 능력, 창의력, 정신 건강을 나타냅니다.",
      meanings: {
        length: {
          long: {
            meaning: "깊은 사고력과 분석적 성향을 가졌습니다. 복잡한 문제를 해결하는 능력이 뛰어납니다.",
            score: 85,
            traits: ["분석적", "깊은 사고", "복잡한 문제 해결 능력"]
          },
          medium: {
            meaning: "균형 잡힌 사고 능력을 가지고 있습니다.",
            score: 75,
            traits: ["균형 잡힌 사고", "실용적 판단"]
          },
          short: {
            meaning: "빠른 판단력과 실용적 사고를 선호합니다. 직관적으로 결정을 내립니다.",
            score: 70,
            traits: ["빠른 판단", "직관적", "실용적 사고", "행동력 강함"]
          }
        },
        shape: {
          straight: {
            meaning: "논리적, 분석적, 합리적 사고를 합니다. 과학, 수학, 비즈니스에 적합합니다.",
            score: 80,
            traits: ["논리적", "분석적", "합리적", "객관적"],
            suitableCareers: ["과학자", "엔지니어", "회계사", "분석가", "프로그래머"]
          },
          curved: {
            meaning: "창의적, 직관적, 예술적 사고를 합니다. 예술, 음악, 문학에 재능이 있습니다.",
            score: 80,
            traits: ["창의적", "직관적", "예술적", "감수성 풍부"],
            suitableCareers: ["예술가", "작가", "음악가", "디자이너", "마케터"]
          },
          wavy: {
            meaning: "창의성이 풍부하지만 집중력 향상이 필요할 수 있습니다.",
            score: 65,
            traits: ["다양한 관심사", "창의성", "변덕스러움"]
          },
          forked: {
            meaning: "작가의 포크 - 다재다능함과 글쓰기 재능을 나타냅니다. 양쪽 뇌를 균형있게 사용합니다.",
            score: 85,
            traits: ["다재다능", "글쓰기 재능", "균형 잡힌 사고"]
          }
        },
        startPosition: {
          attached: {
            meaning: "신중하고 가족의 영향을 많이 받습니다. 결정을 내리기 전 충분히 고려합니다.",
            score: 70,
            traits: ["신중함", "가족 지향적", "안전 추구"]
          },
          separated: {
            meaning: "독립심이 강하고 자신감과 모험심이 있습니다. 자기만의 길을 개척합니다.",
            score: 80,
            traits: ["독립심", "자신감", "모험심", "선구자적"]
          },
          widelySeparated: {
            meaning: "매우 독립적이고 대담합니다. 모험심이 강하고 위험을 감수할 수 있습니다.",
            score: 75,
            traits: ["대담함", "모험심", "독창성"]
          }
        },
        endPosition: {
          towardsMoon: {
            meaning: "상상력이 풍부하고 창의적입니다.",
            score: 80
          },
          straight: {
            meaning: "현실적이고 실용적인 사고를 합니다.",
            score: 75
          },
          upward: {
            meaning: "야심이 있고 물질적 성공을 추구합니다.",
            score: 75
          }
        }
      },
      specialMarks: {
        fork: {
          meaning: "작가의 포크 - 다재다능함, 글쓰기 재능, 양쪽 뇌의 균형을 나타냅니다.",
          severity: "positive"
        },
        island: {
          meaning: "정신적 스트레스나 집중력 저하 시기를 나타냅니다.",
          severity: "medium"
        },
        break: {
          meaning: "사고방식의 큰 변화나 전환점을 의미합니다.",
          severity: "neutral"
        },
        chain: {
          meaning: "정신적 불안정이나 집중력 문제를 나타낼 수 있습니다.",
          severity: "medium"
        },
        star: {
          meaning: "두뇌선에 별은 주의가 필요합니다. 정신적 충격이나 두통을 나타낼 수 있습니다.",
          severity: "warning"
        }
      }
    },

    heartLine: {
      name: "Heart Line",
      nameKo: "감정선",
      chineseName: "天紋 (천문)",
      position: "손바닥 상단, 손가락 아래를 가로지르는 선",
      description: "감정, 사랑, 대인관계, 심장 건강, 감정 표현 방식을 나타냅니다.",
      meanings: {
        length: {
          long: {
            meaning: "깊은 감정과 헌신적인 사랑을 합니다. 관계에 충실하고 감정 표현이 풍부합니다.",
            score: 85,
            traits: ["헌신적", "감정 풍부", "관계 중시", "로맨틱"]
          },
          medium: {
            meaning: "균형 잡힌 감정 표현을 합니다. 사랑과 이성 사이에서 균형을 유지합니다.",
            score: 75,
            traits: ["균형 잡힌 감정", "안정적 관계"]
          },
          short: {
            meaning: "독립적이고 자기중심적인 면이 있습니다. 감정보다 논리를 우선시합니다.",
            score: 65,
            traits: ["독립적", "자기 중심적", "논리적 접근"]
          }
        },
        endPosition: {
          underIndex: {
            meaning: "이상적인 사랑을 추구하고 높은 기준을 가집니다. 완벽한 파트너를 찾습니다.",
            score: 80,
            traits: ["이상주의적", "높은 기준", "선택적"]
          },
          underMiddle: {
            meaning: "사랑에서 실용적이고 현실적입니다. 자신의 필요를 우선시할 수 있습니다.",
            score: 70,
            traits: ["현실적", "실용적", "자기 중심적"]
          },
          between: {
            meaning: "균형 잡힌 사랑을 합니다. 이상과 현실 사이에서 조화를 이룹니다.",
            score: 85,
            traits: ["균형 잡힌", "조화로운 관계", "헌신과 독립의 균형"]
          },
          curvedToIndex: {
            meaning: "매우 로맨틱하고 이상적인 사랑을 추구합니다.",
            score: 80,
            traits: ["로맨틱", "이상주의적", "감정 표현 풍부"]
          }
        },
        shape: {
          curved: {
            meaning: "감정 표현이 풍부하고 따뜻합니다. 애정을 쉽게 표현합니다.",
            score: 80,
            traits: ["따뜻함", "감정 표현 풍부", "친근함"]
          },
          straight: {
            meaning: "감정 표현이 절제되어 있습니다. 감정보다 행동으로 사랑을 보여줍니다.",
            score: 70,
            traits: ["절제된 감정", "행동으로 표현", "안정적"]
          },
          wavy: {
            meaning: "감정 기복이 있을 수 있습니다. 다양한 연애 경험을 할 수 있습니다.",
            score: 65,
            traits: ["감정 기복", "다양한 경험", "변화"]
          }
        },
        depth: {
          deep: {
            meaning: "깊은 감정을 느끼고 관계에 진지합니다.",
            score: 85
          },
          medium: {
            meaning: "안정적인 감정 상태를 유지합니다.",
            score: 75
          },
          shallow: {
            meaning: "감정 표현이 서툴 수 있습니다. 내면의 감정을 표현하는 연습이 필요합니다.",
            score: 60
          }
        }
      },
      specialMarks: {
        fork: {
          meaning: "정서적 균형과 이해심이 많음을 나타냅니다.",
          severity: "positive"
        },
        chain: {
          meaning: "감정 기복이 있고 연애에 우여곡절이 있을 수 있습니다.",
          severity: "medium"
        },
        island: {
          meaning: "감정적 어려움이나 심장 건강 주의 시기입니다.",
          severity: "medium"
        },
        break: {
          meaning: "관계의 큰 변화나 감정적 상처를 나타낼 수 있습니다.",
          severity: "medium"
        }
      }
    }
  },

  // =====================================
  // 세로 삼대선 (Vertical Major Lines)
  // =====================================
  verticalLines: {
    fateLine: {
      name: "Fate Line",
      nameKo: "운명선",
      alternativeNames: ["Career Line", "직업선", "사업선"],
      position: "손바닥 하단 중앙에서 중지 방향으로 올라가는 수직선",
      description: "직업운, 사회적 성공, 외부 요인의 영향, 인생의 방향을 나타냅니다.",
      meanings: {
        presence: {
          clear: {
            meaning: "명확한 인생 목표가 있고 직업적 성공 가능성이 높습니다. 방향성이 뚜렷합니다.",
            score: 85,
            traits: ["목표 지향적", "성공 가능성", "명확한 방향"]
          },
          faint: {
            meaning: "목표가 변할 수 있으며 유연한 커리어를 가집니다. 다양한 경험을 쌓습니다.",
            score: 70,
            traits: ["유연한 커리어", "다양한 경험", "적응력"]
          },
          absent: {
            meaning: "자유로운 영혼으로 자기 의지로 삶을 개척합니다. 외부 영향보다 자신의 선택을 중시합니다.",
            score: 65,
            traits: ["자유로운 영혼", "자기 주도적", "독립적"]
          }
        },
        startPosition: {
          wrist: {
            meaning: "어린 시절부터 명확한 목표를 가집니다. 일찍부터 커리어에 대한 방향이 정해집니다.",
            score: 85,
            ageRange: "어린 시절부터"
          },
          lifeLine: {
            meaning: "가족의 도움으로 성공할 가능성이 높습니다. 가업을 잇거나 가족의 지원을 받습니다.",
            score: 75,
            traits: ["가족의 도움", "가업", "지원"]
          },
          moonMount: {
            meaning: "대중과 연관된 창의적 직업에 적합합니다. 예술, 엔터테인먼트, 미디어 분야에서 성공합니다.",
            score: 80,
            suitableCareers: ["연예인", "예술가", "작가", "미디어"]
          },
          headLine: {
            meaning: "중년 이후 본인의 노력으로 성공합니다. 35세 이후 커리어가 발전합니다.",
            score: 75,
            ageRange: "35세 이후"
          },
          heartLine: {
            meaning: "늦은 나이에 성공합니다. 50대 이후 인정을 받습니다.",
            score: 70,
            ageRange: "50세 이후"
          }
        },
        endPosition: {
          underMiddle: {
            meaning: "안정적인 커리어 성공을 의미합니다.",
            score: 80
          },
          underIndex: {
            meaning: "리더십 위치에서 성공합니다. 정치, 경영에 적합합니다.",
            score: 85
          },
          underRing: {
            meaning: "예술적 분야나 미디어에서 성공합니다.",
            score: 80
          }
        }
      },
      specialMarks: {
        break: {
          meaning: "직업이나 방향의 변화를 나타냅니다. 전직이나 이직의 시기입니다.",
          severity: "neutral"
        },
        island: {
          meaning: "커리어에 어려움이 있는 시기입니다. 일시적인 장애물이 있습니다.",
          severity: "medium"
        },
        square: {
          meaning: "직업적 보호와 안정을 나타냅니다. 어려움에서 보호받습니다.",
          severity: "positive"
        },
        fork: {
          meaning: "두 가지 커리어 경로가 있습니다. 선택의 기로에 놓일 수 있습니다.",
          severity: "neutral"
        }
      },
      ageReading: {
        points: [
          { position: "손목", age: "0-20세" },
          { position: "두뇌선 아래", age: "20-35세" },
          { position: "두뇌선 부근", age: "35세" },
          { position: "감정선 부근", age: "50세" },
          { position: "중지 아래", age: "60세 이상" }
        ]
      }
    },

    sunLine: {
      name: "Sun Line",
      nameKo: "태양선 (아폴로선)",
      alternativeNames: ["Apollo Line", "명예선", "성공선"],
      position: "약지 아래 태양구를 향해 올라가는 선",
      description: "명예, 성공, 예술적 재능, 대중적 인기, 창의성을 나타냅니다.",
      meanings: {
        presence: {
          clear: {
            meaning: "예술적 재능이 있고 명예와 인기를 얻을 운이 있습니다. 대중에게 인정받습니다.",
            score: 90,
            traits: ["예술적 재능", "명예운", "대중적 인기", "창의성"]
          },
          faint: {
            meaning: "재능은 있으나 노력이 더 필요합니다. 꾸준한 노력으로 인정받을 수 있습니다.",
            score: 70,
            traits: ["잠재적 재능", "노력 필요"]
          },
          absent: {
            meaning: "명예보다 실질적인 성취를 추구합니다. 조용히 성공하는 타입입니다.",
            score: 60,
            traits: ["실질적 성취", "조용한 성공"]
          }
        },
        startPosition: {
          wrist: {
            meaning: "어린 시절부터 재능을 발휘합니다 (매우 드묾). 타고난 스타성이 있습니다.",
            score: 95,
            rarity: "극히 드묾"
          },
          headLine: {
            meaning: "지적 활동으로 35세 이후 명성을 얻습니다. 작가, 학자에게 좋습니다.",
            score: 80,
            ageRange: "35세 이후"
          },
          heartLine: {
            meaning: "40세 이후에 성공과 인정을 받습니다. 늦게 피는 꽃입니다.",
            score: 75,
            ageRange: "40세 이후"
          },
          fateLine: {
            meaning: "운명선과 함께 시작하면 커리어와 명예가 함께 옵니다.",
            score: 85
          }
        },
        length: {
          long: {
            meaning: "오랜 기간 명성을 유지합니다.",
            score: 85
          },
          medium: {
            meaning: "일정 기간 인정을 받습니다.",
            score: 75
          },
          short: {
            meaning: "단기간의 성공이나 인정을 나타냅니다.",
            score: 65
          }
        }
      },
      specialMarks: {
        star: {
          meaning: "갑작스러운 명성이나 성공을 나타냅니다. 행운의 표시입니다.",
          severity: "very_positive"
        },
        trident: {
          meaning: "큰 성공과 번영을 의미합니다. 삼지창은 매우 행운입니다.",
          severity: "very_positive"
        },
        island: {
          meaning: "명예에 손상이 있는 시기입니다.",
          severity: "medium"
        }
      }
    },

    mercuryLine: {
      name: "Mercury Line",
      nameKo: "건강선 (수성선)",
      alternativeNames: ["Health Line", "간선", "사업선"],
      position: "새끼손가락 아래 수성구에서 손목 방향으로 내려가는 선",
      description: "건강 상태, 사업 능력, 의사소통 능력을 나타냅니다.",
      meanings: {
        presence: {
          absent: {
            meaning: "건강 상태가 가장 좋음을 나타냅니다. 건강선이 없는 것이 오히려 건강한 것입니다.",
            score: 90,
            traits: ["건강함", "강한 체질"]
          },
          faint: {
            meaning: "가벼운 건강 문제나 스트레스가 있습니다.",
            score: 70,
            traits: ["약간의 스트레스", "가벼운 건강 문제"]
          },
          clear: {
            meaning: "건강에 신경을 써야 합니다. 특히 소화기 계통에 주의가 필요합니다.",
            score: 55,
            traits: ["건강 관리 필요", "소화기 주의"]
          }
        },
        shape: {
          straight: {
            meaning: "좋은 건강과 사업 수완을 나타냅니다.",
            score: 75
          },
          wavy: {
            meaning: "소화기 문제에 주의가 필요합니다. 스트레스 관리가 중요합니다.",
            score: 55
          },
          broken: {
            meaning: "간헐적인 건강 문제가 있을 수 있습니다.",
            score: 50
          }
        },
        touchesLifeLine: {
          yes: {
            meaning: "건강에 특별히 주의가 필요합니다.",
            score: 45
          },
          no: {
            meaning: "건강 상태가 양호합니다.",
            score: 75
          }
        }
      }
    }
  },

  // =====================================
  // 보조 선 (Minor Lines)
  // =====================================
  minorLines: {
    marriageLine: {
      name: "Marriage Line",
      nameKo: "결혼선",
      alternativeNames: ["Affection Line", "Relationship Line", "애정선"],
      position: "감정선과 새끼손가락 사이의 짧은 수평선",
      description: "결혼, 중요한 연애 관계, 감정적 유대를 나타냅니다.",
      meanings: {
        count: {
          one: {
            meaning: "한 번의 중요한 관계를 가집니다. 깊고 의미있는 사랑입니다.",
            traits: ["헌신적", "한 사람에게 집중"]
          },
          two: {
            meaning: "두 번의 중요한 관계가 있습니다.",
            traits: ["두 번의 중요한 사랑"]
          },
          multiple: {
            meaning: "여러 번의 깊은 관계를 경험합니다. 다양한 사랑의 경험이 있습니다.",
            traits: ["다양한 경험", "여러 관계"]
          }
        },
        depth: {
          deep: {
            meaning: "강하고 깊은 관계를 맺습니다. 결혼 가능성이 높습니다.",
            score: 85
          },
          shallow: {
            meaning: "가벼운 관계가 많을 수 있습니다.",
            score: 60
          }
        },
        direction: {
          upward: {
            meaning: "결혼을 안 하거나 늦은 결혼을 할 수 있습니다. 또는 행복한 결혼을 의미합니다.",
            score: 70
          },
          straight: {
            meaning: "안정적인 결혼 생활을 합니다.",
            score: 80
          },
          downward: {
            meaning: "배우자와의 관계에 주의가 필요합니다. 감정적 어려움이 있을 수 있습니다.",
            score: 55
          }
        },
        position: {
          nearHeart: {
            meaning: "이른 결혼 또는 일찍 만난 인연을 나타냅니다.",
            ageRange: "20대 초반"
          },
          middle: {
            meaning: "적절한 시기의 결혼을 나타냅니다.",
            ageRange: "25-35세"
          },
          nearPinky: {
            meaning: "늦은 결혼을 나타냅니다.",
            ageRange: "35세 이후"
          }
        }
      },
      specialMarks: {
        fork: {
          meaning: "이별이나 이혼 가능성이 있습니다. 또는 장거리 관계를 나타냅니다.",
          severity: "medium"
        },
        island: {
          meaning: "결혼 생활에 어려움이 있을 수 있습니다.",
          severity: "medium"
        },
        touchesSunLine: {
          meaning: "결혼으로 인해 사회적 지위가 높아집니다. 좋은 인연을 만납니다.",
          severity: "positive"
        }
      }
    },

    childrenLine: {
      name: "Children Line",
      nameKo: "자녀선",
      position: "결혼선 위의 짧은 수직선",
      description: "자녀 수, 자녀와의 관계를 나타냅니다 (정확도 제한적).",
      meanings: {
        count: {
          description: "선의 수가 자녀 수를 나타낼 수 있습니다 (정확도 제한)."
        },
        depth: {
          deep: {
            meaning: "건강한 자녀를 나타냅니다. 전통적으로 남아를 의미하기도 합니다.",
            score: 80
          },
          shallow: {
            meaning: "섬세한 성격의 자녀를 나타냅니다. 전통적으로 여아를 의미하기도 합니다.",
            score: 75
          }
        }
      }
    },

    moneyLine: {
      name: "Money Line",
      nameKo: "재물선",
      position: "새끼손가락과 약지 사이에서 내려오는 선",
      description: "재물운, 돈을 모으는 능력을 나타냅니다.",
      meanings: {
        presence: {
          clear: {
            meaning: "좋은 재물운과 돈 모으는 능력이 있습니다.",
            score: 85,
            traits: ["재물운", "저축 능력", "재정 관리"]
          },
          faint: {
            meaning: "재물운이 보통입니다. 노력에 따라 달라집니다.",
            score: 65
          },
          triangle: {
            meaning: "큰 부를 축적할 운이 있습니다. 매우 행운입니다.",
            score: 95,
            traits: ["큰 재산", "부의 축적"]
          }
        }
      }
    },

    intuitionLine: {
      name: "Intuition Line",
      nameKo: "직감선",
      position: "월구에서 시작하여 수성구 방향으로 휘어지는 선",
      description: "직감력, 영적 능력을 나타냅니다.",
      meanings: {
        presence: {
          clear: {
            meaning: "매우 발달된 직감력을 가지고 있습니다. 영적인 능력이 있을 수 있습니다.",
            score: 90,
            traits: ["강한 직감", "영적 능력", "예지력"]
          },
          absent: {
            meaning: "논리적 사고를 더 선호합니다.",
            score: 70
          }
        }
      }
    },

    travelLine: {
      name: "Travel Line",
      nameKo: "여행선",
      position: "월구 가장자리의 수평선",
      description: "여행, 이동, 해외와의 인연을 나타냅니다.",
      meanings: {
        presence: {
          many: {
            meaning: "많은 여행의 기회가 있습니다. 해외와 인연이 깊습니다.",
            traits: ["여행 많음", "해외 인연"]
          },
          few: {
            meaning: "중요한 여행이 몇 번 있습니다.",
            traits: ["중요한 여행"]
          },
          absent: {
            meaning: "고향에서 안정적인 생활을 합니다.",
            traits: ["안정적 거주"]
          }
        }
      }
    }
  },

  // =====================================
  // 구 (Mounts) - 7개 행성구
  // =====================================
  mounts: {
    jupiter: {
      name: "Mount of Jupiter",
      nameKo: "목성구",
      position: "검지 아래",
      planet: "목성",
      element: "화",
      meanings: {
        general: "야망, 리더십, 자신감, 명예욕, 영성을 나타냅니다.",
        developed: {
          meaning: "타고난 지도자 기질이 있습니다. 자신감이 넘치고 목표 달성 능력이 뛰어납니다.",
          score: 85,
          traits: ["리더십", "자신감", "야망", "명예욕"]
        },
        flat: {
          meaning: "겸손하고 조용한 성향입니다. 리더보다 팔로워 역할을 선호합니다.",
          score: 65,
          traits: ["겸손함", "조용함", "팔로워"]
        },
        overdeveloped: {
          meaning: "자만심에 주의가 필요합니다. 과도한 야망은 문제를 일으킬 수 있습니다.",
          score: 55,
          traits: ["자만심", "과도한 야망", "독선"]
        }
      },
      specialMarks: {
        star: "갑작스러운 명예와 성공",
        cross: "행복한 결혼이나 중요한 인연",
        triangle: "외교적 재능, 정치적 성공",
        square: "교육자, 멘토로서의 능력"
      }
    },

    saturn: {
      name: "Mount of Saturn",
      nameKo: "토성구",
      position: "중지 아래",
      planet: "토성",
      element: "토",
      meanings: {
        general: "책임감, 성실함, 인내, 지혜, 신중함을 나타냅니다.",
        developed: {
          meaning: "진지하고 성실한 성격입니다. 책임감이 강하고 인내심이 있습니다.",
          score: 80,
          traits: ["성실함", "책임감", "인내", "지혜"]
        },
        flat: {
          meaning: "쾌활하고 가벼운 성향입니다. 심각한 것보다 즐거움을 추구합니다.",
          score: 70,
          traits: ["쾌활함", "가벼움", "즐거움 추구"]
        },
        overdeveloped: {
          meaning: "우울하거나 고독한 경향이 있습니다. 너무 진지할 수 있습니다.",
          score: 55,
          traits: ["우울 경향", "고독", "과도한 진지함"]
        }
      },
      specialMarks: {
        star: "주의 필요 - 어려움의 징조",
        cross: "신비주의에 대한 관심",
        triangle: "초자연적 능력",
        square: "위험으로부터의 보호"
      }
    },

    apollo: {
      name: "Mount of Apollo",
      nameKo: "태양구 (아폴로구)",
      position: "약지 아래",
      planet: "태양",
      element: "화",
      meanings: {
        general: "창의력, 예술성, 명성, 매력, 행복을 나타냅니다.",
        developed: {
          meaning: "매력적이고 밝은 성격입니다. 예술적 재능이 있고 사람들에게 인기가 있습니다.",
          score: 85,
          traits: ["매력적", "밝은 성격", "예술적 재능", "인기"]
        },
        flat: {
          meaning: "예술적 관심이 적습니다. 실용적인 것을 더 중시합니다.",
          score: 65,
          traits: ["실용적", "예술 무관심"]
        },
        overdeveloped: {
          meaning: "허영심에 주의가 필요합니다. 외모나 명예에 지나치게 집착할 수 있습니다.",
          score: 55,
          traits: ["허영심", "외모 집착", "명예욕"]
        }
      },
      specialMarks: {
        star: "큰 성공과 명성",
        cross: "재정적 손실 주의",
        triangle: "과학이나 예술에서의 성공",
        trident: "매우 큰 성공과 부"
      }
    },

    mercury: {
      name: "Mount of Mercury",
      nameKo: "수성구",
      position: "새끼손가락 아래",
      planet: "수성",
      element: "수",
      meanings: {
        general: "의사소통, 사업 능력, 재치, 과학적 사고를 나타냅니다.",
        developed: {
          meaning: "말재주가 좋고 사업 수완이 있습니다. 커뮤니케이션 능력이 뛰어납니다.",
          score: 85,
          traits: ["말재주", "사업 수완", "의사소통 능력", "재치"]
        },
        flat: {
          meaning: "수줍음이 많은 성향입니다. 말보다 행동으로 표현합니다.",
          score: 65,
          traits: ["수줍음", "내성적", "행동형"]
        },
        overdeveloped: {
          meaning: "말이 과하거나 속임수에 주의가 필요합니다.",
          score: 50,
          traits: ["과도한 말", "속임수 주의"]
        }
      },
      specialMarks: {
        star: "과학이나 사업에서의 성공",
        cross: "속임수 당함 주의",
        triangle: "외교적 재능",
        square: "위험한 상황에서의 보호"
      }
    },

    venus: {
      name: "Mount of Venus",
      nameKo: "금성구",
      position: "엄지 아래 (생명선 안쪽)",
      planet: "금성",
      element: "금",
      meanings: {
        general: "사랑, 미, 열정, 감수성, 음악적 재능을 나타냅니다.",
        developed: {
          meaning: "따뜻하고 애정이 풍부합니다. 예술적 감각이 뛰어나고 매력적입니다.",
          score: 85,
          traits: ["따뜻함", "애정 풍부", "예술적 감각", "매력"]
        },
        flat: {
          meaning: "감정 표현이 서툴 수 있습니다. 차분하고 이성적입니다.",
          score: 65,
          traits: ["감정 표현 서툼", "차분함", "이성적"]
        },
        overdeveloped: {
          meaning: "쾌락주의에 빠질 수 있습니다. 물질적 향락을 주의해야 합니다.",
          score: 55,
          traits: ["쾌락주의", "물질적 향락"]
        }
      },
      specialMarks: {
        star: "사랑에서의 큰 행운",
        cross: "사랑의 단 한 번의 큰 영향",
        triangle: "사랑의 계산",
        grille: "성적 매력"
      }
    },

    moon: {
      name: "Mount of Moon",
      nameKo: "월구",
      position: "손바닥 하단 새끼손가락 쪽",
      planet: "달",
      element: "수",
      meanings: {
        general: "상상력, 직관력, 창의성, 감수성, 여행운을 나타냅니다.",
        developed: {
          meaning: "몽상적이고 예술적 기질이 있습니다. 상상력이 풍부하고 창의적입니다.",
          score: 85,
          traits: ["상상력", "예술적", "창의적", "몽상적"]
        },
        flat: {
          meaning: "현실적이고 실용적입니다. 이론보다 실천을 중시합니다.",
          score: 70,
          traits: ["현실적", "실용적", "실천적"]
        },
        overdeveloped: {
          meaning: "현실과 동떨어질 수 있습니다. 망상이나 비현실적 기대를 주의해야 합니다.",
          score: 50,
          traits: ["비현실적", "망상", "현실 회피"]
        }
      },
      specialMarks: {
        star: "명성, 특히 창의적 분야에서",
        cross: "자기기만 또는 상상력 남용",
        triangle: "창의적 직감",
        square: "여행 중 보호"
      }
    },

    mars: {
      inner: {
        name: "Mount of Mars (Inner)",
        nameKo: "양화성구 (내화성구)",
        position: "금성구와 목성구 사이",
        planet: "화성",
        element: "화",
        meanings: {
          general: "용기, 공격성, 적극성, 자기 주장을 나타냅니다.",
          developed: {
            meaning: "용감하고 적극적입니다. 자신의 의견을 당당히 표현합니다.",
            score: 80,
            traits: ["용감함", "적극성", "자기 주장"]
          },
          flat: {
            meaning: "소심할 수 있습니다. 갈등을 회피하는 경향이 있습니다.",
            score: 60,
            traits: ["소심함", "갈등 회피"]
          },
          overdeveloped: {
            meaning: "성급하거나 공격적일 수 있습니다. 분노 조절이 필요합니다.",
            score: 50,
            traits: ["성급함", "공격성", "분노"]
          }
        }
      },
      outer: {
        name: "Mount of Mars (Outer)",
        nameKo: "음화성구 (외화성구)",
        position: "수성구와 월구 사이",
        planet: "화성",
        element: "화",
        meanings: {
          general: "인내, 저항력, 방어력, 끈기를 나타냅니다.",
          developed: {
            meaning: "인내심이 강합니다. 어려움에 굴하지 않고 끝까지 버팁니다.",
            score: 80,
            traits: ["인내심", "끈기", "저항력"]
          },
          flat: {
            meaning: "쉽게 포기할 수 있습니다. 끈기를 기르는 것이 필요합니다.",
            score: 60,
            traits: ["포기 경향", "끈기 부족"]
          },
          overdeveloped: {
            meaning: "고집이 셀 수 있습니다. 유연성을 기르는 것이 좋습니다.",
            score: 55,
            traits: ["고집", "완고함"]
          }
        }
      },
      plain: {
        name: "Plain of Mars",
        nameKo: "화성평원",
        position: "손바닥 중앙",
        meanings: {
          general: "균형, 자기 통제, 절제를 나타냅니다.",
          hollow: {
            meaning: "침착하고 절제력이 있습니다.",
            traits: ["침착함", "절제력"]
          },
          raised: {
            meaning: "적극적이고 에너지가 넘칩니다.",
            traits: ["적극성", "에너지"]
          }
        }
      }
    }
  },

  // =====================================
  // 손 형태 (Hand Shapes) - 4원소
  // =====================================
  handShapes: {
    fire: {
      name: "Fire Hand",
      nameKo: "불의 손",
      element: "불 (火)",
      palm: "긴 손바닥",
      fingers: "짧은 손가락",
      description: "손바닥이 길고 손가락이 짧은 형태",
      personality: {
        positive: ["열정적", "에너지 넘침", "낙관적", "직관적", "창의적", "모험심 강함"],
        negative: ["충동적", "인내심 부족", "성급함", "금방 흥미 잃음"]
      },
      traits: ["리더십", "창의성", "열정", "모험심"],
      careers: ["사업가", "리더", "운동선수", "연예인", "세일즈", "기업가"],
      loveStyle: "열정적이고 로맨틱하지만 변덕스러울 수 있음",
      healthTendency: "심장, 혈액순환 관련 주의",
      compatibility: ["공기의 손", "불의 손"]
    },

    earth: {
      name: "Earth Hand",
      nameKo: "땅의 손",
      element: "땅 (土)",
      palm: "네모난 손바닥",
      fingers: "짧은 손가락",
      description: "손바닥이 네모나고 손가락이 짧은 형태",
      personality: {
        positive: ["실용적", "신뢰할 수 있음", "안정적", "성실함", "꾸준함"],
        negative: ["완고함", "융통성 부족", "변화 싫어함"]
      },
      traits: ["신뢰성", "꾸준함", "실용성", "안정 추구"],
      careers: ["농업", "기술직", "요리", "건축", "공예", "엔지니어", "금융"],
      loveStyle: "충실하고 헌신적이지만 감정 표현이 서툴 수 있음",
      healthTendency: "소화기, 피부 관련 주의",
      compatibility: ["땅의 손", "물의 손"]
    },

    air: {
      name: "Air Hand",
      nameKo: "공기의 손",
      element: "공기 (風)",
      palm: "네모난 손바닥",
      fingers: "긴 손가락",
      description: "손바닥이 네모나고 손가락이 긴 형태",
      personality: {
        positive: ["지적", "분석적", "사교적", "의사소통 능력", "적응력"],
        negative: ["우유부단", "감정 표현 어려움", "산만함"]
      },
      traits: ["의사소통", "분석력", "적응력", "지적 호기심"],
      careers: ["작가", "교사", "변호사", "저널리스트", "프로그래머", "과학자", "마케터"],
      loveStyle: "지적 교류를 중시하며 감정보다 대화를 선호함",
      healthTendency: "신경계, 호흡기 관련 주의",
      compatibility: ["불의 손", "공기의 손"]
    },

    water: {
      name: "Water Hand",
      nameKo: "물의 손",
      element: "물 (水)",
      palm: "긴 손바닥",
      fingers: "긴 손가락",
      description: "손바닥이 길고 손가락이 긴 형태",
      personality: {
        positive: ["감수성 풍부", "직관적", "창의적", "공감 능력", "예술적"],
        negative: ["예민함", "현실 회피", "우유부단", "감정 기복"]
      },
      traits: ["예술성", "직관력", "공감 능력", "창의성"],
      careers: ["예술가", "음악가", "치료사", "심리상담사", "시인", "간호사", "사회복지사"],
      loveStyle: "깊은 감정적 연결을 추구하며 로맨틱함",
      healthTendency: "신장, 비뇨기, 림프 관련 주의",
      compatibility: ["땅의 손", "물의 손"]
    }
  },

  // =====================================
  // 특수 기호 (Special Marks)
  // =====================================
  specialMarks: {
    star: {
      name: "Star",
      nameKo: "별",
      shape: "여러 선이 한 점에서 만남 (보통 3개 이상의 선)",
      meaning: "갑작스러운 사건을 나타냅니다. 위치에 따라 행운 또는 불운을 의미합니다.",
      locations: {
        jupiterMount: { meaning: "갑작스러운 명예와 성공, 리더십 위치", type: "positive" },
        saturnMount: { meaning: "숙명적 사건, 주의 필요", type: "warning" },
        apolloMount: { meaning: "갑작스러운 명성과 부", type: "positive" },
        mercuryMount: { meaning: "과학이나 사업에서의 갑작스러운 성공", type: "positive" },
        venusMount: { meaning: "사랑에서의 갑작스러운 행운", type: "positive" },
        moonMount: { meaning: "상상력이나 창의적 분야에서의 성공", type: "positive" },
        lifeLine: { meaning: "인생의 큰 변화, 때로는 위기", type: "neutral" },
        headLine: { meaning: "정신적 충격 또는 큰 깨달음 주의", type: "warning" },
        heartLine: { meaning: "사랑에서의 갑작스러운 사건", type: "neutral" },
        fateLine: { meaning: "커리어에서의 갑작스러운 성공", type: "positive" }
      }
    },

    cross: {
      name: "Cross",
      nameKo: "십자",
      shape: "두 선이 교차하여 + 모양",
      meaning: "장애물, 변화, 결정의 순간을 나타냅니다.",
      locations: {
        jupiterMount: { meaning: "행복한 결혼이나 중요한 인연", type: "positive" },
        saturnMount: { meaning: "숙명적 만남 또는 장애물", type: "neutral" },
        apolloMount: { meaning: "예술적 어려움 또는 재정 문제", type: "warning" },
        mysticCross: {
          meaning: "신비의 십자가 - 두뇌선과 감정선 사이에 위치하면 강한 직관력과 영적 능력을 나타냅니다.",
          type: "very_positive"
        }
      }
    },

    triangle: {
      name: "Triangle",
      nameKo: "삼각형",
      shape: "세 선이 만나서 삼각형 형성",
      meaning: "재능, 성공, 보호를 나타냅니다. 항상 긍정적인 의미입니다.",
      locations: {
        jupiterMount: { meaning: "학문적 성공, 외교적 재능, 정치적 성공", type: "positive" },
        apolloMount: { meaning: "예술적 재능, 창의적 분야에서의 성공", type: "positive" },
        mercuryMount: { meaning: "사업 수완, 커뮤니케이션 재능", type: "positive" },
        lifeLine: { meaning: "보호, 안전", type: "positive" },
        headLine: { meaning: "학문적 성공, 지적 성취", type: "positive" },
        palmCenter: { meaning: "큰 재물운, 럭키 트라이앵글", type: "very_positive" }
      }
    },

    island: {
      name: "Island",
      nameKo: "섬",
      shape: "선이 갈라졌다가 다시 합쳐지는 타원형",
      meaning: "에너지 분산, 스트레스, 어려운 시기를 나타냅니다.",
      severity: "medium",
      duration: "섬의 크기가 어려움의 기간을 나타냅니다.",
      locations: {
        lifeLine: { meaning: "건강 문제나 생활환경의 어려움", type: "warning" },
        headLine: { meaning: "정신적 스트레스, 집중력 저하", type: "warning" },
        heartLine: { meaning: "감정적 어려움, 관계 문제", type: "warning" },
        fateLine: { meaning: "커리어 어려움, 직업적 장애물", type: "warning" }
      }
    },

    chain: {
      name: "Chain",
      nameKo: "사슬",
      shape: "연속된 작은 섬 또는 고리 형태",
      meaning: "지속적인 어려움, 불안정, 혼란을 나타냅니다.",
      severity: "medium_high",
      locations: {
        lifeLine: { meaning: "건강 불안정, 지속적인 스트레스", type: "warning" },
        headLine: { meaning: "정신적 불안정, 집중력 문제", type: "warning" },
        heartLine: { meaning: "감정 기복, 연애 우여곡절", type: "warning" }
      }
    },

    square: {
      name: "Square",
      nameKo: "네모",
      shape: "네 선이 만나서 사각형 형성",
      meaning: "보호, 위험으로부터의 보호막을 나타냅니다. 매우 긍정적입니다.",
      severity: "positive",
      locations: {
        anyLine: { meaning: "해당 영역에서의 보호, 위기 극복", type: "positive" },
        lifeLine: { meaning: "건강 위기에서의 보호", type: "positive" },
        fateLine: { meaning: "커리어 위기에서의 보호", type: "positive" }
      }
    },

    grille: {
      name: "Grille",
      nameKo: "격자",
      shape: "수직선과 수평선이 교차하여 격자 형성",
      meaning: "에너지 분산, 장애, 스트레스를 나타냅니다.",
      severity: "medium",
      locations: {
        anyMount: { meaning: "해당 구의 에너지가 분산됨", type: "warning" }
      }
    },

    trident: {
      name: "Trident",
      nameKo: "삼지창",
      shape: "선의 끝이 세 갈래로 갈라짐",
      meaning: "매우 행운, 성공과 번영을 의미합니다. 가장 길상적인 기호 중 하나입니다.",
      severity: "very_positive",
      locations: {
        fateLine: { meaning: "커리어에서의 큰 성공", type: "very_positive" },
        sunLine: { meaning: "명성, 부, 행복의 삼중 축복", type: "very_positive" },
        jupiterMount: { meaning: "리더십과 명예의 성취", type: "very_positive" }
      }
    },

    mSign: {
      name: "M Sign",
      nameKo: "M자 손금",
      shape: "생명선, 두뇌선, 감정선, 운명선이 M자 형성",
      meaning: "매우 행운, 강한 직관력, 신뢰할 수 있는 사람을 나타냅니다.",
      rarity: "드묾 (약 3-5% 인구)",
      traits: ["행운", "직관력", "리더십", "성공 가능성", "신뢰성"]
    },

    simianLine: {
      name: "Simian Line",
      nameKo: "막쥔손금 (관통선)",
      shape: "감정선과 두뇌선이 하나로 합쳐진 선",
      meaning: "강한 집중력, 극단적 성향, 한 분야에서 뛰어난 성취 가능",
      rarity: "드묾 (약 1-2% 인구)",
      traits: {
        positive: ["강한 집중력", "결단력", "한 분야 전문성", "강한 의지"],
        negative: ["극단적 성향", "감정/논리 구분 어려움", "고집"]
      }
    },

    mysticCross: {
      name: "Mystic Cross",
      nameKo: "신비의 십자가",
      shape: "두뇌선과 감정선 사이 손바닥 중앙의 십자 표시",
      meaning: "강한 직관력, 영적 능력, 초자연적 관심을 나타냅니다.",
      traits: ["직관력", "영적 능력", "신비주의 관심", "예지력 가능성"]
    },

    fishSign: {
      name: "Fish Sign",
      nameKo: "물고기 표시",
      shape: "물고기 모양의 표시",
      meaning: "행운, 번영, 영적 성장, 재물운을 나타냅니다.",
      severity: "very_positive",
      locations: {
        anyLocation: { meaning: "큰 행운과 번영", type: "very_positive" }
      }
    },

    ringOfSolomon: {
      name: "Ring of Solomon",
      nameKo: "솔로몬의 고리",
      shape: "검지 아래를 감싸는 반원형 선",
      meaning: "지혜, 직관력, 사람을 이해하는 능력을 나타냅니다.",
      traits: ["지혜", "직관력", "인간 이해력", "카운슬링 능력"]
    },

    ringOfSaturn: {
      name: "Ring of Saturn",
      nameKo: "토성의 고리",
      shape: "중지 아래를 감싸는 반원형 선",
      meaning: "고독, 내향성, 깊은 사고를 나타냅니다.",
      traits: ["내향성", "깊은 사고", "고독 선호"]
    },

    ringOfApollo: {
      name: "Ring of Apollo",
      nameKo: "아폴로의 고리",
      shape: "약지 아래를 감싸는 반원형 선",
      meaning: "창의적 블록 또는 예술적 방해를 나타낼 수 있습니다.",
      traits: ["창의적 블록", "예술적 어려움"]
    },

    viaLascivia: {
      name: "Via Lascivia",
      nameKo: "독선",
      shape: "월구를 가로지르는 선",
      meaning: "알레르기, 중독 성향 또는 민감한 체질을 나타낼 수 있습니다.",
      traits: ["민감한 체질", "알레르기 경향"]
    }
  },

  // =====================================
  // 손가락 분석 (Finger Analysis)
  // =====================================
  fingerAnalysis: {
    thumb: {
      name: "Thumb",
      nameKo: "엄지",
      planet: "금성/화성",
      meanings: {
        general: "의지력, 자기 통제, 논리력을 나타냅니다.",
        long: {
          meaning: "강한 의지력과 리더십이 있습니다. 목표 달성 능력이 뛰어납니다.",
          traits: ["강한 의지", "리더십", "자신감"]
        },
        short: {
          meaning: "감정에 의해 움직이는 경향이 있습니다. 타인의 영향을 받기 쉽습니다.",
          traits: ["감정적", "유연함", "적응력"]
        },
        flexible: {
          meaning: "적응력이 좋고 관대합니다. 타인의 의견을 잘 수용합니다.",
          traits: ["적응력", "관대함", "유연성"]
        },
        stiff: {
          meaning: "고집이 세고 신중합니다. 자신의 의견을 고수합니다.",
          traits: ["고집", "신중함", "일관성"]
        }
      },
      phalanges: {
        first: "의지의 마디 - 의지력과 결단력",
        second: "논리의 마디 - 이성과 판단력"
      }
    },

    index: {
      name: "Index Finger",
      nameKo: "검지",
      planet: "목성",
      meanings: {
        general: "야망, 자존심, 리더십, 자신감을 나타냅니다.",
        long: {
          meaning: "야망이 크고 리더십이 있습니다. 자신감이 넘치고 지도자 기질이 있습니다.",
          traits: ["야망", "리더십", "자신감", "지도자 기질"]
        },
        short: {
          meaning: "자신감이 부족할 수 있습니다. 겸손하지만 자기 주장이 약할 수 있습니다.",
          traits: ["겸손함", "자기 주장 약함"]
        },
        equalToRing: {
          meaning: "균형 잡힌 성격입니다. 조화를 중시합니다.",
          traits: ["균형", "조화"]
        },
        longerThanRing: {
          meaning: "자기 확신이 강하고 야망이 큽니다.",
          traits: ["자기 확신", "야망"]
        },
        shorterThanRing: {
          meaning: "위험 감수 성향이 있고 창의적입니다.",
          traits: ["위험 감수", "창의성"]
        }
      }
    },

    middle: {
      name: "Middle Finger",
      nameKo: "중지",
      planet: "토성",
      meanings: {
        general: "책임감, 균형, 가치관, 진지함을 나타냅니다.",
        long: {
          meaning: "진지하고 책임감이 강합니다. 규칙을 중시하고 성실합니다.",
          traits: ["진지함", "책임감", "규칙 준수", "성실"]
        },
        short: {
          meaning: "충동적이고 자유로운 영혼입니다. 규칙보다 자유를 선호합니다.",
          traits: ["충동적", "자유로움", "규칙 싫어함"]
        },
        straight: {
          meaning: "균형 잡힌 판단력이 있습니다.",
          traits: ["균형", "판단력"]
        }
      }
    },

    ring: {
      name: "Ring Finger",
      nameKo: "약지",
      planet: "태양/아폴로",
      meanings: {
        general: "창의성, 예술성, 자기표현, 감정을 나타냅니다.",
        long: {
          meaning: "창의적이고 예술적 재능이 있습니다. 위험 감수 성향이 있습니다.",
          traits: ["창의성", "예술성", "위험 감수"]
        },
        short: {
          meaning: "현실적이고 실용적입니다. 모험보다 안정을 선호합니다.",
          traits: ["현실적", "실용적", "안정 선호"]
        },
        veryLong: {
          meaning: "도박적 성향이 있을 수 있습니다. 위험을 즐깁니다.",
          traits: ["도박적", "위험 선호"]
        }
      }
    },

    pinky: {
      name: "Pinky Finger",
      nameKo: "새끼손가락",
      planet: "수성",
      meanings: {
        general: "의사소통, 사교성, 직관, 성적 표현을 나타냅니다.",
        long: {
          meaning: "의사소통 능력이 뛰어납니다. 말재주가 좋고 사교적입니다.",
          traits: ["의사소통", "사교성", "말재주"],
          benchmark: "약지 첫째 마디를 넘으면 긴 것"
        },
        short: {
          meaning: "수줍음이 많고 자기표현이 어려울 수 있습니다.",
          traits: ["수줍음", "자기표현 어려움"]
        },
        veryShort: {
          meaning: "어린 시절 어려움이 있었을 수 있습니다. 성숙에 시간이 필요합니다.",
          traits: ["성숙 지연", "자신감 부족"]
        },
        straight: {
          meaning: "정직하고 신뢰할 수 있습니다.",
          traits: ["정직함", "신뢰성"]
        },
        curved: {
          meaning: "외교적이고 중재 능력이 있습니다.",
          traits: ["외교적", "중재 능력"]
        }
      }
    }
  },

  // =====================================
  // 동양 손금학 (마의상법 기반)
  // =====================================
  easternPalmistry: {
    handReading: {
      description: "동양 전통에서의 손 선택 방법",
      chinese: {
        male: {
          under30: { primary: "왼손", secondary: "오른손" },
          over30: { primary: "오른손", secondary: "왼손" }
        },
        female: {
          under30: { primary: "오른손", secondary: "왼손" },
          over30: { primary: "왼손", secondary: "오른손" }
        }
      },
      korean: {
        description: "주로 사용하는 손(주 손)을 현재와 미래로, 비주 손을 과거와 선천적 기질로 봅니다.",
        dominant: "현재와 미래",
        nonDominant: "과거와 선천적 기질"
      }
    },

    fiveElements: {
      description: "오행에 따른 손 분류",
      wood: {
        nameKo: "목(木)형 손",
        characteristics: "가늘고 긴 손",
        personality: ["성장 지향", "이상주의", "유연함", "창의적"],
        suitableCareers: ["교육", "상담", "작가", "환경 관련"]
      },
      fire: {
        nameKo: "화(火)형 손",
        characteristics: "둥글고 뾰족한 손끝",
        personality: ["열정적", "에너지", "충동적", "표현력 좋음"],
        suitableCareers: ["연예", "마케팅", "스포츠", "영업"]
      },
      earth: {
        nameKo: "토(土)형 손",
        characteristics: "네모나고 두꺼운 손",
        personality: ["실용적", "안정", "신뢰성", "꾸준함"],
        suitableCareers: ["부동산", "농업", "요리", "건축"]
      },
      metal: {
        nameKo: "금(金)형 손",
        characteristics: "뼈가 두드러진 손",
        personality: ["결단력", "정의감", "논리적", "엄격함"],
        suitableCareers: ["법률", "군인", "경찰", "금융"]
      },
      water: {
        nameKo: "수(水)형 손",
        characteristics: "부드럽고 유연한 손",
        personality: ["직관적", "감수성", "적응력", "지혜로움"],
        suitableCareers: ["예술", "심리학", "철학", "영성 관련"]
      }
    }
  },

  // =====================================
  // 건강 지표 (Health Indicators)
  // =====================================
  healthIndicators: {
    nailColor: {
      pink: { meaning: "건강한 혈액 순환", status: "healthy" },
      pale: { meaning: "빈혈, 영양 부족 가능성", status: "warning" },
      blue: { meaning: "순환 문제 가능성", status: "warning" },
      yellow: { meaning: "간 문제 또는 진균 감염 가능성", status: "warning" },
      white: { meaning: "간이나 신장 문제 가능성", status: "warning" }
    },
    palmColor: {
      pink: { meaning: "건강한 순환", status: "healthy" },
      red: { meaning: "고혈압 가능성", status: "warning" },
      pale: { meaning: "빈혈, 피로", status: "warning" },
      yellow: { meaning: "간 기능 문제 가능성", status: "warning" }
    },
    skinTexture: {
      soft: { meaning: "섬세한 체질, 정신적 민감함" },
      firm: { meaning: "건강한 체력, 활동적" },
      rough: { meaning: "육체 노동, 실용적 성향" },
      dry: { meaning: "갑상선 또는 피부 건강 확인 필요" }
    }
  },

  // =====================================
  // 면책 조항 (Disclaimer)
  // =====================================
  disclaimer: {
    ko: "손금 분석은 재미와 자기 성찰을 위한 것입니다. 이 분석은 과학적으로 검증되지 않았으며, 의학적, 법적, 재정적 조언을 대체할 수 없습니다. 중요한 결정은 반드시 전문가와 상담하시기 바랍니다. 건강 관련 우려가 있으시면 의료 전문가와 상담하세요.",
    en: "Palm reading is for entertainment and self-reflection purposes only. This analysis is not scientifically proven and should not replace medical, legal, or financial advice. Please consult professionals for important decisions. If you have health concerns, please consult a healthcare professional."
  },

  // =====================================
  // 참고 출처 (References)
  // =====================================
  references: [
    "Almanac.com - How to Read Palms",
    "HowStuffWorks - Palm Reading",
    "YourChineseAstrology.com - Chinese Palmistry",
    "Cassie Uhl - Basic Palmistry",
    "Psychic Library - Palmistry Room",
    "손금닷컴 (sonkum.com)",
    "한국민족문화대백과사전 - 수상",
    "GS칼텍스 미디어허브 - 손금 가이드",
    "Astro Arun Pandit - Palmistry",
    "Astrogle - Palm Meanings",
    "Lisa Boswell - Palmistry",
    "East China Trip - Palm Reading Guide",
    "마의상법 (麻衣相法) - 전통 동양 수상학",
    "InstaAstro - Finger Astrology",
    "Reality Pathing - Palmistry Symbols",
    "Sister Palm - Elemental Hand Types",
    "Sophie's in Jupiter - Finger Meanings"
  ]
};

export type PalmistryDatabase = typeof PALMISTRY_DATABASE;
export default PALMISTRY_DATABASE;
