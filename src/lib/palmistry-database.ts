/**
 * 세계 최고의 손금 지식 데이터베이스
 *
 * 출처 및 참고 문헌:
 * - William G. Benham "The Laws of Scientific Hand Reading" (1900)
 * - Cheiro (Count Louis Hamon) "Cheiro's Language of the Hand" (1894)
 * - Noel Jaquin "The Hand of Man" (1933)
 * - Charlotte Wolff "The Human Hand" (1942) - 의학적 관점
 * - Julius Spier "The Hands of Children" (1944)
 * - Fred Gettings "The Book of the Hand" (1965)
 * - 마의상법(麻衣相法) - 동양 전통 손금학
 * - 수상학대전(手相學大全) - 일본 손금학
 * - Dermatoglyphics 연구 논문들 (피부문양학)
 * - Indian Palmistry (Samudrik Shastra)
 * - Chinese Palm Reading (Shou Xiang)
 */

export const PALMISTRY_DATABASE = {
  // ==========================================
  // 제1부: 손의 형태학 (Hand Morphology)
  // ==========================================
  handShapes: {
    // 서양 4원소 분류 (Fred Gettings)
    westernElements: {
      earth: {
        name: '땅의 손 (Earth Hand)',
        characteristics: '네모난 손바닥, 짧은 손가락, 두꺼운 피부, 깊은 선',
        ratio: '손바닥 너비 = 손바닥 길이, 손가락 < 손바닥 길이',
        personality: [
          '실용적이고 현실적',
          '안정과 보안을 추구',
          '신뢰할 수 있고 책임감 있음',
          '변화보다 전통을 선호',
          '감각적이고 물질적 쾌락을 즐김',
          '끈기와 인내심이 강함'
        ],
        careers: ['농업', '건축', '요리', '공예', '금융', '부동산'],
        healthTendency: '소화기계, 관절, 피부 관련 주의'
      },
      water: {
        name: '물의 손 (Water Hand)',
        characteristics: '길고 좁은 손바닥, 긴 손가락, 가는 선이 많음',
        ratio: '손바닥 길이 > 너비, 손가락 ≥ 손바닥 길이',
        personality: [
          '감수성이 풍부하고 직관적',
          '예술적 재능',
          '감정의 깊이가 있음',
          '이상주의적',
          '상상력이 풍부',
          '타인의 감정에 민감'
        ],
        careers: ['예술가', '음악가', '시인', '심리상담사', '간호사', '사회복지사'],
        healthTendency: '신경계, 림프계, 감정적 스트레스 주의'
      },
      fire: {
        name: '불의 손 (Fire Hand)',
        characteristics: '긴 손바닥, 짧은 손가락, 선명한 선, 붉은 색조',
        ratio: '손바닥 길이 > 너비, 손가락 < 손바닥 길이',
        personality: [
          '열정적이고 에너지 넘침',
          '리더십과 추진력',
          '모험심과 도전정신',
          '충동적일 수 있음',
          '창의적이고 독창적',
          '즉흥적 행동 선호'
        ],
        careers: ['기업가', '운동선수', '연예인', '정치인', '영업', '마케팅'],
        healthTendency: '심장, 혈압, 과로 주의'
      },
      air: {
        name: '공기의 손 (Air Hand)',
        characteristics: '네모난 손바닥, 긴 손가락, 선명하고 가는 선',
        ratio: '손바닥 너비 = 길이, 손가락 > 손바닥 길이',
        personality: [
          '지적이고 분석적',
          '의사소통 능력 뛰어남',
          '호기심이 많고 다재다능',
          '논리적 사고',
          '사교적이고 유머러스',
          '새로운 아이디어에 열려있음'
        ],
        careers: ['작가', '저널리스트', '교사', '변호사', '과학자', 'IT'],
        healthTendency: '호흡기, 신경계, 불안/스트레스 주의'
      }
    },

    // 동양 5행 분류 (마의상법)
    easternElements: {
      metal: {
        name: '금형수 (金形手)',
        characteristics: '네모나고 단단한 손, 손가락 마디가 뚜렷',
        personality: '의지가 강하고 결단력 있음, 정의감',
        fortune: '관직운, 명예운이 좋음'
      },
      wood: {
        name: '목형수 (木形手)',
        characteristics: '길고 가느다란 손, 손가락이 마디 없이 매끄러움',
        personality: '인자하고 학문을 좋아함, 창의적',
        fortune: '학자운, 예술가운'
      },
      water: {
        name: '수형수 (水形手)',
        characteristics: '통통하고 부드러운 손, 손가락 끝이 뾰족',
        personality: '지혜롭고 적응력 좋음, 언변 뛰어남',
        fortune: '재물운, 사업운 좋음'
      },
      fire: {
        name: '화형수 (火形手)',
        characteristics: '손바닥이 붉고 손가락 끝이 뾰족',
        personality: '열정적이고 급함, 예술적 감각',
        fortune: '명예운은 있으나 재물은 불안정'
      },
      earth: {
        name: '토형수 (土形手)',
        characteristics: '두껍고 네모난 손, 손가락이 굵고 짧음',
        personality: '성실하고 신뢰할 수 있음, 끈기',
        fortune: '대기만성형, 중년 이후 발복'
      }
    },

    // 인도 손금학 분류 (Samudrik Shastra)
    indianClassification: {
      spiritualHand: {
        name: '영적인 손 (Psychic/Spiritual Hand)',
        characteristics: '가장 길고 가느다란 손, 매우 섬세',
        meaning: '영적 세계와 연결, 예술적 재능, 현실 세계에 취약'
      },
      conicHand: {
        name: '원뿔형 손 (Conic/Artistic Hand)',
        characteristics: '손가락 끝이 둥글게 좁아짐',
        meaning: '예술적 감각, 충동적, 감정에 따라 행동'
      },
      spatulateHand: {
        name: '주걱형 손 (Spatulate Hand)',
        characteristics: '손가락 끝이 넓게 퍼짐',
        meaning: '활동적, 독창적, 발명가 타입'
      },
      squareHand: {
        name: '네모형 손 (Square/Practical Hand)',
        characteristics: '손바닥과 손가락 끝이 네모남',
        meaning: '논리적, 질서정연, 규칙 중시'
      },
      philosophicHand: {
        name: '철학적인 손 (Philosophic Hand)',
        characteristics: '길고 마디가 발달한 손',
        meaning: '사색적, 분석적, 진리 추구'
      },
      mixedHand: {
        name: '혼합형 손 (Mixed Hand)',
        characteristics: '여러 타입의 특징이 혼합',
        meaning: '다재다능, 적응력 좋음, 결정에 어려움'
      }
    }
  },

  // ==========================================
  // 제2부: 주요 손금선 (Major Lines)
  // ==========================================
  majorLines: {
    lifeLine: {
      name: '생명선 (Life Line / Vitality Line)',
      location: '엄지와 검지 사이에서 시작해 엄지를 감싸며 손목 방향으로',
      meaning: '생명력, 활력, 체력, 삶의 질, 중요한 인생 변화',
      notMeaning: '수명의 길이가 아님 (흔한 오해)',

      length: {
        long: '강한 생명력, 풍부한 에너지, 건강한 체질',
        short: '에너지가 적다는 것이 아니라 집중적으로 사용함',
        veryLong: '손목까지 도달하면 강인한 생명력과 회복력'
      },

      depth: {
        deep: '강한 체력, 활발한 활동력, 건강 양호',
        shallow: '섬세한 체질, 에너지 관리 필요',
        veryDeep: '육체적 활동을 즐김, 스포츠 적성'
      },

      curve: {
        wideCurve: '금성구를 넓게 감쌈 - 따뜻하고 관대한 성격, 사랑이 풍부',
        narrowCurve: '엄지에 가까움 - 에너지가 제한적, 내성적',
        straightish: '거의 직선 - 냉정하고 신중한 성격'
      },

      startingPoint: {
        highStart: '검지 아래에서 시작 - 야망이 크고 자신감 있음',
        lowStart: '엄지 가까이에서 시작 - 조심스럽고 신중함',
        joinedWithHead: '두뇌선과 함께 시작 - 사려깊고 신중한 결정',
        separateFromHead: '두뇌선과 떨어져 시작 - 독립적, 모험심, 충동적 경향'
      },

      ending: {
        towardWrist: '손목 방향 - 가정과 뿌리에 애착',
        towardMoon: '월구 방향으로 휨 - 여행운, 변화를 좋아함',
        forked: '갈라짐 - 다양한 관심사, 여행의 기회'
      },

      specialMarks: {
        island: '섬 모양 - 해당 시기 건강 약화, 스트레스',
        chain: '사슬 모양 - 어린 시절 건강 문제 또는 정서적 불안',
        break: '끊김 - 인생의 큰 변화, 전환점 (반드시 나쁜 것 아님)',
        doubleLine: '이중선 - 보호 에너지, 수호천사, 매우 강한 생명력',
        crossBar: '가로선 - 스트레스나 장애물',
        branches: {
          upward: '위로 향하는 가지 - 성공, 노력의 결실',
          downward: '아래로 향하는 가지 - 에너지 소모, 피로'
        }
      },

      timeReading: {
        method: '생명선의 시작점을 0세, 손목 끝을 약 80세로 계산',
        landmark: '중지에서 수직선을 내렸을 때 교차점 ≈ 35-40세'
      }
    },

    headLine: {
      name: '두뇌선 (Head Line / Wisdom Line)',
      location: '검지와 엄지 사이에서 시작해 손바닥을 가로지름',
      meaning: '지능, 사고방식, 학습능력, 정신력, 집중력',

      length: {
        long: '깊은 사고력, 분석적, 복잡한 문제 해결 능력',
        short: '직관적 사고, 빠른 판단, 실용적 지능',
        veryLong: '새끼손가락 아래까지 - 과잉 사고, 걱정 많음'
      },

      shape: {
        straight: '논리적, 실용적, 현실적 사고',
        curved: '창의적, 상상력, 예술적 사고',
        stronglyCurved: '월구 방향으로 깊이 휨 - 매우 창의적, 공상가',
        slopingDown: '하향 - 창의적이지만 우울한 경향',
        slopingUp: '상향 - 야심차고 물질적 성공 추구'
      },

      startingPoint: {
        joinedWithLife: '생명선과 붙어서 시작 - 신중함, 가족 영향 큼',
        slightlyJoined: '약간 붙음 - 균형 잡힌 성격',
        separate: '떨어져 시작 - 독립적, 자신감, 모험심',
        widelySeparate: '넓게 떨어짐 - 무모함, 충동적',
        insideLifeLine: '생명선 안쪽에서 시작 - 극도로 민감하고 걱정 많음'
      },

      ending: {
        underMercury: '수성구 아래 - 사업 수완, 언변',
        onMoonMount: '월구 - 상상력, 직관력',
        forked: {
          twoWay: '두 갈래 (작가의 포크) - 창의력+논리력 균형',
          threeWay: '세 갈래 - 다재다능, 적응력'
        },
        straight: '직선으로 끝 - 실용적, 현실적'
      },

      specialMarks: {
        island: '섬 - 해당 시기 정신적 스트레스, 집중력 저하',
        chain: '사슬 - 집중력 부족, 두통 경향',
        break: '끊김 - 사고방식의 변화, 정신적 전환점',
        star: '별 - 정신적 성취 또는 충격',
        cross: '십자 - 중요한 결정의 시기'
      }
    },

    heartLine: {
      name: '감정선 (Heart Line / Love Line)',
      location: '손바닥 상단, 검지~새끼손가락 아래를 가로지름',
      meaning: '감정 표현, 사랑 방식, 인간관계, 심장 건강',

      length: {
        long: '검지까지 - 이상적 사랑 추구, 높은 기대',
        medium: '검지-중지 사이 - 균형 잡힌 감정',
        short: '중지까지 - 자기중심적 사랑, 육체적 매력 중시'
      },

      ending: {
        underJupiter: '검지 아래 - 이상주의적 사랑, 완벽한 파트너 추구',
        betweenJupiterSaturn: '검지-중지 사이 - 현실적이면서 로맨틱',
        underSaturn: '중지 아래 - 육체적 사랑 중시, 감정 표현 어려움',
        curvedUp: '위로 휨 - 감정 표현 적극적',
        straight: '직선 - 감정 표현 절제, 이성적 사랑'
      },

      curve: {
        deepCurve: '깊은 곡선 - 감정 표현 풍부, 열정적',
        gentleCurve: '완만한 곡선 - 따뜻하고 균형 잡힌 감정',
        straight: '직선 - 감정 통제, 논리적 접근',
        wavy: '물결 모양 - 감정 기복, 다양한 연애'
      },

      specialMarks: {
        chain: '사슬 - 감정적 불안정, 복잡한 연애사',
        island: '섬 - 해당 시기 감정적 고통, 실연',
        break: '끊김 - 심각한 이별, 감정적 트라우마',
        branches: {
          upward: '위로 향하는 가지 - 행복한 관계',
          downward: '아래로 향하는 가지 - 실망, 상실'
        },
        fork: {
          atEnd: '끝이 갈라짐 - 감정과 이성의 균형',
          trident: '삼지창 모양 - 행운의 표시'
        }
      }
    },

    fateLine: {
      name: '운명선 (Fate Line / Saturn Line / Career Line)',
      location: '손바닥 중앙을 세로로 지나며 중지 방향',
      meaning: '인생 방향, 커리어, 운명, 외부의 영향',
      absence: '없어도 정상 - 자유로운 삶, 스스로 개척',

      startingPoint: {
        fromWrist: '손목에서 시작 - 어릴 때부터 목표 명확, 가족 지원',
        fromLifeLine: '생명선에서 시작 - 자수성가, 가족의 도움으로 성공',
        fromHeadLine: '두뇌선에서 시작 - 30대 후반 성공, 지적 노력',
        fromHeartLine: '감정선에서 시작 - 늦은 성공, 50대 이후',
        fromMoonMount: '월구에서 시작 - 대중의 인정, 예술/연예계',
        fromPlainOfMars: '화성 평원 - 자기 힘으로 중년에 성공',
        fromVenusMount: '금성구에서 - 가족/이성의 도움으로 성공'
      },

      ending: {
        toSaturn: '토성구(중지 아래) - 전통적 성공, 안정된 커리어',
        toJupiter: '목성구(검지 아래) - 리더십, 권력, 야망 실현',
        toApollo: '태양구(약지 아래) - 명성, 예술적 성공',
        toMercury: '수성구(새끼손가락 아래) - 사업, 커뮤니케이션 성공'
      },

      quality: {
        deep: '깊고 선명 - 강한 운명, 명확한 인생 경로',
        faint: '희미함 - 변화가 많은 삶, 유연한 경로',
        broken: '끊어짐 - 커리어 변화, 방향 전환',
        double: '이중 - 두 가지 커리어, 부업',
        wavy: '물결 - 불안정한 커리어, 방황'
      }
    },

    sunLine: {
      name: '태양선 (Sun Line / Apollo Line / Success Line)',
      location: '약지 아래 태양구 방향으로 뻗는 선',
      meaning: '성공, 명성, 재능 발휘, 행복, 창의적 성취',
      absence: '없어도 성공 가능 - 다만 대중적 인정은 적을 수 있음',

      startingPoint: {
        fromWrist: '손목 - 어릴 때부터 재능 인정',
        fromHeadLine: '두뇌선 - 30대 중반 이후 인정',
        fromHeartLine: '감정선 - 50대 이후 늦은 명성',
        fromFateLine: '운명선 - 커리어를 통한 명성',
        fromLifeLine: '생명선 - 가족 지원으로 성공',
        fromMoonMount: '월구 - 대중적 인기, 창작 성공'
      },

      quality: {
        strong: '선명함 - 확실한 성공과 인정',
        multiple: '여러 개 - 다방면 재능, 여러 분야 성공',
        broken: '끊어짐 - 성공의 부침',
        star: '별 표시 - 갑작스러운 명성'
      }
    },

    mercuryLine: {
      name: '건강선 / 수성선 (Mercury Line / Health Line)',
      location: '손바닥 하단에서 새끼손가락 방향 사선',
      meaning: '건강 상태, 사업 수완, 커뮤니케이션',
      absence: '없는 것이 좋음 - 건강하다는 표시',

      quality: {
        absent: '없음 - 건강 양호의 표시',
        faint: '희미 - 전반적 건강 양호',
        strong: '선명 - 건강에 신경 쓸 필요, 소화기 주의',
        broken: '끊어짐 - 간헐적 건강 문제',
        wavy: '물결 - 소화기계 약함',
        chained: '사슬 - 만성 건강 문제 가능성'
      }
    }
  },

  // ==========================================
  // 제3부: 부가 손금선 (Minor Lines)
  // ==========================================
  minorLines: {
    marriageLines: {
      name: '결혼선 / 애정선 (Marriage Lines / Affection Lines)',
      location: '새끼손가락 아래, 감정선 위의 짧은 가로선',
      meaning: '중요한 연애 관계, 결혼, 깊은 감정적 유대',

      count: {
        none: '독신 선호 또는 감정 표현 절제',
        one: '한 번의 중요한 관계',
        two: '두 번의 중요한 관계',
        many: '여러 연애, 감정이 풍부함',
        mainPlusSmall: '한 번의 결혼 + 짧은 연애들'
      },

      length: {
        long: '오래 지속되는 관계',
        short: '짧은 관계 또는 열정적이지만 짧은 사랑',
        veryLong: '태양구까지 도달 - 명사와 결혼 또는 결혼으로 성공'
      },

      shape: {
        straight: '직선 - 안정적 관계',
        curved: {
          up: '위로 휨 - 결혼하지 않거나 늦은 결혼',
          down: '아래로 휨 - 파트너보다 오래 삶 또는 관계 악화'
        },
        forked: {
          atEnd: '끝이 갈라짐 - 별거 또는 이혼 가능성',
          atStart: '시작이 갈라짐 - 결혼 전 장애물'
        }
      },

      position: {
        nearHeart: '감정선 가까이 - 이른 결혼 (20대 초)',
        middle: '중간 - 적당한 시기 결혼 (25-35)',
        nearFinger: '새끼손가락 가까이 - 늦은 결혼 (35 이후)'
      },

      specialMarks: {
        island: '섬 - 관계 중 문제',
        cross: '십자 - 장애물',
        star: '별 - 행운의 결혼'
      }
    },

    childrenLines: {
      name: '자녀선 (Children Lines)',
      location: '결혼선에서 위로 뻗는 수직선',
      meaning: '자녀 가능성, 자녀와의 관계',

      interpretation: {
        deep: '깊고 선명 - 건강한 자녀',
        faint: '희미 - 가능성 있는 자녀',
        long: '긴 선 - 남자아이 또는 강한 영향력의 자녀',
        short: '짧은 선 - 여자아이 또는 조용한 성격의 자녀'
      }
    },

    travelLines: {
      name: '여행선 (Travel Lines)',
      location: '생명선 반대편 손바닥 가장자리(월구 옆)',
      meaning: '중요한 여행, 거주지 변화, 이민',

      interpretation: {
        many: '많은 선 - 여행을 좋아함, 이동이 많은 삶',
        long: '긴 선 - 해외 이주 또는 장기 여행',
        crossingFate: '운명선과 교차 - 여행이 인생에 큰 영향'
      }
    },

    braceletLines: {
      name: '손목선 / 라세트 (Bracelet Lines / Rascettes)',
      location: '손목과 손바닥 경계의 가로선',
      meaning: '건강, 부, 행운의 전통적 지표',

      count: {
        three: '세 줄 - 건강하고 부유한 삶',
        two: '두 줄 - 보통의 건강과 부',
        one: '한 줄 - 건강 관리 필요'
      },

      shape: {
        straight: '직선 - 건강 양호',
        chained: '사슬 - 초기 삶의 어려움',
        archedUp: '위로 솟음 - 여성의 경우 출산 관련 주의'
      }
    },

    girdelOfVenus: {
      name: '금성대 (Girdle of Venus)',
      location: '감정선 위, 검지와 약지 사이를 잇는 반원',
      meaning: '극도의 감수성, 예술적 기질, 감정의 깊이',

      presence: {
        complete: '완전한 반원 - 매우 감수성 예민, 예술적',
        broken: '끊어진 형태 - 감수성 있으나 통제 가능',
        multiple: '여러 개 - 복잡한 감정, 신경과민 경향'
      },

      interpretation: '있으면 매우 민감하고 로맨틱, 예술적 재능 있으나 스트레스에 취약'
    },

    ringOfSolomon: {
      name: '솔로몬의 반지 / 목성환 (Ring of Solomon)',
      location: '검지 아래 목성구를 감싸는 반원',
      meaning: '타고난 지혜, 리더십, 타인을 이해하는 능력',
      rarity: '희귀함',

      interpretation: {
        complete: '완전한 반지 - 뛰어난 통찰력, 지도자 자질',
        partial: '부분적 - 직관력 있으나 개발 필요',
        withStar: '별과 함께 - 탁월한 성공'
      }
    },

    ringOfSaturn: {
      name: '토성환 (Ring of Saturn)',
      location: '중지 아래 토성구를 감싸는 반원',
      meaning: '고독, 우울 경향, 깊은 사색',
      interpretation: '주의 필요 - 자기 고립 경향, 우울증 경향'
    },

    ringOfApollo: {
      name: '태양환 (Ring of Apollo)',
      location: '약지 아래 태양구를 감싸는 반원',
      meaning: '예술적 재능의 장애, 완벽주의로 인한 방해',
      interpretation: '재능은 있으나 발휘에 장애물, 자기 의심'
    },

    viaLascivia: {
      name: '쾌락선 (Via Lascivia / Line of Lasciviousness)',
      location: '금성구에서 월구로 향하는 선',
      meaning: '감각적 쾌락 추구, 중독 경향',
      interpretation: '있으면 쾌락 추구 성향, 절제 필요'
    },

    intuitionLine: {
      name: '직감선 (Line of Intuition)',
      location: '월구에서 시작해 수성구 방향 반원',
      meaning: '강한 직관력, 예지력, 심리적 능력',
      rarity: '매우 희귀',

      interpretation: {
        present: '있으면 - 뛰어난 직관력, 상담/심리 분야 적성',
        strong: '선명하면 - 예지력, 초감각적 능력 가능성'
      }
    },

    lineOfMars: {
      name: '화성선 / 생명선 보조선 (Line of Mars / Inner Life Line)',
      location: '생명선 안쪽, 평행하게 달리는 선',
      meaning: '추가 생명력, 보호, 강한 체력',
      rarity: '비교적 드묾',

      interpretation: {
        present: '있으면 - 강한 회복력, 수호천사, 위험에서 보호',
        strong: '선명하면 - 매우 강한 생명력, 군인/운동선수 적성'
      }
    },

    solomonLine: {
      name: '선생선 / 의학선 (Teacher\'s Line / Medical Stigmata)',
      location: '수성구에 있는 3-4개의 짧은 수직선',
      meaning: '치유 능력, 가르치는 재능, 의료/교육 적성',

      interpretation: {
        present: '있으면 - 타인을 돕는 직업 적성',
        strong: '선명하면 - 의사, 간호사, 치료사, 교사 재능'
      }
    },

    luckLine: {
      name: '행운선 (Luck Line)',
      location: '생명선 안쪽 짧은 세로선들',
      meaning: '행운, 재물운, 기회',

      interpretation: {
        many: '많으면 - 재물 기회 많음',
        clear: '선명하면 - 확실한 재물운'
      }
    },

    influenceLines: {
      name: '영향선 (Influence Lines)',
      location: '주요 선들로 향하거나 교차하는 작은 선들',
      meaning: '타인의 영향, 중요한 만남, 인생 변화',

      onLifeLine: '생명선으로 - 건강이나 삶에 영향 주는 사람/사건',
      onFateLine: '운명선으로 - 커리어에 영향 주는 사람',
      onHeartLine: '감정선으로 - 감정적 영향, 연애 관계'
    },

    worriesLines: {
      name: '걱정선 / 스트레스선 (Worry Lines / Stress Lines)',
      location: '엄지 쪽에서 손바닥을 가로지르는 잔선들',
      meaning: '걱정, 스트레스, 과민한 성격',

      interpretation: {
        many: '많으면 - 걱정이 많고 예민함',
        few: '적으면 - 태평하고 느긋함',
        crossingLifeLine: '생명선 교차 - 건강 스트레스',
        crossingFateLine: '운명선 교차 - 커리어 스트레스'
      }
    },

    samaritanLines: {
      name: '사마리아인 선 (Samaritan Lines)',
      location: '감정선 아래 작은 수직선들',
      meaning: '타인을 돕는 성향, 봉사정신',
      interpretation: '있으면 - 이타적, 상담/의료/사회복지 적성'
    }
  },

  // ==========================================
  // 제4부: 손바닥의 구 (Mounts)
  // ==========================================
  mounts: {
    jupiter: {
      name: '목성구 (Mount of Jupiter)',
      location: '검지 아래',
      meaning: '야망, 리더십, 자존감, 종교/영성',
      element: '목(木)',

      development: {
        wellDeveloped: '볼록함 - 강한 리더십, 야망, 자신감, 권위 추구',
        flat: '평평함 - 겸손, 야망 적음',
        overDeveloped: '과도하게 볼록 - 오만, 독재적 경향',
        underDeveloped: '함몰 - 자신감 부족, 소극적'
      },

      specialMarks: {
        star: '별 - 뛰어난 성공, 명예',
        cross: '십자 - 행복한 결혼, 진정한 사랑',
        square: '사각형 - 천부적 교육자',
        triangle: '삼각형 - 외교적 재능',
        grille: '격자 - 야망 실현의 장애'
      }
    },

    saturn: {
      name: '토성구 (Mount of Saturn)',
      location: '중지 아래',
      meaning: '책임감, 지혜, 운명, 고독, 학문',
      element: '토(土)',

      development: {
        wellDeveloped: '볼록함 - 신중함, 책임감, 학구적',
        flat: '평평함 (정상) - 균형 잡힌 성격',
        overDeveloped: '과도하게 볼록 - 우울, 염세적',
        underDeveloped: '함몰 - 무책임, 산만'
      },

      specialMarks: {
        star: '별 - 운명적 사건 (긍정 또는 부정)',
        cross: '십자 - 신비로운 경험',
        square: '사각형 - 위험으로부터 보호',
        triangle: '삼각형 - 과학/오컬트 재능'
      }
    },

    apollo: {
      name: '태양구 / 아폴로구 (Mount of Apollo/Sun)',
      location: '약지 아래',
      meaning: '창의력, 예술, 명성, 성공, 행복',
      element: '화(火)',

      development: {
        wellDeveloped: '볼록함 - 창의적, 매력적, 예술적 재능',
        flat: '평평함 - 예술에 무관심, 실용주의',
        overDeveloped: '과도하게 볼록 - 허영, 과시욕',
        underDeveloped: '함몰 - 무미건조한 삶'
      },

      specialMarks: {
        star: '별 - 갑작스러운 명성, 예술적 성공',
        cross: '십자 - 재정 문제 또는 명성 손상 주의',
        square: '사각형 - 명성 보호',
        triangle: '삼각형 - 과학+예술 결합 재능',
        trident: '삼지창 - 명성, 부, 행복 모두 획득'
      }
    },

    mercury: {
      name: '수성구 (Mount of Mercury)',
      location: '새끼손가락 아래',
      meaning: '커뮤니케이션, 사업, 과학, 의술, 웅변',
      element: '수(水)',

      development: {
        wellDeveloped: '볼록함 - 뛰어난 의사소통, 사업 수완',
        flat: '평평함 - 표현력 부족',
        overDeveloped: '과도하게 볼록 - 말이 많음, 속이는 경향',
        underDeveloped: '함몰 - 수줍음, 의사소통 어려움'
      },

      specialMarks: {
        star: '별 - 과학/사업 분야 성공',
        cross: '십자 - 속이는 경향 주의',
        square: '사각형 - 정신적 능력 보호',
        medicalStigmata: '수직선 3-4개 - 치유/의료 재능'
      }
    },

    venus: {
      name: '금성구 (Mount of Venus)',
      location: '엄지 아래, 생명선 안쪽',
      meaning: '사랑, 열정, 생명력, 음악, 가족애',
      element: '금(金)',

      development: {
        wellDeveloped: '볼록함 - 따뜻함, 열정, 생명력, 음악적 재능',
        flat: '평평함 - 냉담, 감정 억제',
        overDeveloped: '과도하게 볼록 - 쾌락 추구, 탐욕',
        underDeveloped: '함몰 - 에너지 부족, 냉정'
      },

      texture: {
        firm: '단단함 - 활력, 건강',
        soft: '부드러움 - 게으름 경향',
        withLines: '잔선 많음 - 복잡한 감정생활'
      },

      specialMarks: {
        star: '별 - 사랑의 성공',
        cross: '십자 - 사랑의 장애물',
        square: '사각형 - 열정으로부터 보호',
        grille: '격자 - 과도한 욕망'
      }
    },

    luna: {
      name: '월구 / 달의 구 (Mount of Luna/Moon)',
      location: '새끼손가락 아래 손바닥 하단 바깥쪽',
      meaning: '상상력, 직관, 창의력, 여행, 잠재의식',
      element: '수(水)',

      development: {
        wellDeveloped: '볼록함 - 상상력 풍부, 직관적, 창의적',
        flat: '평평함 - 현실적, 상상력 부족',
        overDeveloped: '과도하게 볼록 - 공상에 빠짐, 비현실적',
        underDeveloped: '함몰 - 상상력 결핍'
      },

      specialMarks: {
        star: '별 - 명성 (특히 물/여행 관련)',
        cross: '십자 - 자기 기만 경향',
        square: '사각형 - 여행 중 보호',
        triangle: '삼각형 - 직관적 재능'
      }
    },

    marsPositive: {
      name: '상화성구 / 적극적 화성 (Upper Mars / Mars Positive)',
      location: '목성구와 금성구 사이 (엄지-검지 사이 아래)',
      meaning: '용기, 공격성, 투쟁심',

      development: {
        wellDeveloped: '볼록함 - 용감함, 결단력',
        flat: '평평함 - 소심함',
        overDeveloped: '과도하게 볼록 - 공격적, 폭력적'
      }
    },

    marsNegative: {
      name: '하화성구 / 소극적 화성 (Lower Mars / Mars Negative)',
      location: '수성구와 월구 사이',
      meaning: '인내심, 저항력, 도덕적 용기',

      development: {
        wellDeveloped: '볼록함 - 인내심, 정신적 강인함',
        flat: '평평함 - 쉽게 포기',
        overDeveloped: '과도하게 볼록 - 완고함'
      }
    },

    plainOfMars: {
      name: '화성 평원 (Plain of Mars)',
      location: '손바닥 중앙',
      meaning: '전체적인 에너지 레벨, 기질',

      appearance: {
        hollow: '오목함 - 에너지 낮음, 소극적',
        flat: '평평함 - 균형 잡힌 기질',
        raised: '볼록함 - 에너지 높음, 공격적 경향'
      },

      specialMarks: {
        triangle: '삼각형 - 군사/전략적 재능, 큰 성공',
        cross: '십자 (신비의 십자) - 직관력, 심령 능력'
      }
    }
  },

  // ==========================================
  // 제5부: 특수 손금 (Special Palm Features)
  // ==========================================
  specialFeatures: {
    simianLine: {
      name: '막손금 / 원숭이선 / 단일 가로 손금 (Simian Line / Single Transverse Palmar Crease)',
      prevalence: '전체 인구의 1-4% (아시아인에서 약간 더 흔함)',
      medical: '다운증후군의 지표가 될 수 있으나, 건강한 사람에게도 나타남',

      definition: '두뇌선과 감정선이 완전히 합쳐져 하나의 선으로 손바닥을 가로지름',

      characteristics: [
        '이성과 감정의 분리가 없음',
        '극도의 집중력과 몰입',
        '흑백논리, 중간이 없음',
        '한 가지에 올인하거나 완전 무관심',
        '강한 의지력과 고집',
        '비범한 재능의 가능성'
      ],

      positiveTraits: [
        '탁월한 집중력',
        '전문 분야에서 뛰어난 성취',
        '강한 추진력과 끈기',
        '독창적 사고',
        '목표 달성에 대한 강한 의지'
      ],

      negativeTraits: [
        '융통성 부족',
        '타협이 어려움',
        '극단적 사고 경향',
        '인간관계에서 어려움',
        '스트레스 관리 어려움'
      ],

      famousPersons: '토니 블레어, 힐러리 클린턴, 로버트 드 니로 등 많은 성공한 인물들에게서 발견',

      careers: '연구자, 과학자, 예술가, 운동선수, 기업가 등 깊은 몰입이 필요한 분야',

      advice: [
        '유연성을 의식적으로 기르세요',
        '다양한 관점을 받아들이는 연습',
        '감정과 이성 사이 균형 찾기',
        '스트레스 해소 방법 개발',
        '타인의 의견에 열린 마음 갖기'
      ]
    },

    sydneyLine: {
      name: '시드니선 (Sydney Line)',
      prevalence: '약 5-10%',
      definition: '두뇌선이 손바닥 끝(새끼손가락 쪽)까지 완전히 가로지름',

      characteristics: [
        '과잉 사고, 분석 마비',
        '걱정이 많음',
        '완벽주의',
        '세부사항에 집착',
        '높은 지능'
      ],

      advice: '생각을 멈추고 행동하는 연습, 완벽하지 않아도 된다는 것 받아들이기'
    },

    mSign: {
      name: 'M자 손금 (M Sign / Letter M)',
      definition: '생명선, 두뇌선, 감정선, 운명선이 M자를 형성',
      prevalence: '비교적 희귀함',

      meaning: [
        '재물운이 매우 좋음',
        '직관력이 뛰어남',
        '자수성가 타입',
        '리더십과 사업 수완',
        '사람 보는 눈이 정확함'
      ],

      interpretation: 'M자가 선명할수록 이러한 특성이 강함'
    },

    mysticCross: {
      name: '신비의 십자 (Mystic Cross)',
      location: '두뇌선과 감정선 사이 손바닥 중앙',
      prevalence: '희귀함',

      meaning: [
        '초자연적 현상에 관심',
        '강한 직관력',
        '영적 능력',
        '예지력',
        '신비주의적 경향'
      ],

      interpretation: '위치와 선명도에 따라 해석이 달라짐'
    },

    writersFork: {
      name: '작가의 포크 (Writer\'s Fork / Fork of Imagination)',
      location: '두뇌선 끝이 두 갈래로 갈라짐',

      meaning: [
        '창의력과 논리력의 균형',
        '글쓰기 재능',
        '상상력과 실용성 겸비',
        '다재다능함'
      ],

      interpretation: '갈라짐이 선명할수록 재능이 뚜렷함'
    },

    healersMarks: {
      name: '치유자의 표시 (Healer\'s Marks / Medical Stigmata)',
      location: '수성구에 3-4개의 짧은 수직선',

      meaning: [
        '치유 능력',
        '타인을 돕는 성향',
        '의료/상담 분야 재능'
      ],

      careers: '의사, 간호사, 치료사, 상담사, 수의사'
    },

    ringOfSolomon: {
      name: '솔로몬의 반지 (Ring of Solomon)',
      location: '검지 아래 목성구를 감싸는 반원',
      prevalence: '희귀함',

      meaning: [
        '타고난 지혜',
        '뛰어난 판단력',
        '리더십',
        '타인 이해 능력',
        '교육자/상담가 재능'
      ]
    },

    bow: {
      name: '활 모양 (Bow on Palm)',
      location: '다양한 위치에 나타날 수 있는 활 모양',

      interpretation: {
        onJupiter: '목성구에 - 야망의 성취',
        onApollo: '태양구에 - 예술적 성공',
        onMercury: '수성구에 - 과학/사업 성공'
      }
    },

    triangle: {
      name: '삼각형 (Triangle)',
      meaning: '위치에 따라 재능과 성공을 나타냄',

      locations: {
        palmCenter: '손바닥 중앙 - 큰 성공, 재물운, 행운',
        jupiter: '목성구 - 외교적 재능, 리더십',
        saturn: '토성구 - 과학적 재능',
        apollo: '태양구 - 예술적 성공',
        mercury: '수성구 - 과학/사업 성공',
        venus: '금성구 - 사랑의 전략',
        moon: '월구 - 상상력/직관력',
        mars: '화성구 - 군사적 재능'
      }
    },

    square: {
      name: '사각형 / 보호 표시 (Square / Protection Mark)',
      meaning: '해당 영역에서 보호, 위험 방지',

      locations: {
        onLine: '선 위 - 해당 시기 위험으로부터 보호',
        onMount: '구 위 - 해당 영역의 보호'
      }
    },

    star: {
      name: '별 (Star)',
      meaning: '갑작스러운 사건, 행운 또는 충격 (위치에 따라)',

      locations: {
        jupiter: '목성구 - 갑작스러운 성공, 명예',
        saturn: '토성구 - 운명적 사건 (좋거나 나쁨)',
        apollo: '태양구 - 갑작스러운 명성',
        mercury: '수성구 - 과학/사업 성공',
        venus: '금성구 - 사랑의 성공',
        moon: '월구 - 상상력/직관력의 성공',
        onLifeLine: '생명선 위 - 위기 또는 충격',
        onHeadLine: '두뇌선 위 - 정신적 성취 또는 충격',
        onHeartLine: '감정선 위 - 감정적 성취 또는 충격'
      }
    },

    cross: {
      name: '십자 (Cross)',
      meaning: '장애물, 변화, 희생 (위치에 따라)',

      locations: {
        jupiter: '목성구 - 행복한 결혼, 진정한 사랑',
        saturn: '토성구 - 신비로운 경험',
        apollo: '태양구 - 재정/명성 장애',
        mercury: '수성구 - 정직성 문제',
        palmCenter: '손바닥 중앙 - 신비의 십자 (직관력)',
        onLine: '선 위 - 해당 시기 장애물'
      }
    },

    island: {
      name: '섬 (Island)',
      meaning: '해당 시기 약화, 장애, 분산',

      onLines: {
        lifeLine: '생명선 - 건강 약화 시기',
        headLine: '두뇌선 - 정신적 스트레스, 집중력 저하',
        heartLine: '감정선 - 감정적 고통, 관계 문제',
        fateLine: '운명선 - 커리어 불안정'
      }
    },

    chain: {
      name: '사슬 (Chain)',
      meaning: '약화, 불안정, 장애물',

      onLines: {
        lifeLine: '생명선 - 초기 건강 문제, 에너지 분산',
        headLine: '두뇌선 - 집중력 부족, 우유부단',
        heartLine: '감정선 - 감정 불안정, 복잡한 관계'
      }
    },

    grille: {
      name: '격자 (Grille)',
      meaning: '에너지 분산, 장애물',

      onMounts: {
        jupiter: '목성구 - 야망의 좌절',
        venus: '금성구 - 과도한 욕망',
        moon: '월구 - 상상력의 잘못된 사용'
      }
    },

    dot: {
      name: '점 (Dot)',
      meaning: '일시적 장애, 특정 시점의 사건',

      colors: {
        red: '붉은 점 - 열병, 열정, 분노',
        white: '흰 점 - 신경 문제',
        dark: '어두운 점 - 만성 문제'
      }
    },

    trident: {
      name: '삼지창 (Trident)',
      meaning: '매우 행운의 표시',

      locations: {
        apollo: '태양구 끝 - 명성, 부, 행복 모두',
        jupiter: '목성구 - 최고의 성공',
        fateLine: '운명선 끝 - 위대한 성취'
      }
    },

    fish: {
      name: '물고기 표시 (Fish Sign)',
      meaning: '번영, 부, 영적 성장',
      rarity: '희귀함',
      interpretation: '있으면 매우 행운, 특히 재물운'
    },

    flag: {
      name: '깃발 표시 (Flag Sign)',
      meaning: '명성과 성공',
      rarity: '매우 희귀함'
    },

    lotus: {
      name: '연꽃 표시 (Lotus Sign)',
      meaning: '부, 럭셔리, 고급스러운 삶',
      rarity: '매우 희귀함',
      origin: '인도 손금학'
    },

    temple: {
      name: '사원 표시 (Temple Sign)',
      meaning: '영적 깨달음, 철학적 성향',
      rarity: '매우 희귀함',
      origin: '인도 손금학'
    },

    conch: {
      name: '소라 표시 (Conch Sign)',
      meaning: '부와 명성',
      rarity: '매우 희귀함',
      origin: '인도 손금학'
    }
  },

  // ==========================================
  // 제6부: 손가락 분석 (Finger Analysis)
  // ==========================================
  fingers: {
    general: {
      length: {
        long: '사색적, 세부 지향적',
        short: '직관적, 행동 지향적',
        equal: '균형 잡힌 성격'
      },

      spacing: {
        wide: '독립적, 개방적',
        close: '신중함, 내성적',
        uneven: '개성이 강함'
      },

      flexibility: {
        flexible: '적응력, 유연함',
        stiff: '완고함, 신중함'
      },

      tips: {
        pointed: '직관적, 이상주의적',
        conic: '예술적, 충동적',
        square: '실용적, 질서정연',
        spatulate: '활동적, 독창적'
      },

      knuckles: {
        smooth: '직관적, 충동적',
        knotty: '분석적, 철학적'
      }
    },

    thumb: {
      name: '엄지 (Thumb)',
      meaning: '의지력, 논리, 자아',

      length: {
        long: '강한 의지력, 리더십',
        short: '의지력 약함, 감정적',
        average: '균형 잡힌 의지력'
      },

      angle: {
        wide: '90도 이상 - 관대함, 독립적',
        narrow: '45도 이하 - 신중함, 보수적',
        medium: '균형 잡힌 성격'
      },

      phalanges: {
        first: '의지력',
        second: '논리력'
      },

      tip: {
        square: '실용적, 신중함',
        conic: '예술적, 외교적',
        spatulate: '활동적, 독창적',
        clubbed: '완고함, 격정적'
      },

      flexibility: {
        flexible: '적응력, 낭비 경향',
        stiff: '완고함, 절약'
      }
    },

    jupiter: {
      name: '검지 / 목성 손가락 (Jupiter Finger / Index Finger)',
      meaning: '야망, 리더십, 자존감',

      length: {
        longerThanRing: '약지보다 김 - 강한 리더십, 야망',
        shorterThanRing: '약지보다 짧음 - 자신감 부족',
        equalToRing: '약지와 같음 - 균형 잡힌 자아'
      },

      lean: {
        towardSaturn: '중지 쪽으로 기울음 - 물질적 안정 추구',
        straightUp: '곧게 섬 - 독립적',
        awayFromSaturn: '반대로 기울음 - 독립심 강함'
      }
    },

    saturn: {
      name: '중지 / 토성 손가락 (Saturn Finger / Middle Finger)',
      meaning: '책임감, 균형, 가치관',

      length: {
        long: '심각함, 고독 선호',
        short: '경솔함, 책임 회피',
        proportionate: '균형 잡힌 책임감'
      },

      lean: {
        towardJupiter: '검지 쪽 - 야망',
        towardApollo: '약지 쪽 - 예술적 성향',
        straight: '곧게 - 균형 잡힌'
      }
    },

    apollo: {
      name: '약지 / 태양 손가락 (Apollo Finger / Ring Finger)',
      meaning: '창의력, 예술, 자기표현',

      length: {
        longerThanIndex: '검지보다 김 - 도박꾼 기질, 위험 감수',
        shorterThanIndex: '검지보다 짧음 - 신중함, 위험 회피',
        equalToIndex: '검지와 같음 - 균형 잡힌 위험 감수'
      },

      lean: {
        towardSaturn: '중지 쪽 - 예술보다 실용성',
        towardMercury: '새끼손가락 쪽 - 사업적 예술가',
        straight: '곧게 - 순수한 예술적 표현'
      }
    },

    mercury: {
      name: '새끼손가락 / 수성 손가락 (Mercury Finger / Little Finger)',
      meaning: '커뮤니케이션, 사업, 성적 표현',

      length: {
        long: '약지 첫마디까지 - 뛰어난 의사소통',
        short: '짧음 - 표현력 어려움, 수줍음',
        veryShort: '매우 짧음 - 감정 표현 어려움'
      },

      setting: {
        low: '낮게 붙음 - 자신감 문제, 어린 시절 어려움',
        normal: '정상 - 건강한 자존감',
        high: '높게 붙음 - 자신감, 수완'
      },

      lean: {
        towardApollo: '약지 쪽 - 예술/사업 결합',
        awayFromApollo: '바깥쪽 - 독립적인 커뮤니케이터',
        straight: '곧게 - 정직한 커뮤니케이터'
      }
    }
  },

  // ==========================================
  // 제7부: 피부문양학 (Dermatoglyphics)
  // ==========================================
  dermatoglyphics: {
    introduction: '피부문양학은 손가락 지문과 손바닥 문양을 연구하는 과학적 분야로, 1920년대부터 학문적으로 연구됨',

    fingerprints: {
      loop: {
        name: '고리/와상문 (Loop)',
        prevalence: '가장 흔함 (약 60-70%)',
        meaning: '적응력, 유연함, 협조적',
        direction: {
          ulnar: '척골 방향 (바깥) - 적응력',
          radial: '요골 방향 (안쪽) - 개성적'
        }
      },

      whorl: {
        name: '소용돌이/와문 (Whorl)',
        prevalence: '약 25-35%',
        meaning: '개인주의적, 독창적, 완고함',
        types: {
          concentric: '동심원형 - 집중력, 고집',
          spiral: '나선형 - 창의력',
          doubleLoop: '이중 고리 - 다양한 관점, 우유부단'
        }
      },

      arch: {
        name: '아치/궁상문 (Arch)',
        prevalence: '약 5%',
        meaning: '실용적, 근면, 불신 경향',
        types: {
          plain: '일반 아치 - 단순함, 신중함',
          tented: '첨형 아치 - 열정적, 예민'
        }
      }
    },

    fingerprintCombinations: {
      allLoops: '모두 고리 - 적응력 뛰어남, 협조적',
      allWhorls: '모두 소용돌이 - 매우 개인주의적, 천재성 가능',
      mixed: '혼합 - 균형 잡힌 성격'
    },

    palmarPatterns: {
      thenarPattern: '무지구(금성구) 문양 - 성격 지표',
      hypothenarPattern: '소지구(월구) 문양 - 창의력 지표',
      interdigitalPatterns: '손가락 사이 문양 - 사회성 지표'
    }
  },

  // ==========================================
  // 제8부: 손의 색상과 질감 (Color & Texture)
  // ==========================================
  colorAndTexture: {
    color: {
      pink: {
        name: '분홍색',
        meaning: '건강, 균형, 낙천적',
        health: '좋은 혈액순환'
      },
      red: {
        name: '붉은색',
        meaning: '열정, 활력, 공격성',
        health: '고혈압 주의'
      },
      pale: {
        name: '창백함',
        meaning: '에너지 부족, 냉담',
        health: '빈혈, 순환 문제 주의'
      },
      yellow: {
        name: '노란색',
        meaning: '비관적, 신중함',
        health: '간 문제 주의'
      },
      blue: {
        name: '푸른빛',
        meaning: '순환 문제',
        health: '심장/순환 문제 주의'
      }
    },

    texture: {
      soft: {
        name: '부드러운 손',
        meaning: '세련됨, 감수성, 게으름 경향',
        career: '예술가, 지적 직업'
      },
      hard: {
        name: '거친 손',
        meaning: '근면, 실용적, 활동적',
        career: '육체 노동, 스포츠'
      },
      silky: {
        name: '비단결 손',
        meaning: '섬세함, 예민함',
        career: '예술, 상담'
      },
      dry: {
        name: '건조한 손',
        meaning: '스트레스, 건강 주의'
      },
      moist: {
        name: '촉촉한 손',
        meaning: '감정적, 신경 예민'
      }
    },

    temperature: {
      warm: '따뜻함 - 애정, 열정',
      cold: '차가움 - 내성적, 감정 억제'
    }
  },

  // ==========================================
  // 제9부: 시간 측정법 (Timing Methods)
  // ==========================================
  timing: {
    lifeLine: {
      method: '생명선의 시간 측정',
      points: {
        start: '0세',
        underIndex: '약 10세',
        underMiddle: '약 35-40세',
        towardWrist: '70-80세+'
      },
      note: '개인마다 차이가 있으며, 대략적인 참고용'
    },

    fateLine: {
      method: '운명선의 시간 측정',
      points: {
        wrist: '0-20세',
        headLine: '약 35세',
        heartLine: '약 50세',
        endPoint: '70세+'
      }
    },

    heartLine: {
      method: '감정선의 시간 측정 (오른쪽에서 왼쪽)',
      points: {
        underMercury: '어린 시절',
        center: '중년',
        underJupiter: '노년'
      }
    }
  },

  // ==========================================
  // 제10부: 양손 비교 (Both Hands)
  // ==========================================
  bothHands: {
    dominantHand: {
      meaning: '현재 상태, 의식적 자아, 노력으로 만든 삶',
      forRightHanded: '오른손',
      forLeftHanded: '왼손'
    },

    nonDominantHand: {
      meaning: '타고난 잠재력, 무의식, 내면의 자아',
      forRightHanded: '왼손',
      forLeftHanded: '오른손'
    },

    comparison: {
      similar: '양손이 비슷함 - 잠재력대로 살고 있음',
      different: '양손이 다름 - 많이 변화/성장함',
      dominantBetter: '우세손이 더 좋음 - 노력으로 개선',
      nonDominantBetter: '비우세손이 더 좋음 - 잠재력 미실현'
    }
  },

  // ==========================================
  // 제11부: 건강 지표 (Health Indicators)
  // ==========================================
  healthIndicators: {
    generalHealth: {
      lifeLine: '전반적 생명력, 면역력',
      mercuryLine: '소화기, 간',
      heartLine: '심장, 감정적 건강',
      headLine: '정신 건강, 신경계'
    },

    specificIndicators: {
      nails: {
        shape: {
          long: '호흡기 약함',
          short: '심장 관련',
          wide: '신경 예민'
        },
        color: {
          pink: '건강함',
          pale: '빈혈',
          blue: '순환 문제'
        },
        texture: {
          ridges: '영양 부족',
          spots: '아연 부족'
        }
      },

      islands: {
        onLifeLine: '해당 시기 건강 약화',
        onHeadLine: '정신적 스트레스',
        onHeartLine: '심장/감정 문제'
      },

      chains: {
        onLifeLine: '초기 건강 문제',
        onHeadLine: '두통, 집중력 문제'
      },

      grilles: {
        onMoonMount: '류머티즘 경향',
        onVenusMount: '과도한 욕망으로 인한 건강 문제'
      }
    },

    disclaimer: '손금의 건강 지표는 참고용이며, 의학적 진단을 대체할 수 없습니다.'
  },

  // ==========================================
  // 제12부: 동양 손금학 상세 (Eastern Palmistry)
  // ==========================================
  easternPalmistry: {
    chinese: {
      name: '중국 수상학 (手相學)',
      principles: [
        '음양 균형',
        '오행 (금목수화토)',
        '기의 흐름'
      ],

      uniqueLines: {
        childLine: '자녀선 - 자녀 운',
        wealthLine: '재물선 - 재운',
        ancestorLine: '조상선 - 조상 복'
      },

      philosophy: '손금은 바뀔 수 있다 - 노력과 수양으로 운명 개선 가능'
    },

    indian: {
      name: '인도 수상학 (Samudrik Shastra)',
      principles: [
        '카르마와 운명',
        '차크라와의 연결',
        '영적 성장'
      ],

      uniqueFeatures: {
        fishSign: '물고기 - 번영',
        lotusSign: '연꽃 - 부와 명예',
        templeSign: '사원 - 영적 깨달음'
      },

      philosophy: '손금은 전생의 업보와 현생의 노력을 반영'
    },

    japanese: {
      name: '일본 수상학',
      characteristics: '중국과 서양의 영향을 받아 발전',

      uniqueConcepts: {
        lifeEnergy: '생명 에너지 (기)',
        destinyPath: '운명의 길',
        spiritualConnection: '영적 연결'
      }
    },

    korean: {
      name: '한국 손금학',
      characteristics: '마의상법의 영향, 유교적 가치관 반영',

      emphasis: [
        '자녀운',
        '결혼운',
        '재물운',
        '관직운'
      ]
    }
  }
};

// AI 프롬프트 생성 함수
export function generateComprehensivePalmistryPrompt(): string {
  return `당신은 100년 경력의 세계적인 손금 전문가입니다.
동양(마의상법, 인도 Samudrik Shastra, 일본 수상학)과
서양 손금학(Cheiro, William Benham, Noel Jaquin)을 모두 통달했습니다.
피부문양학(Dermatoglyphics) 연구 논문과 Charlotte Wolff의 의학적 손금 연구도 숙지하고 있습니다.

## 세계 최고 수준의 손금 지식 데이터베이스 기반 분석

${JSON.stringify(PALMISTRY_DATABASE, null, 2)}

위 데이터베이스의 모든 지식을 활용하여 손금을 분석하세요.
`;
}
