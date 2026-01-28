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
      name: '막진손금 / 막손금 / 관통선 / 원숭이선 (Simian Line / Single Transverse Palmar Crease)',
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
  // 제12부: 손톱 상세 분석 (Nail Analysis)
  // ==========================================
  nailAnalysis: {
    introduction: '손톱은 건강 상태와 성격을 반영하는 중요한 지표입니다. Charlotte Wolff의 의학적 연구와 전통 손금학을 결합한 분석입니다.',

    shape: {
      long: {
        name: '긴 손톱',
        personality: '예술적 감각, 섬세함, 이상주의적',
        health: '호흡기 계통이 약할 수 있음, 폐와 기관지 주의',
        career: '예술가, 음악가, 작가, 디자이너'
      },
      short: {
        name: '짧은 손톱',
        personality: '비판적, 분석적, 현실적',
        health: '심장과 순환계 주의',
        career: '과학자, 비평가, 분석가'
      },
      wide: {
        name: '넓은 손톱',
        personality: '논쟁적, 강한 의견, 리더십',
        health: '신경계 예민, 스트레스 주의',
        career: '변호사, 정치인, 토론가'
      },
      narrow: {
        name: '좁은 손톱',
        personality: '섬세함, 예민함, 우아함',
        health: '척추와 뼈 건강 주의',
        career: '정밀 작업, 보석 세공, 외과의'
      },
      square: {
        name: '네모난 손톱',
        personality: '균형 잡힌, 논리적, 실용적',
        health: '전반적으로 양호',
        career: '엔지니어, 회계사, 관리자'
      },
      round: {
        name: '둥근 손톱',
        personality: '평화로움, 친화력, 낙천적',
        health: '양호하나 과식 주의',
        career: '상담사, 교사, 서비스업'
      },
      fan: {
        name: '부채꼴 손톱',
        personality: '신경질적, 예민, 걱정 많음',
        health: '신경계 문제, 스트레스성 질환 주의',
        career: '예술가, 창작자'
      },
      shell: {
        name: '조개 모양 손톱',
        personality: '감수성 풍부, 로맨틱',
        health: '척추 측만, 신경계 주의',
        career: '시인, 작가, 카운슬러'
      }
    },

    color: {
      pink: {
        name: '분홍색',
        meaning: '건강함, 좋은 혈액순환',
        health: '양호'
      },
      pale: {
        name: '창백함',
        meaning: '빈혈 가능성, 피로',
        health: '철분 부족, 영양 보충 필요'
      },
      red: {
        name: '붉은색',
        meaning: '고혈압 가능성, 열이 많음',
        health: '심혈관계 검사 권장'
      },
      blue: {
        name: '푸른색/보라색',
        meaning: '순환 장애, 산소 부족',
        health: '심장, 폐 기능 확인 필요'
      },
      yellow: {
        name: '노란색',
        meaning: '간 기능 이상 가능성, 흡연 영향',
        health: '간 기능 검사 권장'
      },
      white: {
        name: '흰색',
        meaning: '간 질환, 영양 결핍',
        health: '간 검사, 영양 상태 확인'
      },
      brown: {
        name: '갈색/검은색 줄',
        meaning: '멜라닌 침착, 피부과 확인 필요',
        health: '피부과 검진 권장'
      }
    },

    texture: {
      smooth: {
        name: '매끄러움',
        meaning: '건강함, 영양 상태 양호',
        health: '양호'
      },
      ridgedVertical: {
        name: '세로 줄무늬',
        meaning: '노화의 자연스러운 현상, 영양 부족 가능',
        health: '비타민 B, 철분 확인'
      },
      ridgedHorizontal: {
        name: '가로 줄무늬 (Beau\'s lines)',
        meaning: '과거의 심각한 질병이나 스트레스',
        health: '면역계 확인, 영양 보충'
      },
      pitted: {
        name: '움푹 파인 자국',
        meaning: '건선, 피부 질환 가능성',
        health: '피부과 검진 권장'
      },
      spoon: {
        name: '스푼형 (Koilonychia)',
        meaning: '철분 결핍성 빈혈',
        health: '혈액 검사 권장'
      },
      clubbed: {
        name: '곤봉형 (Clubbing)',
        meaning: '심폐 질환 가능성',
        health: '심장, 폐 기능 검사 필수'
      }
    },

    lunula: {
      introduction: '반달(반월) - 손톱 아래 흰색 반달 모양',

      size: {
        large: {
          name: '큰 반달 (손톱 1/4 이상)',
          meaning: '강한 에너지, 활력',
          health: '양호하나 고혈압 주의'
        },
        medium: {
          name: '중간 반달 (손톱 1/5 정도)',
          meaning: '균형 잡힌 건강',
          health: '양호'
        },
        small: {
          name: '작은 반달',
          meaning: '에너지 저하, 면역력 약화',
          health: '영양 보충, 휴식 필요'
        },
        absent: {
          name: '반달 없음',
          meaning: '영양 결핍, 순환 장애 가능',
          health: '건강 검진 권장'
        }
      },

      byFinger: {
        thumb: '엄지 반달 - 전체 에너지 레벨 반영 (가장 중요)',
        index: '검지 반달 - 소화기계, 장 건강',
        middle: '중지 반달 - 뇌, 심혈관계',
        ring: '약지 반달 - 내분비계, 생식기',
        little: '새끼손가락 반달 - 심장, 신장'
      },

      color: {
        white: '흰색 - 정상',
        pink: '분홍색 - 약간의 혈액순환 문제',
        blue: '푸른색 - 심장 문제 가능성, Wilson병',
        red: '붉은색 - 심장 문제, 류마티스'
      }
    },

    moons: {
      terry: {
        name: 'Terry\'s nails',
        description: '손톱 대부분이 흰색, 끝만 분홍',
        meaning: '간 질환, 당뇨, 심부전 가능성'
      },
      lindsay: {
        name: 'Lindsay\'s nails (Half-and-half)',
        description: '손톱 절반이 흰색, 절반이 갈색',
        meaning: '신장 질환 가능성'
      },
      muehrcke: {
        name: 'Muehrcke\'s nails',
        description: '흰색 가로줄 여러 개',
        meaning: '저알부민혈증, 신장 질환'
      }
    }
  },

  // ==========================================
  // 제13부: 손바닥 크기와 비율 (Palm Size & Proportions)
  // ==========================================
  palmSizeAndProportions: {
    introduction: 'Fred Gettings와 William Benham의 손 비율 연구 기반',

    palmSize: {
      large: {
        name: '큰 손바닥',
        characteristics: '손바닥 길이 10cm 이상, 너비 9cm 이상',
        personality: [
          '세부사항에 주의',
          '정밀한 작업 선호',
          '미세한 차이를 구별',
          '완벽주의 경향'
        ],
        paradox: '큰 손 = 세밀한 일 선호 (역설적)',
        careers: '시계공, 외과의, 조각가, 정밀 엔지니어링'
      },
      medium: {
        name: '중간 손바닥',
        characteristics: '손바닥 길이 8-10cm, 너비 7-9cm',
        personality: '균형 잡힌 접근, 다양한 적성',
        careers: '대부분의 직업에 적합'
      },
      small: {
        name: '작은 손바닥',
        characteristics: '손바닥 길이 8cm 이하',
        personality: [
          '큰 그림을 봄',
          '세부사항보다 전체적 시각',
          '빠른 판단',
          '대범한 계획'
        ],
        paradox: '작은 손 = 큰 일 선호 (역설적)',
        careers: '경영자, 기획자, 정치인, 프로듀서'
      }
    },

    ratios: {
      palmToFingers: {
        fingersLonger: {
          name: '손가락이 손바닥보다 김',
          meaning: '정신적 활동 선호, 이론적',
          ratio: '손가락 > 손바닥 길이'
        },
        palmLonger: {
          name: '손바닥이 손가락보다 김',
          meaning: '실용적, 행동 지향적',
          ratio: '손바닥 > 손가락 길이'
        },
        equal: {
          name: '손바닥과 손가락이 비슷',
          meaning: '균형 잡힌 성격',
          ratio: '손바닥 ≈ 손가락 길이'
        }
      },

      palmWidthToLength: {
        wide: {
          name: '손바닥이 넓음 (너비 > 길이)',
          meaning: '활동적, 에너지 넘침',
          element: '불/땅의 손'
        },
        narrow: {
          name: '손바닥이 좁음 (길이 > 너비)',
          meaning: '섬세함, 감수성',
          element: '물/공기의 손'
        },
        square: {
          name: '정사각형 (너비 = 길이)',
          meaning: '균형 잡힌, 실용적',
          element: '땅/공기의 손'
        }
      },

      fingerToFinger: {
        indexToRing: {
          name: '검지 vs 약지 비율 (2D:4D ratio)',
          scientific: '태아기 테스토스테론 노출도를 반영하는 과학적 지표',

          lowRatio: {
            name: '검지 < 약지 (2D:4D < 1)',
            meaning: '높은 테스토스테론 노출',
            traits: ['운동능력', '공간지각력', '위험감수', '남성적 특성'],
            correlations: '스포츠, 수학, 음악에서 성공 가능성'
          },
          highRatio: {
            name: '검지 > 약지 (2D:4D > 1)',
            meaning: '높은 에스트로겐 노출',
            traits: ['언어능력', '공감능력', '신중함', '여성적 특성'],
            correlations: '언어, 사회적 능력에서 강점'
          },
          equalRatio: {
            name: '검지 ≈ 약지 (2D:4D ≈ 1)',
            meaning: '균형 잡힌 호르몬 노출',
            traits: '다재다능, 적응력'
          },

          scientificStudies: [
            'Manning et al. (1998): 손가락 비율과 스포츠 능력 상관관계',
            'Voracek et al. (2006): 성별 차이 연구',
            'Williams et al. (2000): 발달 심리학 연구'
          ]
        }
      }
    },

    thickness: {
      thick: {
        name: '두꺼운 손',
        meaning: '물질적 욕구 강함, 감각적 쾌락 추구',
        health: '과식, 과음 주의',
        personality: '현실적, 실용적'
      },
      thin: {
        name: '얇은 손',
        meaning: '지적/정신적 욕구 강함',
        health: '영양 섭취 주의',
        personality: '이상주의적, 영적'
      },
      padded: {
        name: '살이 통통한 손',
        meaning: '편안함 추구, 럭셔리 선호',
        health: '당뇨, 고혈압 주의',
        personality: '관대함, 쾌락 추구'
      },
      bony: {
        name: '뼈가 두드러진 손',
        meaning: '절제, 금욕적',
        health: '영양, 휴식 필요',
        personality: '규율적, 엄격함'
      }
    },

    flexibility: {
      veryFlexible: {
        name: '매우 유연한 손 (손가락이 뒤로 많이 휨)',
        meaning: '적응력 뛰어남, 관대함, 낭비 경향',
        personality: '유연함, 열린 마음, 충동적',
        money: '돈을 쉽게 씀'
      },
      flexible: {
        name: '유연한 손',
        meaning: '적응력 있음, 유연한 사고',
        personality: '균형 잡힌, 합리적'
      },
      moderatelyStiff: {
        name: '약간 뻣뻣한 손',
        meaning: '신중함, 보수적',
        personality: '안정적, 신뢰할 수 있음',
        money: '저축을 잘함'
      },
      stiff: {
        name: '뻣뻣한 손',
        meaning: '완고함, 고집',
        personality: '변화 싫어함, 전통적',
        money: '인색할 수 있음'
      }
    }
  },

  // ==========================================
  // 제14부: 손가락 마디별 분석 (Phalanges Analysis)
  // ==========================================
  phalangesAnalysis: {
    introduction: 'Cheiro와 William Benham의 손가락 마디 분석법',

    generalPrinciple: {
      firstPhalanx: '첫째 마디 (손끝) - 정신적/영적 영역',
      secondPhalanx: '둘째 마디 (중간) - 지적/실용적 영역',
      thirdPhalanx: '셋째 마디 (손바닥 쪽) - 물질적/육체적 영역'
    },

    thumb: {
      name: '엄지',
      firstPhalanx: {
        name: '의지의 마디',
        long: '강한 의지력, 결단력',
        short: '의지력 약함, 우유부단',
        thick: '완고함, 고집',
        thin: '섬세한 의지력, 유연함',
        clubbed: '격정적, 폭발적 성격 (살인자의 엄지라 불림 - 과학적 근거 없음)',
        waisted: '외교적, 사려 깊음'
      },
      secondPhalanx: {
        name: '논리의 마디',
        long: '논리적 사고, 분석력',
        short: '직관적, 비논리적',
        thick: '실용적 논리',
        thin: '이론적 논리'
      }
    },

    jupiter: {
      name: '검지 (목성 손가락)',
      firstPhalanx: {
        long: '직관적 리더십, 영적 야망',
        short: '실용적 리더십'
      },
      secondPhalanx: {
        long: '야망을 실현하는 능력, 사업 수완',
        short: '아이디어는 있으나 실행력 부족'
      },
      thirdPhalanx: {
        long: '권력욕, 지배욕',
        short: '겸손함',
        thick: '물질적 야망'
      }
    },

    saturn: {
      name: '중지 (토성 손가락)',
      firstPhalanx: {
        long: '우울함, 철학적, 종교적',
        short: '가벼움, 낙천적'
      },
      secondPhalanx: {
        long: '과학적 능력, 농업/광업 적성',
        short: '학문적 관심 적음'
      },
      thirdPhalanx: {
        long: '인색함, 물질 집착',
        short: '경솔함, 낭비',
        thick: '우울 성향, 고독 선호'
      }
    },

    apollo: {
      name: '약지 (태양/아폴로 손가락)',
      firstPhalanx: {
        long: '예술적 이상, 순수 예술 추구',
        short: '예술 감상력 낮음'
      },
      secondPhalanx: {
        long: '예술의 실용적 적용, 디자인 능력',
        short: '창작보다 감상'
      },
      thirdPhalanx: {
        long: '물질적 성공 추구, 화려함 선호',
        short: '예술에서 물질적 보상 무관심',
        thick: '허영심, 과시욕'
      }
    },

    mercury: {
      name: '새끼손가락 (수성 손가락)',
      firstPhalanx: {
        long: '언변, 영적 커뮤니케이션',
        short: '말주변 적음'
      },
      secondPhalanx: {
        long: '과학적 능력, 의학 적성',
        short: '기술적 능력 부족'
      },
      thirdPhalanx: {
        long: '상업적 수완, 교활함 가능',
        short: '순진함, 사업 수완 부족',
        thick: '물질적 욕심'
      }
    },

    knottyFingers: {
      name: '마디가 튀어나온 손가락',
      firstKnot: {
        name: '첫번째 마디 (정신의 매듭)',
        meaning: '철학적 사고, 질서정연, 분석적'
      },
      secondKnot: {
        name: '두번째 마디 (물질의 매듭)',
        meaning: '물질적 질서, 정리정돈, 실용적'
      },
      bothKnots: {
        name: '두 마디 모두 발달',
        meaning: '극도로 분석적, 철학자 타입'
      }
    },

    smoothFingers: {
      name: '매끄러운 손가락 (마디가 두드러지지 않음)',
      meaning: '직관적, 충동적, 예술적',
      traits: ['빠른 판단', '영감에 의존', '분석보다 직감']
    }
  },

  // ==========================================
  // 제15부: 손금선 색상과 굵기 (Line Color & Width)
  // ==========================================
  lineColorAndWidth: {
    introduction: '손금선의 색상과 굵기는 에너지의 질과 건강 상태를 반영합니다',

    color: {
      pink: {
        name: '분홍빛 선',
        meaning: '건강함, 좋은 순환, 균형 잡힌 에너지',
        interpretation: '해당 영역에서 건강하고 긍정적'
      },
      red: {
        name: '붉은 선',
        meaning: '열정적, 강한 에너지, 과잉 활동',
        interpretation: '해당 영역에서 강렬하나 과열 주의',
        warning: '분노, 고혈압, 염증 가능성'
      },
      pale: {
        name: '창백한 선',
        meaning: '에너지 부족, 냉담, 약한 영향력',
        interpretation: '해당 영역에서 활력 필요',
        health: '빈혈, 순환 문제 확인'
      },
      yellow: {
        name: '누런 선',
        meaning: '간 문제, 비관적 성향',
        interpretation: '건강 검진 권장',
        health: '간 기능, 담즙 확인'
      },
      dark: {
        name: '어두운 선',
        meaning: '깊은 감정, 강한 인상',
        interpretation: '해당 영역에서 깊은 경험',
        variant: '우울함, 과거의 상처'
      },
      blue: {
        name: '푸른빛 선',
        meaning: '순환 장애, 산소 부족',
        interpretation: '건강 문제 가능성',
        health: '심폐 기능 확인 필요'
      }
    },

    width: {
      deep: {
        name: '깊고 넓은 선',
        meaning: '강한 에너지, 확고한 특성',
        interpretation: '해당 영역에서 강력한 영향력',
        traits: ['확고한 성격', '변치 않는 특성', '깊은 경험']
      },
      medium: {
        name: '중간 깊이 선',
        meaning: '균형 잡힌 에너지',
        interpretation: '건강한 수준의 영향력'
      },
      shallow: {
        name: '얕은 선',
        meaning: '약한 에너지, 변화 가능',
        interpretation: '해당 영역에서 영향력 약함',
        traits: ['유연함', '변화 가능성', '발달 필요']
      },
      thin: {
        name: '가느다란 선',
        meaning: '섬세함, 예민함',
        interpretation: '정교한 에너지',
        traits: ['예민함', '섬세한 반응', '스트레스에 취약']
      },
      broad: {
        name: '넓고 얕은 선',
        meaning: '분산된 에너지',
        interpretation: '집중력 부족, 에너지 분산',
        advice: '집중이 필요함'
      },
      chained: {
        name: '사슬 모양 선',
        meaning: '불안정, 분산, 장애물',
        interpretation: '해당 영역에서 어려움',
        health: '해당 영역의 건강 문제 가능'
      },
      doubled: {
        name: '이중 선',
        meaning: '보호, 추가 에너지',
        interpretation: '매우 강한 영향력, 수호 에너지',
        fortune: '행운의 표시'
      },
      frayed: {
        name: '닳아 헤어진 선',
        meaning: '에너지 분산, 약화',
        interpretation: '해당 영역에서 노력이 분산됨'
      }
    },

    clarity: {
      clear: {
        name: '선명한 선',
        meaning: '확실한 방향, 명확한 특성',
        fortune: '해당 영역에서 성공 가능성 높음'
      },
      fuzzy: {
        name: '흐릿한 선',
        meaning: '불확실함, 발전 중',
        advice: '명확한 목표 설정 필요'
      },
      intermittent: {
        name: '끊어졌다 이어지는 선',
        meaning: '변화, 전환, 재시작',
        interpretation: '삶의 변화를 나타냄'
      }
    }
  },

  // ==========================================
  // 제16부: 영향선 상세 분석 (Influence Lines Detail)
  // ==========================================
  influenceLinesDetail: {
    introduction: '영향선은 타인이나 사건이 우리 삶에 미치는 영향을 보여줍니다',

    toLifeLine: {
      name: '생명선으로 향하는 영향선',
      fromVenus: {
        name: '금성구에서 오는 선',
        meaning: '가족이나 가까운 사람의 영향',
        crossingLine: '부정적 영향, 스트레스',
        stoppingAtLine: '강한 지지, 도움'
      },
      crossingLife: {
        name: '생명선을 가로지르는 선',
        meaning: '삶에 큰 영향을 미치는 사건/사람',
        timing: '교차 지점으로 시기 추정 가능'
      }
    },

    toFateLine: {
      name: '운명선으로 향하는 영향선',
      fromVenus: {
        name: '금성구에서 운명선으로',
        meaning: '가족의 도움으로 커리어 성공'
      },
      fromMoon: {
        name: '월구에서 운명선으로',
        meaning: '대중의 지지, 팬층, 사회적 인정'
      },
      joiningFate: {
        name: '운명선과 합류하는 선',
        meaning: '중요한 파트너십, 결혼으로 인한 커리어 변화'
      },
      crossingFate: {
        name: '운명선을 가로지르는 선',
        meaning: '커리어에 장애물, 방해꾼'
      }
    },

    toHeartLine: {
      name: '감정선으로 향하는 영향선',
      fromVenus: {
        name: '금성구에서 감정선으로',
        meaning: '가족 영향으로 인한 감정적 사건'
      },
      crossingHeart: {
        name: '감정선을 가로지르는 선',
        meaning: '실연, 감정적 상처',
        timing: '교차 지점으로 시기 추정'
      },
      parallelToHeart: {
        name: '감정선과 평행한 선',
        meaning: '지속적인 감정적 지지자'
      }
    },

    toSunLine: {
      name: '태양선으로 향하는 영향선',
      meaning: '명성이나 성공에 영향을 미치는 사람',
      fromVenus: '가족의 도움으로 성공',
      fromMoon: '대중의 사랑으로 성공'
    },

    worryLines: {
      name: '걱정선 / 스트레스선',
      location: '금성구에서 손바닥을 가로지르는 잔선들',

      interpretation: {
        many: {
          name: '많은 걱정선',
          meaning: '과도한 걱정, 스트레스, 예민함',
          advice: '스트레스 관리 필요'
        },
        few: {
          name: '적은 걱정선',
          meaning: '낙천적, 태평함',
          personality: '스트레스에 강함'
        },
        deep: {
          name: '깊은 걱정선',
          meaning: '심각한 스트레스 사건',
          impact: '건강에 영향 가능'
        },
        light: {
          name: '가벼운 걱정선',
          meaning: '일상적 스트레스',
          impact: '관리 가능한 수준'
        }
      },

      crossing: {
        lifeLine: '생명선 교차 - 건강 관련 스트레스',
        headLine: '두뇌선 교차 - 정신적 스트레스, 결정 어려움',
        fateLine: '운명선 교차 - 커리어 스트레스',
        heartLine: '감정선 교차 - 관계 스트레스'
      }
    },

    supportLines: {
      name: '지지선 / 보호선',
      location: '주요 선과 평행하게 달리는 작은 선',

      onLifeLine: {
        name: '화성선 (생명선 보조)',
        meaning: '추가 생명력, 보호, 수호천사'
      },
      onHeadLine: {
        name: '두뇌선 보조선',
        meaning: '정신적 지지, 직관력'
      },
      onHeartLine: {
        name: '감정선 보조선',
        meaning: '감정적 안정, 지지자'
      },
      onFateLine: {
        name: '운명선 보조선',
        meaning: '커리어 지지, 파트너십'
      }
    }
  },

  // ==========================================
  // 제17부: 재물 삼각형과 행운 표시 (Money Triangle & Lucky Signs)
  // ==========================================
  moneyTriangleAndLuckySigns: {
    introduction: '재물과 행운을 나타내는 특별한 표시들',

    moneyTriangle: {
      name: '재물 삼각형 / 부의 삼각형 (Money Triangle / Wealth Triangle)',
      location: '두뇌선, 운명선, 건강선(또는 수성선)이 만나 형성하는 삼각형',

      interpretation: {
        clear: {
          name: '선명하고 폐쇄된 삼각형',
          meaning: '강한 재물운, 돈을 모으는 능력',
          traits: ['재테크 능력', '저축 습관', '재물 보존력']
        },
        large: {
          name: '큰 삼각형',
          meaning: '더 큰 재물운',
          fortune: '부를 축적할 큰 기회'
        },
        small: {
          name: '작은 삼각형',
          meaning: '적당한 재물운',
          advice: '꾸준한 저축으로 재물 축적'
        },
        open: {
          name: '열린 삼각형 (한 면이 약함)',
          meaning: '돈이 새어나감',
          advice: '지출 관리 필요',
          leak: {
            headLine: '두뇌선 쪽 열림 - 투자 실패',
            fateLine: '운명선 쪽 열림 - 사업 손실',
            mercuryLine: '건강선 쪽 열림 - 건강비용, 도난'
          }
        },
        absent: {
          name: '삼각형 없음',
          meaning: '재물 삼각형 없음',
          advice: '다른 재물 지표 확인'
        }
      },

      enhancements: {
        star: '삼각형 안의 별 - 갑작스러운 부',
        cross: '삼각형 안의 십자 - 재물 장애',
        island: '삼각형 안의 섬 - 재물 손실 시기'
      }
    },

    luckyTriangles: {
      name: '행운의 삼각형',
      locations: {
        palmCenter: {
          name: '손바닥 중앙 대삼각형 (Great Triangle)',
          formed: '생명선, 두뇌선, 건강선이 형성',
          meaning: '전반적인 행운, 건강, 장수',
          interpretation: {
            large: '큰 삼각형 - 관대함, 넓은 마음',
            small: '작은 삼각형 - 신중함, 협소한 시각',
            clear: '선명함 - 명확한 인생관',
            unclear: '불분명함 - 방향 찾는 중'
          }
        },
        jupiter: {
          name: '목성구 삼각형',
          meaning: '리더십 성공, 명예 획득',
          career: '정치, 경영, 교육 분야 성공'
        },
        saturn: {
          name: '토성구 삼각형',
          meaning: '학문적 성공, 부동산 운',
          career: '연구, 농업, 광업, 부동산'
        },
        apollo: {
          name: '태양구 삼각형',
          meaning: '예술적 성공, 명성',
          career: '예술, 연예, 디자인 분야'
        },
        mercury: {
          name: '수성구 삼각형',
          meaning: '사업 성공, 과학적 성취',
          career: '사업, 과학, 의학, 통신'
        },
        venus: {
          name: '금성구 삼각형',
          meaning: '사랑의 성공, 예술적 재능',
          career: '음악, 미술, 패션'
        },
        moon: {
          name: '월구 삼각형',
          meaning: '상상력의 성공, 해외 운',
          career: '문학, 여행, 해운'
        },
        mars: {
          name: '화성 평원 삼각형',
          meaning: '전략적 성공, 큰 성취',
          career: '군사, 전략, 경쟁 분야'
        }
      }
    },

    fishSign: {
      name: '물고기 표시 (Fish Sign / Matsya)',
      origin: '인도 손금학 (Samudrik Shastra)',
      location: '주로 생명선 끝, 월구, 목성구',

      meaning: {
        general: '번영, 부, 영적 성장, 행운',
        onLifeLine: '장수, 건강, 풍요로운 노년',
        onMoon: '해외 성공, 여행으로 번영',
        onJupiter: '명예, 지위 상승',
        onVenus: '사랑의 축복, 행복한 결혼'
      },

      interpretation: {
        headToward: '물고기 머리 방향이 중요',
        toFingers: '손가락 쪽 - 상승하는 운',
        toWrist: '손목 쪽 - 보호, 축적'
      },

      rarity: '매우 희귀함 - 있으면 매우 행운'
    },

    otherLuckySigns: {
      flag: {
        name: '깃발 (Flag / Dhwaja)',
        meaning: '명성, 권력, 승리',
        rarity: '매우 희귀'
      },
      lotus: {
        name: '연꽃 (Lotus / Padma)',
        meaning: '순수함, 영적 깨달음, 부',
        rarity: '매우 희귀'
      },
      conch: {
        name: '소라 (Conch / Shankha)',
        meaning: '명성, 신성한 보호',
        rarity: '매우 희귀'
      },
      umbrella: {
        name: '우산 (Umbrella / Chhatra)',
        meaning: '보호, 권력, 왕족',
        rarity: '매우 희귀'
      },
      bow: {
        name: '활 (Bow / Dhanush)',
        meaning: '전사, 승리, 용기',
        location: '주로 화성 영역'
      },
      tree: {
        name: '나무 (Tree)',
        meaning: '성장, 발전, 자녀복',
        location: '주로 월구'
      },
      temple: {
        name: '사원 (Temple / Mandir)',
        meaning: '영적 깨달음, 종교적 성취',
        rarity: '매우 희귀'
      },
      swastika: {
        name: '만자 (Swastika)',
        meaning: '행운, 번영 (동양에서 신성한 상징)',
        note: '인도/아시아 전통에서 긍정적 의미'
      },
      wheel: {
        name: '바퀴 (Wheel / Chakra)',
        meaning: '운명의 전환, 영적 진화',
        rarity: '희귀'
      },
      elephant: {
        name: '코끼리 (Elephant / Gaja)',
        meaning: '지혜, 번영, 장애물 제거',
        rarity: '희귀'
      },
      snake: {
        name: '뱀 (Snake / Naga)',
        meaning: '지혜, 치유력, 쿤달리니 에너지',
        location: '주로 수성구',
        interpretation: '의학/치유 분야 재능'
      },
      trishul: {
        name: '삼지창 (Trishul/Trident)',
        meaning: '최고의 행운, 명성+부+행복',
        location: '주로 태양선 끝',
        rarity: '희귀'
      }
    }
  },

  // ==========================================
  // 제18부: 여행선과 이민선 (Travel & Immigration Lines)
  // ==========================================
  travelAndImmigrationLines: {
    introduction: '여행과 이동에 관한 손금선들',

    travelLines: {
      name: '여행선 (Travel Lines)',
      location: '손바닥 가장자리 월구 옆, 생명선 반대편',

      interpretation: {
        count: {
          many: '많은 여행선 - 여행을 좋아함, 이동 많음',
          few: '적은 여행선 - 정착 선호, 큰 여행만',
          none: '없음 - 정착형, 집 중심'
        },
        length: {
          long: {
            name: '긴 여행선',
            meaning: '장거리 여행, 해외 여행, 이민 가능성',
            reaching: {
              toCenter: '손바닥 중앙까지 - 인생을 바꾸는 여행',
              toFateLine: '운명선까지 - 여행이 커리어에 영향'
            }
          },
          short: {
            name: '짧은 여행선',
            meaning: '단거리 여행, 국내 여행'
          }
        },
        depth: {
          deep: '깊은 선 - 중요한 여행, 기억에 남는 여행',
          light: '얕은 선 - 일반적 여행, 단기 방문'
        },
        direction: {
          upward: '위로 향함 - 성공적인 여행',
          downward: '아래로 향함 - 여행 중 어려움',
          curved: '곡선 - 우회하는 여정'
        }
      },

      specialCases: {
        crossingFate: {
          name: '운명선과 교차',
          meaning: '여행이 커리어를 바꿈'
        },
        crossingLife: {
          name: '생명선과 교차',
          meaning: '여행이 건강/삶에 큰 영향'
        },
        fork: {
          name: '갈라진 여행선',
          meaning: '여러 방향으로 여행, 다양한 경험'
        },
        island: {
          name: '섬이 있는 여행선',
          meaning: '여행 중 문제, 지연'
        },
        cross: {
          name: '십자 표시',
          meaning: '여행 중 위험 주의'
        },
        star: {
          name: '별 표시',
          meaning: '여행 중 행운, 발견'
        }
      }
    },

    immigrationLines: {
      name: '이민선 / 정착선',
      description: '영구적인 거주지 변경을 나타내는 선',

      indicators: {
        longTravelLine: '손바닥 중앙까지 닿는 긴 여행선',
        fateLineFromMoon: '월구에서 시작하는 운명선',
        lifeLineToMoon: '생명선 끝이 월구 방향',
        multipleLongLines: '여러 개의 긴 여행선'
      },

      interpretation: {
        successful: {
          name: '성공적 이민 표시',
          signs: [
            '선명한 긴 여행선',
            '월구에서 시작하는 강한 운명선',
            '월구에 별이나 삼각형'
          ]
        },
        challenging: {
          name: '도전적 이민',
          signs: [
            '끊어진 여행선',
            '여행선에 섬',
            '월구에 격자 무늬'
          ]
        }
      }
    },

    restlessness: {
      name: '방랑벽 / 안절부절',
      signs: [
        '많은 여행선',
        '월구가 과도하게 발달',
        '생명선이 월구 쪽으로 휨',
        '손바닥에 잔선이 많음'
      ],
      personality: '한 곳에 정착하기 어려움, 변화 추구'
    }
  },

  // ==========================================
  // 제19부: 결혼과 연애 상세 분석 (Marriage & Love Detail)
  // ==========================================
  marriageAndLoveDetail: {
    introduction: '결혼과 연애에 관한 종합적 분석 (서양/동양 통합)',

    marriageLines: {
      name: '결혼선 / 애정선',
      location: '새끼손가락 아래, 감정선과 새끼손가락 사이',

      count: {
        none: {
          name: '결혼선 없음',
          meaning: '독신 선호 또는 감정 표현 절제',
          note: '없다고 결혼 못하는 것 아님'
        },
        one: {
          name: '한 줄',
          meaning: '한 번의 중요한 관계',
          interpretation: '깊은 사랑, 평생 반려자'
        },
        two: {
          name: '두 줄',
          meaning: '두 번의 중요한 관계',
          interpretation: '재혼 가능성 또는 두 번의 깊은 사랑'
        },
        three: {
          name: '세 줄',
          meaning: '감정이 풍부함, 여러 관계',
          interpretation: '가장 긴/깊은 선이 주된 관계'
        },
        many: {
          name: '여러 줄 (4개 이상)',
          meaning: '로맨틱, 감정이 풍부',
          interpretation: '주요 선과 부수적 선 구분 필요'
        }
      },

      length: {
        long: {
          name: '긴 결혼선',
          reachingSun: '태양구까지 - 유명인과 결혼 또는 결혼으로 성공',
          meaning: '오래 지속되는 관계'
        },
        medium: {
          name: '중간 결혼선',
          meaning: '정상적인 결혼 생활'
        },
        short: {
          name: '짧은 결혼선',
          meaning: '짧은 관계 또는 열정적이지만 짧은 사랑'
        }
      },

      shape: {
        straight: {
          name: '직선',
          meaning: '안정적, 행복한 관계'
        },
        curvedUp: {
          name: '위로 휜 결혼선',
          meaning: '결혼하지 않거나 매우 늦은 결혼',
          interpretation: '독립적, 커리어 우선'
        },
        curvedDown: {
          name: '아래로 휜 결혼선',
          meaning: '파트너보다 오래 삶 또는 관계 악화',
          touchingHeart: '감정선에 닿음 - 배우자 사별 또는 큰 상실'
        },
        forkedEnd: {
          name: '끝이 갈라진 결혼선',
          meaning: '이혼 또는 별거 가능성',
          small: '작은 갈라짐 - 일시적 불화',
          large: '큰 갈라짐 - 영구적 분리'
        },
        forkedStart: {
          name: '시작이 갈라진 결혼선',
          meaning: '결혼 전 장애물, 반대'
        },
        island: {
          name: '섬이 있는 결혼선',
          meaning: '관계 중 위기, 불화 기간'
        },
        broken: {
          name: '끊어진 결혼선',
          meaning: '이별 후 재결합 또는 긴 분리 기간'
        },
        chained: {
          name: '사슬 모양 결혼선',
          meaning: '복잡한 관계, 갈등 많음'
        },
        crossed: {
          name: '작은 선이 가로지르는 결혼선',
          meaning: '외부 간섭, 장애물'
        }
      },

      position: {
        nearHeart: {
          name: '감정선 가까이',
          timing: '이른 결혼 (18-25세)',
          meaning: '젊은 나이의 사랑'
        },
        middle: {
          name: '중간 위치',
          timing: '적절한 시기 결혼 (25-35세)',
          meaning: '성숙한 사랑'
        },
        nearFinger: {
          name: '새끼손가락 가까이',
          timing: '늦은 결혼 (35세 이후)',
          meaning: '만혼, 신중한 선택'
        }
      },

      specialMarks: {
        star: {
          name: '별',
          meaning: '행운의 결혼, 축복받은 관계'
        },
        cross: {
          name: '십자',
          meaning: '관계의 위기, 장애물'
        },
        triangle: {
          name: '삼각형',
          meaning: '삼각관계 주의'
        },
        parallelLine: {
          name: '평행선',
          meaning: '두 사람 동시에 사랑, 외도 가능성'
        }
      }
    },

    heartLineForLove: {
      name: '감정선의 연애 해석',

      ending: {
        underJupiter: '검지 아래 - 이상주의적 사랑, 높은 기대',
        betweenFingers: '검지-중지 사이 - 현실적 로맨티스트',
        underSaturn: '중지 아래 - 육체적 사랑, 감정 표현 어려움'
      },

      depth: {
        deep: '깊은 감정선 - 깊은 감정, 열정적',
        shallow: '얕은 감정선 - 표면적 감정, 냉정'
      },

      shape: {
        curved: '곡선 - 감정 표현 풍부',
        straight: '직선 - 감정 통제, 이성적',
        chained: '사슬 - 감정적 불안정, 복잡한 연애사'
      }
    },

    venusMount: {
      name: '금성구와 연애',

      development: {
        large: '큰 금성구 - 열정적, 사랑에 적극적',
        flat: '평평한 금성구 - 냉담, 관계에 무관심',
        with_lines: '잔선 많음 - 많은 연애, 복잡한 감정'
      }
    },

    loveIndicators: {
      name: '사랑의 지표들',

      positiveForLove: [
        '목성구의 십자 - 행복한 결혼',
        '선명한 결혼선 - 안정적 관계',
        '감정선 끝 갈래 - 감정+이성 균형',
        '잘 발달한 금성구 - 사랑에 충실',
        '하트 모양 생명선 곡선 - 따뜻한 성격'
      ],

      challengingForLove: [
        '아래로 휜 결혼선 - 관계 어려움',
        '감정선 사슬 - 감정 불안정',
        '금성구 격자 - 과도한 욕망',
        '여러 개 결혼선 - 여러 관계, 결정 어려움'
      ]
    },

    compatibility: {
      name: '궁합 (두 손의 비교)',

      handTypes: {
        earthWithEarth: '땅+땅 - 안정적, 신뢰',
        fireWithFire: '불+불 - 열정적이나 갈등',
        waterWithWater: '물+물 - 깊은 이해, 감정적',
        airWithAir: '공기+공기 - 지적, 대화 풍부',
        fireWithAir: '불+공기 - 좋은 궁합, 서로 자극',
        earthWithWater: '땅+물 - 좋은 궁합, 보완적',
        fireWithWater: '불+물 - 어려움, 갈등',
        earthWithAir: '땅+공기 - 보통, 노력 필요'
      }
    }
  },

  // ==========================================
  // 제20부: 재물운 상세 분석 (Wealth Analysis Detail)
  // ==========================================
  wealthAnalysisDetail: {
    introduction: '재물운에 관한 종합적 분석',

    primaryIndicators: {
      moneyTriangle: {
        name: '재물 삼각형',
        description: '두뇌선, 운명선, 건강선이 형성하는 삼각형',
        importance: '가장 중요한 재물 지표'
      },
      fateLine: {
        name: '운명선',
        wealth: {
          strong: '강한 운명선 - 꾸준한 수입',
          toJupiter: '목성구로 향함 - 높은 지위로 부',
          toApollo: '태양구로 향함 - 명성으로 부'
        }
      },
      sunLine: {
        name: '태양선',
        wealth: {
          present: '있음 - 성공과 인정',
          strong: '강함 - 명성과 부',
          fromWrist: '손목부터 - 어릴 때부터 재물운'
        }
      }
    },

    secondaryIndicators: {
      mercuryMount: {
        name: '수성구',
        wealth: {
          developed: '발달 - 사업 수완, 상업적 성공',
          verticalLines: '수직선 - 의학/치유로 돈'
        }
      },
      jupiterMount: {
        name: '목성구',
        wealth: {
          developed: '발달 - 리더십으로 부',
          star: '별 - 갑작스러운 성공'
        }
      },
      apolloMount: {
        name: '태양구',
        wealth: {
          developed: '발달 - 창의력으로 부',
          star: '별 - 갑작스러운 명성'
        }
      }
    },

    wealthPatterns: {
      inheritedWealth: {
        name: '상속/물려받은 재물',
        signs: [
          '생명선에서 시작하는 운명선',
          '금성구에서 오는 영향선',
          '목성구가 잘 발달'
        ]
      },
      selfMade: {
        name: '자수성가',
        signs: [
          '손목에서 시작하는 강한 운명선',
          'M자 손금',
          '손바닥 중앙의 삼각형'
        ]
      },
      suddenWealth: {
        name: '갑작스러운 부',
        signs: [
          '목성구나 태양구의 별',
          '복권선 (운명선에서 목성구로)',
          '물고기 표시'
        ]
      },
      businessWealth: {
        name: '사업으로 인한 부',
        signs: [
          '강한 수성구',
          '두뇌선 끝이 수성구 방향',
          '수성선 발달'
        ]
      },
      investmentWealth: {
        name: '투자로 인한 부',
        signs: [
          '직선의 두뇌선 - 논리적 투자',
          '잘 닫힌 재물 삼각형 - 보존',
          '검지 > 약지 - 신중함'
        ]
      }
    },

    moneyLeakIndicators: {
      name: '돈이 새는 표시',
      signs: [
        '열린 재물 삼각형',
        '너무 유연한 손/손가락 (낭비)',
        '손가락 사이 넓은 간격 (돈 새어나감)',
        '금성구 격자 (과도한 욕망으로 지출)',
        '잔선이 많은 손바닥 (분산된 에너지)'
      ]
    },

    moneyRetentionIndicators: {
      name: '돈을 모으는 표시',
      signs: [
        '닫힌 재물 삼각형',
        '뻣뻣한 손가락 (절약)',
        '손가락이 모여있음 (저축)',
        '깊은 운명선 (꾸준한 수입)',
        '긴 검지 (야망과 계획)'
      ]
    },

    timingOfWealth: {
      name: '재물의 시기',
      early: {
        signs: ['태양선이 손목부터', '운명선 일찍 시작'],
        timing: '20-30대'
      },
      middle: {
        signs: ['두뇌선에서 시작하는 태양선/운명선'],
        timing: '35-45세'
      },
      late: {
        signs: ['감정선에서 시작하는 태양선/운명선'],
        timing: '50세 이후'
      }
    },

    careerForWealth: {
      name: '재물 축적에 유리한 직업',
      byHand: {
        earth: '부동산, 농업, 건축, 금융',
        fire: '기업가, 영업, 마케팅, 연예',
        water: '예술, 심리상담, 해운, 음료',
        air: '기술, 커뮤니케이션, 교육, 저널리즘'
      }
    }
  },

  // ==========================================
  // 제21부: 건강 부위별 상세 분석 (Health by Body Part)
  // ==========================================
  healthByBodyPart: {
    introduction: 'Charlotte Wolff와 전통 손금학의 건강 지표',
    disclaimer: '손금 건강 분석은 참고용이며 의학적 진단을 대체하지 않습니다',

    head: {
      name: '머리/뇌',
      indicators: {
        headLine: {
          islands: '섬 - 두통, 정신적 스트레스 시기',
          chained: '사슬 - 만성 두통',
          breaks: '끊김 - 머리 부상 또는 정신적 전환'
        },
        saturnMount: {
          overdeveloped: '과발달 - 우울 경향',
          grille: '격자 - 정신적 문제 가능성'
        }
      }
    },

    eyes: {
      name: '눈',
      indicators: {
        heartLine: {
          islandUnderSun: '태양구 아래 섬 - 눈 문제',
          islandUnderSaturn: '토성구 아래 섬 - 눈 건강 주의'
        },
        apolloMount: {
          cross: '십자 - 시력 문제 가능'
        }
      }
    },

    ears: {
      name: '귀',
      indicators: {
        mercuryMount: {
          island: '섬 - 청력 문제',
          cross: '십자 - 귀 건강 주의'
        }
      }
    },

    heart: {
      name: '심장/심혈관계',
      indicators: {
        heartLine: {
          chained: '사슬 - 심장 관련 주의',
          broken: '끊김 - 심장 문제 가능 시기',
          islands: '섬 - 심장 약화 시기',
          blue_tinge: '푸른빛 - 순환 문제'
        },
        nails: {
          clubbed: '곤봉형 손톱 - 심폐 문제',
          blue: '푸른 손톱 - 순환 장애'
        },
        palmColor: {
          red: '붉은 손바닥 - 고혈압 가능',
          blue: '푸른 손바닥 - 순환 문제'
        }
      }
    },

    lungs: {
      name: '폐/호흡기',
      indicators: {
        nails: {
          long_narrow: '길고 좁은 손톱 - 호흡기 약함',
          clubbed: '곤봉형 - 폐 문제'
        },
        moonMount: {
          grille: '격자 - 호흡기 주의'
        },
        lunula: {
          small: '작은 반달 - 폐 기능 확인'
        }
      }
    },

    digestive: {
      name: '소화기계',
      indicators: {
        mercuryLine: {
          wavy: '물결 모양 - 소화 문제',
          chained: '사슬 - 만성 소화 장애',
          present: '선명함 - 소화기 주의 필요'
        },
        lifeLine: {
          islands: '섬 - 소화 관련 건강 약화'
        }
      }
    },

    liver: {
      name: '간',
      indicators: {
        mercuryLine: {
          yellow: '노란빛 - 간 기능 주의',
          broken: '끊김 - 간 문제 가능'
        },
        palmColor: {
          yellow: '노란 손바닥 - 간 기능 확인',
          red_spots: '붉은 반점 - 간 주의'
        },
        nails: {
          terry: 'Terry 손톱 - 간 질환 가능'
        }
      }
    },

    kidneys: {
      name: '신장',
      indicators: {
        mercuryLine: {
          islands: '섬 - 신장 주의'
        },
        nails: {
          half_and_half: 'Half-and-half 손톱 - 신장 질환 가능'
        },
        littleFingerLunula: '새끼손가락 반달 상태로 확인'
      }
    },

    reproductive: {
      name: '생식기계',
      indicators: {
        braceletLines: {
          arched_up: '첫째 손목선 위로 솟음 - 여성 생식 문제 가능'
        },
        venusMount: {
          grille: '격자 - 성적 과잉 또는 문제'
        },
        ringFingerLunula: '약지 반달 상태로 확인'
      }
    },

    spine: {
      name: '척추',
      indicators: {
        lifeLine: {
          curve: '곡선 정도 - 척추 건강 반영'
        },
        nails: {
          shell: '조개형 손톱 - 척추 문제 가능'
        }
      }
    },

    nervous: {
      name: '신경계',
      indicators: {
        headLine: {
          chained: '사슬 - 신경 예민',
          thin: '가는 선 - 예민함'
        },
        girdleOfVenus: {
          present: '금성대 - 신경 과민'
        },
        manyLines: '손바닥 잔선 많음 - 신경 예민'
      }
    },

    joints: {
      name: '관절',
      indicators: {
        fingers: {
          knotty: '마디 발달 - 관절 주의',
          stiff: '뻣뻣함 - 관절 경직'
        },
        moonMount: {
          grille: '격자 - 류머티즘 가능'
        }
      }
    },

    mentalHealth: {
      name: '정신 건강',
      indicators: {
        headLine: {
          islands: '섬 - 정신적 스트레스 시기',
          chained: '사슬 - 우울 또는 불안 경향',
          drooping: '아래로 처짐 - 우울 경향'
        },
        saturnRing: {
          present: '토성환 - 우울 경향 주의'
        },
        heartLine: {
          chained: '사슬 - 감정 불안정'
        }
      }
    }
  },

  // ==========================================
  // 제22부: 직업 적성 상세 (Career Aptitude Detail)
  // ==========================================
  careerAptitudeDetail: {
    introduction: '손의 유형과 특징에 따른 상세 직업 적성',

    byHandType: {
      earth: {
        name: '땅의 손',
        characteristics: '네모난 손바닥, 짧은 손가락',
        strengths: ['실용성', '인내심', '신뢰성'],
        careers: {
          ideal: ['농업', '건축', '요리', '은행', '부동산', '보석', '제조업'],
          management: '안정적인 관리직',
          avoid: '급격한 변화가 많은 직업'
        }
      },
      water: {
        name: '물의 손',
        characteristics: '길고 좁은 손바닥, 긴 손가락',
        strengths: ['감수성', '직관력', '창의력'],
        careers: {
          ideal: ['예술', '음악', '시', '심리상담', '사회복지', '간호', '치료'],
          creative: '창작 분야',
          avoid: '경쟁적이고 거친 환경'
        }
      },
      fire: {
        name: '불의 손',
        characteristics: '긴 손바닥, 짧은 손가락',
        strengths: ['열정', '리더십', '추진력'],
        careers: {
          ideal: ['기업가', '영업', '마케팅', '연예인', '운동선수', '정치'],
          leadership: '리더 역할',
          avoid: '단조롭고 반복적인 일'
        }
      },
      air: {
        name: '공기의 손',
        characteristics: '네모난 손바닥, 긴 손가락',
        strengths: ['지적능력', '커뮤니케이션', '분석력'],
        careers: {
          ideal: ['작가', '저널리스트', '교사', '변호사', '과학자', 'IT', '컨설팅'],
          intellectual: '지적 작업',
          avoid: '육체 노동 위주'
        }
      }
    },

    byFingerDominance: {
      jupiterDominant: {
        name: '검지 우세 (목성)',
        meaning: '리더십, 야망',
        careers: ['경영', '정치', '법률', '종교 지도자', 'CEO']
      },
      saturnDominant: {
        name: '중지 우세 (토성)',
        meaning: '연구, 분석',
        careers: ['과학자', '연구원', '회계사', '농업', '광업']
      },
      apolloDominant: {
        name: '약지 우세 (태양)',
        meaning: '창의성, 표현',
        careers: ['예술가', '디자이너', '연예인', '패션', '보석']
      },
      mercuryDominant: {
        name: '새끼손가락 우세 (수성)',
        meaning: '커뮤니케이션, 상업',
        careers: ['사업가', '세일즈', '의사', '변호사', '작가', '통역']
      }
    },

    byMountDevelopment: {
      jupiterMount: {
        developed: '리더십, 야망 관련 직업',
        careers: ['CEO', '정치인', '판사', '대학교수']
      },
      saturnMount: {
        developed: '연구, 분석 관련 직업',
        careers: ['과학자', '수학자', '농부', '광부', '건축가']
      },
      apolloMount: {
        developed: '창의적 표현 관련 직업',
        careers: ['예술가', '배우', '디자이너', '보석상']
      },
      mercuryMount: {
        developed: '커뮤니케이션, 치유 관련 직업',
        careers: ['의사', '변호사', '사업가', '작가', '교사']
      },
      venusMount: {
        developed: '예술, 사랑 관련 직업',
        careers: ['음악가', '댄서', '미용사', '요리사', '플로리스트']
      },
      moonMount: {
        developed: '상상력, 직관 관련 직업',
        careers: ['작가', '시인', '항해사', '심리학자', '점술가']
      }
    },

    bySpecialLines: {
      medicalStigmata: {
        name: '치유자 표시 (수성구 수직선)',
        careers: ['의사', '간호사', '치료사', '수의사', '약사', '상담사']
      },
      teacherSquare: {
        name: '교사 사각형 (목성구)',
        careers: ['교사', '교수', '트레이너', '코치', '멘토']
      },
      writersFork: {
        name: '작가의 포크 (두뇌선 끝)',
        careers: ['작가', '저널리스트', '카피라이터', '시나리오 작가']
      },
      ringOfSolomon: {
        name: '솔로몬의 반지',
        careers: ['상담사', '심리학자', '영적 지도자', '판사']
      }
    },

    byHeadLine: {
      straight: {
        name: '직선 두뇌선',
        meaning: '논리적, 실용적',
        careers: ['엔지니어', '회계사', '과학자', '법률가']
      },
      curved: {
        name: '곡선 두뇌선',
        meaning: '창의적, 상상력',
        careers: ['예술가', '작가', '디자이너', '광고']
      },
      forked: {
        name: '갈라진 두뇌선',
        meaning: '균형 잡힌 사고',
        careers: ['경영컨설턴트', '마케팅', '멀티미디어']
      }
    }
  },

  // ==========================================
  // 제23부: MBTI와 손의 상관관계 (MBTI Correlation)
  // ==========================================
  mbtiCorrelation: {
    introduction: '손의 특징과 MBTI 유형의 상관관계 (참고용, 과학적 근거 제한적)',

    disclaimer: 'MBTI와 손금의 상관관계는 관찰에 기반한 가설이며, 과학적으로 입증되지 않았습니다',

    byHandType: {
      earth: {
        likelyTypes: ['ISTJ', 'ISFJ', 'ESTJ', 'ESFJ'],
        traits: '안정, 전통, 실용성 중시'
      },
      water: {
        likelyTypes: ['INFJ', 'INFP', 'ENFJ', 'ENFP'],
        traits: '직관, 감정, 이상주의'
      },
      fire: {
        likelyTypes: ['ESTP', 'ESFP', 'ENTJ', 'ENTP'],
        traits: '행동, 열정, 외향성'
      },
      air: {
        likelyTypes: ['INTP', 'INTJ', 'ENTP', 'ENTJ'],
        traits: '분석, 아이디어, 논리'
      }
    },

    byFingerRatio: {
      indexLonger: {
        traits: '리더십, 자신감',
        likelyTypes: ['ENTJ', 'ESTJ', 'ENFJ']
      },
      ringLonger: {
        traits: '위험 감수, 창의성',
        likelyTypes: ['ESTP', 'ENTP', 'ISTP']
      }
    },

    byHeadLine: {
      straight: {
        traits: '논리적, 체계적',
        likelyTypes: ['ISTJ', 'INTJ', 'ESTJ', 'ENTJ']
      },
      curved: {
        traits: '직관적, 창의적',
        likelyTypes: ['INFP', 'ENFP', 'INFJ', 'ISFP']
      }
    },

    byLifeLineStart: {
      joinedWithHead: {
        traits: '신중함, 사려 깊음',
        likelyTypes: ['ISTJ', 'ISFJ', 'INFJ', 'INTJ']
      },
      separateFromHead: {
        traits: '독립적, 모험심',
        likelyTypes: ['ESTP', 'ESFP', 'ENTP', 'ENFP']
      }
    },

    byGirdleOfVenus: {
      present: {
        traits: '예민함, 감수성',
        likelyTypes: ['INFP', 'INFJ', 'ENFP', 'ISFP']
      }
    },

    byKnottyFingers: {
      knotty: {
        traits: '분석적, 철학적',
        likelyTypes: ['INTP', 'INTJ', 'ISTP', 'INFJ']
      },
      smooth: {
        traits: '직관적, 빠른 판단',
        likelyTypes: ['ESFP', 'ENFP', 'ESTP', 'ENTP']
      }
    }
  },

  // ==========================================
  // 제24부: 동양 손금학 상세 (Eastern Palmistry Detail)
  // ==========================================
  easternPalmistry: {
    chinese: {
      name: '중국 수상학 (手相學 / Shou Xiang)',
      history: '3000년 이상의 역사, 마의상법(麻衣相法)이 대표적',

      principles: [
        '음양 균형 (陰陽)',
        '오행 (금목수화토 / 金木水火土)',
        '기의 흐름 (氣)',
        '상생상극 (相生相剋)'
      ],

      fiveElements: {
        metal: {
          name: '금형수 (金形手)',
          characteristics: '네모나고 단단한 손, 손가락 마디가 뚜렷',
          color: '흰색 또는 창백',
          personality: ['의지가 강함', '결단력 있음', '정의감', '엄격함'],
          fortune: '관직운, 명예운이 좋음',
          careers: '법관, 군인, 경찰, 공무원'
        },
        wood: {
          name: '목형수 (木形手)',
          characteristics: '길고 가느다란 손, 손가락이 마디 없이 매끄러움',
          color: '약간 푸른 기운',
          personality: ['인자함', '학문을 좋아함', '창의적', '성장 지향'],
          fortune: '학자운, 예술가운',
          careers: '교수, 작가, 예술가, 연구원'
        },
        water: {
          name: '수형수 (水形手)',
          characteristics: '통통하고 부드러운 손, 손가락 끝이 뾰족',
          color: '검푸른 기운',
          personality: ['지혜로움', '적응력 좋음', '언변 뛰어남', '유연함'],
          fortune: '재물운, 사업운 좋음',
          careers: '사업가, 외교관, 상인, 언론인'
        },
        fire: {
          name: '화형수 (火形手)',
          characteristics: '손바닥이 붉고 손가락 끝이 뾰족, 손이 뜨거움',
          color: '붉은색',
          personality: ['열정적', '급함', '예술적 감각', '표현력 강함'],
          fortune: '명예운은 있으나 재물은 불안정',
          careers: '연예인, 예술가, 연설가, 정치인'
        },
        earth: {
          name: '토형수 (土形手)',
          characteristics: '두껍고 네모난 손, 손가락이 굵고 짧음',
          color: '노란 기운',
          personality: ['성실함', '신뢰할 수 있음', '끈기', '안정 추구'],
          fortune: '대기만성형, 중년 이후 발복',
          careers: '농업, 부동산, 건축, 금융'
        }
      },

      uniqueLines: {
        childLine: {
          name: '자녀선 (子女線)',
          location: '결혼선에서 위로 뻗는 세로선',
          interpretation: {
            count: '자녀 수를 암시',
            depth: '깊은 선 - 건강한 자녀, 강한 인연',
            vertical: '세로로 뚜렷 - 아들 가능성',
            slanted: '기울어짐 - 딸 가능성'
          }
        },
        wealthLine: {
          name: '재물선 / 재운선 (財運線)',
          location: '수성구에서 아래로 뻗는 선',
          interpretation: {
            clear: '선명함 - 재물 축적 능력',
            multiple: '여러 개 - 다양한 수입원',
            toSun: '태양선과 연결 - 명성으로 부'
          }
        },
        ancestorLine: {
          name: '조상선 (祖上線)',
          location: '금성구에서 검지 방향으로 뻗는 선',
          interpretation: '조상의 음덕, 가문의 영향'
        },
        wisdomLine: {
          name: '지혜선 (智慧線)',
          location: '두뇌선 위 평행선',
          interpretation: '특별한 지혜, 영적 통찰력'
        }
      },

      philosophy: '손금은 바뀔 수 있다 - 修心改運 (마음을 닦아 운명을 바꾼다)',

      yinYang: {
        leftHand: {
          meaning: '음 (陰) - 선천운, 타고난 것',
          represents: '받은 것, 잠재력, 내면'
        },
        rightHand: {
          meaning: '양 (陽) - 후천운, 노력으로 만든 것',
          represents: '이룬 것, 현재, 외면'
        },
        comparison: '양손 비교로 발전 정도 파악'
      }
    },

    indian: {
      name: '인도 수상학 (Samudrik Shastra / 사무드릭 샤스트라)',
      history: '베다 시대(BC 1500년)부터 시작된 고대 학문',

      principles: [
        '카르마와 운명 (업보)',
        '차크라와의 연결',
        '영적 성장',
        '전생과 현생의 관계'
      ],

      sacredSymbols: {
        fish: {
          name: '물고기 (Matsya / 마츠야)',
          meaning: '번영, 부, 영적 성장',
          location: '주로 생명선 끝, 월구',
          fortune: '매우 행운, 재물과 영적 축복'
        },
        lotus: {
          name: '연꽃 (Padma / 파드마)',
          meaning: '순수함, 부, 명예, 영적 깨달음',
          location: '손바닥 중앙',
          fortune: '왕족의 표시, 최고의 성공'
        },
        conch: {
          name: '소라 (Shankha / 샹카)',
          meaning: '명성, 신성한 보호, 승리',
          location: '다양함',
          fortune: '영적 보호, 명예'
        },
        flag: {
          name: '깃발 (Dhwaja / 드와자)',
          meaning: '승리, 명성, 권력',
          location: '손바닥',
          fortune: '리더십, 성공'
        },
        umbrella: {
          name: '우산 (Chhatra / 차트라)',
          meaning: '보호, 왕권, 명예',
          location: '손바닥 상단',
          fortune: '권력자의 보호를 받음'
        },
        elephant: {
          name: '코끼리 (Gaja / 가자)',
          meaning: '지혜, 번영, 장애물 제거 (가네샤)',
          location: '목성구 또는 월구',
          fortune: '지혜와 행운'
        },
        snake: {
          name: '뱀 (Naga / 나가)',
          meaning: '쿤달리니 에너지, 치유력, 지혜',
          location: '수성구',
          fortune: '치유 능력, 의학 재능'
        },
        trishul: {
          name: '삼지창 (Trishul / 트리슐)',
          meaning: '시바의 상징, 최고의 행운',
          location: '태양선 또는 운명선 끝',
          fortune: '명성+부+행복 동시 획득'
        },
        swastika: {
          name: '만자 (Swastika / 스바스티카)',
          meaning: '길상, 번영, 행운 (힌두교에서 신성한 상징)',
          location: '손바닥 중앙',
          fortune: '사방에서 오는 행운'
        },
        wheel: {
          name: '바퀴 (Chakra / 차크라)',
          meaning: '다르마의 바퀴, 영적 진화',
          location: '손바닥 중앙',
          fortune: '영적 깨달음'
        },
        bow: {
          name: '활 (Dhanush / 다누쉬)',
          meaning: '전사, 승리, 용기',
          location: '화성 영역',
          fortune: '경쟁에서 승리'
        },
        tree: {
          name: '나무 (Vriksha)',
          meaning: '성장, 번영, 자손 복',
          location: '월구',
          fortune: '가문의 번영'
        },
        temple: {
          name: '사원 (Mandir)',
          meaning: '영적 깨달음, 종교적 성취',
          location: '다양함',
          fortune: '영적 지도자'
        }
      },

      chakraConnection: {
        thumb: '화성 차크라 (Manipura) - 의지력',
        index: '목성 차크라 (Ajna) - 지혜, 직관',
        middle: '토성 차크라 (Sahasrara) - 영적 연결',
        ring: '태양 차크라 (Anahata) - 사랑, 창의',
        little: '수성 차크라 (Vishuddha) - 소통',
        palm: '손바닥 전체 - 모든 차크라의 미니어처'
      },

      philosophy: '손금은 전생의 업보와 현생의 노력을 반영 - 그러나 수행으로 바꿀 수 있음'
    },

    japanese: {
      name: '일본 수상학 (手相学 / Tesougaku)',
      history: '중국에서 전래, 에도 시대에 발전',

      characteristics: '중국과 서양의 영향을 받아 독자적으로 발전',

      uniqueConcepts: {
        lifeEnergy: {
          name: '기 (氣 / Ki)',
          meaning: '손에 흐르는 생명 에너지',
          strong: '따뜻하고 탄력 있는 손 - 기가 강함',
          weak: '차갑고 축 처진 손 - 기가 약함'
        },
        destinyPath: {
          name: '운명의 길 (運命の道)',
          meaning: '운명선을 통한 인생 여정 해석'
        },
        spiritualConnection: {
          name: '영적 연결 (霊的繋がり)',
          meaning: '손금과 영혼의 관계'
        }
      },

      modernJapanese: {
        computerAnalysis: '컴퓨터 손금 분석 선도',
        scientificApproach: '피부문양학과 결합',
        popularCulture: '운세, TV 프로그램에서 활용'
      }
    },

    korean: {
      name: '한국 손금학 (手相學)',
      history: '마의상법의 영향, 유교적 가치관과 결합',

      characteristics: [
        '중국 마의상법 기반',
        '유교적 가치관 반영',
        '가족, 자녀, 결혼 중시',
        '실용적 해석'
      ],

      emphasis: {
        childrenFortune: {
          name: '자녀운',
          importance: '자녀의 건강과 성공',
          lines: '자녀선, 결혼선'
        },
        marriageFortune: {
          name: '결혼운',
          importance: '좋은 배우자, 행복한 결혼',
          lines: '결혼선, 감정선'
        },
        wealthFortune: {
          name: '재물운',
          importance: '경제적 안정',
          lines: '운명선, 태양선, 재물 삼각형'
        },
        officialFortune: {
          name: '관직운',
          importance: '사회적 지위',
          lines: '목성구, 운명선'
        },
        healthFortune: {
          name: '건강운',
          importance: '장수',
          lines: '생명선, 건강선'
        }
      },

      traditionalBeliefs: {
        ancestorBlessing: '조상의 음덕이 손금에 나타남',
        changeable: '수양과 선행으로 손금이 변할 수 있음',
        bothHands: '왼손=받은 것, 오른손=이룬 것'
      }
    }
  },

  // ==========================================
  // 제25부: 나이에 따른 손 변화 (Age-Related Changes)
  // ==========================================
  ageRelatedChanges: {
    introduction: '손금은 시간이 지남에 따라 변할 수 있습니다. Charlotte Wolff와 현대 연구 기반',

    childhood: {
      age: '0-12세',
      characteristics: [
        '손금이 아직 완전히 형성되지 않음',
        '주요 3대 선 (생명선, 두뇌선, 감정선)은 태어날 때부터 존재',
        '부가 선들은 발달 중',
        '손가락 비율이 변화 중'
      ],
      reading: '잠재력과 타고난 성향 파악에 유용'
    },

    adolescence: {
      age: '13-19세',
      characteristics: [
        '손금이 더 뚜렷해짐',
        '운명선이 나타나기 시작할 수 있음',
        '감정선의 변화 (연애 시작)',
        '성격이 손에 반영되기 시작'
      ],
      reading: '성격 형성과 미래 방향성 암시'
    },

    youngAdult: {
      age: '20-35세',
      characteristics: [
        '대부분의 손금이 확립됨',
        '커리어와 관계가 손금에 반영',
        '운명선, 태양선이 발달할 수 있음',
        '결혼선 변화'
      ],
      reading: '가장 읽기 좋은 시기, 현재와 미래 예측'
    },

    middleAge: {
      age: '36-55세',
      characteristics: [
        '손금이 더 깊어질 수 있음',
        '잔선이 증가할 수 있음',
        '건강 지표가 나타남',
        '지혜의 선들이 발달'
      ],
      reading: '성취와 건강 상태 반영, 후반기 예측'
    },

    senior: {
      age: '56세 이상',
      characteristics: [
        '피부 탄력 감소로 선이 변할 수 있음',
        '손 색깔 변화 가능',
        '손톱 상태 변화',
        '일부 선이 희미해질 수 있음'
      ],
      reading: '과거 삶의 총합, 건강 상태 중요'
    },

    lineChanges: {
      canChange: [
        '운명선 - 커리어 변화에 따라',
        '태양선 - 성공/명성에 따라',
        '건강선 - 건강 상태에 따라',
        '결혼선 - 관계 변화에 따라',
        '잔선들 - 스트레스, 경험에 따라'
      ],
      rarelyChange: [
        '생명선 - 기본 형태 유지',
        '두뇌선 - 사고 방식 반영',
        '감정선 - 감정 패턴 반영'
      ],
      neverChange: [
        '지문 패턴 - 평생 동일',
        '피부 문양 (dermatoglyphics)'
      ]
    },

    causingFactors: {
      internal: [
        '건강 상태 변화',
        '정신적 성장',
        '감정적 경험',
        '가치관 변화'
      ],
      external: [
        '직업 활동',
        '스트레스 수준',
        '생활 환경',
        '영양 상태'
      ]
    },

    philosophy: '손금은 고정된 운명이 아니라 변화하는 가능성을 보여줍니다'
  },

  // ==========================================
  // 제26부: 손등 분석 (Back of Hand Analysis)
  // ==========================================
  backOfHandAnalysis: {
    introduction: '손등도 성격과 건강 정보를 제공합니다',

    veins: {
      name: '정맥 패턴',
      prominent: {
        meaning: '강한 에너지, 활력',
        health: '혈압 확인 권장'
      },
      hidden: {
        meaning: '차분함, 절제력',
        health: '양호'
      },
      blue: {
        meaning: '순환 문제 가능성',
        health: '심혈관 검사 권장'
      }
    },

    knuckles: {
      name: '손등 마디',
      prominent: {
        meaning: '분석적, 철학적 사고',
        personality: '논리적, 체계적'
      },
      smooth: {
        meaning: '직관적, 감각적',
        personality: '빠른 판단, 감성적'
      }
    },

    hair: {
      name: '손등 털',
      hairy: {
        meaning: '활력, 남성적 에너지 (남녀 모두)',
        personality: '활동적, 본능적'
      },
      hairless: {
        meaning: '섬세함, 예민함',
        personality: '감성적, 예술적'
      }
    },

    skin: {
      name: '손등 피부',
      smooth: {
        meaning: '섬세함, 지적 활동',
        career: '사무직, 예술'
      },
      rough: {
        meaning: '실용적, 육체적 활동',
        career: '기술직, 스포츠'
      },
      spots: {
        meaning: '나이, 자외선 노출',
        health: '피부과 검진 권장'
      }
    },

    shape: {
      name: '손등 형태',
      flat: {
        meaning: '실용적, 현실적',
        personality: '안정 추구'
      },
      arched: {
        meaning: '창의적, 예술적',
        personality: '표현력 강함'
      },
      bony: {
        meaning: '지적, 분석적',
        personality: '사고 중심'
      },
      padded: {
        meaning: '감각적, 즐거움 추구',
        personality: '편안함 중시'
      }
    }
  },

  // ==========================================
  // 제27부: 손의 온도와 습도 (Hand Temperature & Moisture)
  // ==========================================
  handTemperatureAndMoisture: {
    introduction: '손의 온도와 습도는 성격과 건강을 반영합니다',

    temperature: {
      warm: {
        name: '따뜻한 손',
        personality: ['애정이 넘침', '외향적', '열정적', '관대함'],
        health: '좋은 순환',
        emotion: '감정 표현이 풍부'
      },
      cold: {
        name: '차가운 손',
        personality: ['내성적', '신중함', '감정 절제', '분석적'],
        health: '순환 확인 필요, 갑상선 체크',
        emotion: '감정 숨기는 경향'
      },
      hot: {
        name: '뜨거운 손',
        personality: ['열정적', '충동적', '성급함'],
        health: '고혈압, 열 관련 주의',
        emotion: '감정 폭발 가능성'
      },
      variable: {
        name: '온도 변화가 큰 손',
        personality: ['감정 기복', '예민함'],
        health: '자율신경계 확인'
      }
    },

    moisture: {
      dry: {
        name: '건조한 손',
        personality: ['냉정함', '분석적', '통제력'],
        health: '수분 섭취, 피부 관리',
        emotion: '감정 억제 경향'
      },
      moist: {
        name: '촉촉한 손',
        personality: ['감정적', '걱정이 많음', '예민함'],
        health: '신경계 예민, 스트레스 관리',
        emotion: '감정에 민감'
      },
      sweaty: {
        name: '땀이 많은 손',
        personality: ['긴장', '불안', '예민함'],
        health: '갑상선, 신경계 확인',
        emotion: '스트레스에 취약'
      },
      clammy: {
        name: '축축하고 차가운 손',
        personality: ['내성적', '걱정 많음'],
        health: '순환 문제, 스트레스',
        emotion: '불안 경향'
      }
    },

    combinations: {
      warmAndDry: {
        meaning: '균형 잡힌, 건강한 상태',
        personality: '차분하고 자신감 있음'
      },
      warmAndMoist: {
        meaning: '열정적이나 걱정도 있음',
        personality: '감정적이고 표현적'
      },
      coldAndDry: {
        meaning: '냉정하고 분석적',
        personality: '감정 통제력 강함'
      },
      coldAndMoist: {
        meaning: '불안하고 내성적',
        personality: '걱정 많고 예민함'
      }
    }
  },

  // ==========================================
  // 제28부: 손의 대칭과 비대칭 (Hand Symmetry)
  // ==========================================
  handSymmetry: {
    introduction: '양손의 대칭과 차이는 중요한 정보를 제공합니다',

    symmetry: {
      similar: {
        name: '양손이 비슷함',
        meaning: '잠재력대로 살고 있음',
        personality: '일관성, 안정성'
      },
      different: {
        name: '양손이 많이 다름',
        meaning: '많이 변화/성장함',
        personality: '적응력, 발전'
      }
    },

    dominantVsNonDominant: {
      dominantBetter: {
        name: '주로 쓰는 손이 더 좋음',
        meaning: '노력으로 운명을 개선함',
        advice: '계속 노력하면 더 좋아질 것'
      },
      nonDominantBetter: {
        name: '안 쓰는 손이 더 좋음',
        meaning: '타고난 잠재력을 다 발휘하지 못함',
        advice: '숨겨진 재능을 개발할 것'
      },
      equal: {
        name: '양손이 비슷하게 좋음',
        meaning: '타고난 대로 잘 살고 있음',
        advice: '현재 방향 유지'
      }
    },

    fingerComparison: {
      name: '손가락 비교',
      longerOnDominant: '노력으로 발달한 능력',
      longerOnNonDominant: '타고났으나 개발 안 된 능력'
    },

    lineComparison: {
      name: '손금선 비교',
      methodology: '같은 선을 양손에서 비교',
      interpretation: {
        deeperOnDominant: '노력으로 강화된 특성',
        deeperOnNonDominant: '타고났으나 활용 안 된 특성',
        presentOnlyOnOne: '한 손에만 있는 선 - 특별한 의미'
      }
    }
  },

  // ==========================================
  // 제29부: 정신 건강 지표 (Mental Health Indicators)
  // ==========================================
  mentalHealthIndicators: {
    introduction: '손금은 정신 건강 경향을 반영할 수 있습니다 (참고용, 진단 대체 불가)',
    disclaimer: '손금은 정신건강 진단 도구가 아닙니다. 전문가 상담을 권장합니다',

    stressIndicators: {
      name: '스트레스 지표',
      signs: [
        '손바닥에 잔선이 매우 많음',
        '걱정선 (금성구에서 가로지르는 선)',
        '두뇌선에 섬',
        '손톱을 물어뜯은 흔적'
      ],
      advice: '스트레스 관리 기법 활용 권장'
    },

    anxietyIndicators: {
      name: '불안 경향 지표',
      signs: [
        '손에 땀이 많음',
        '손가락을 자주 움직임',
        '금성대 (Girdle of Venus) 존재',
        '두뇌선이 월구까지 깊이 내려감'
      ],
      advice: '이완 기법, 명상 권장'
    },

    depressionIndicators: {
      name: '우울 경향 지표',
      signs: [
        '토성환 (Ring of Saturn)',
        '토성구 과발달',
        '두뇌선이 아래로 급격히 처짐',
        '손 색깔이 창백하거나 푸른빛',
        '에너지 없는 축 처진 손'
      ],
      advice: '전문가 상담 강력 권장'
    },

    sensitivityIndicators: {
      name: '예민함 지표',
      signs: [
        '금성대 존재',
        '손바닥에 선이 매우 많음',
        '얇고 가는 손가락',
        '감정선에 사슬 모양'
      ],
      advice: '자기 보호 기법 개발'
    },

    resilienceIndicators: {
      name: '회복력 지표',
      signs: [
        '강한 생명선',
        '화성선 (생명선 보조선)',
        '손바닥 중앙의 삼각형',
        '유연하지만 단단한 손',
        '분홍빛 건강한 손 색깔'
      ],
      meaning: '정신적 강인함'
    },

    balanceIndicators: {
      name: '정신적 균형 지표',
      signs: [
        '주요 3선이 균형 잡힘',
        '손바닥이 균형 잡힌 비율',
        '손가락 사이 적당한 간격',
        '선명하지만 과하지 않은 손금'
      ],
      meaning: '정서적 안정'
    }
  },

  // ==========================================
  // 제30부: 손금 읽기 종합 가이드 (Complete Reading Guide)
  // ==========================================
  completeReadingGuide: {
    introduction: '전문적인 손금 읽기 순서와 방법',

    step1: {
      name: '전체적인 인상',
      check: [
        '손의 크기와 비율',
        '손의 유형 (땅/물/불/공기)',
        '손의 색깔과 온도',
        '피부 질감',
        '손의 유연성'
      ]
    },

    step2: {
      name: '손가락 분석',
      check: [
        '손가락 길이와 비율',
        '손가락 끝 모양',
        '마디 발달 정도',
        '손가락 기울기',
        '엄지 분석'
      ]
    },

    step3: {
      name: '손바닥 구 (Mount) 분석',
      check: [
        '각 구의 발달 정도',
        '구에 있는 특수 표시',
        '가장 발달한 구 확인'
      ]
    },

    step4: {
      name: '주요 3선 분석',
      lines: ['생명선', '두뇌선', '감정선'],
      check: [
        '길이, 깊이, 색깔',
        '시작점과 끝점',
        '특수 표시 (섬, 끊김, 가지 등)'
      ]
    },

    step5: {
      name: '부가 선 분석',
      lines: ['운명선', '태양선', '건강선', '결혼선 등'],
      check: [
        '존재 여부',
        '시작점과 끝점',
        '품질과 특수 표시'
      ]
    },

    step6: {
      name: '특수 표시 분석',
      check: [
        '삼각형, 사각형, 별, 십자 등',
        '위치와 의미',
        '막진손금 등 특수 손금'
      ]
    },

    step7: {
      name: '손톱 분석',
      check: [
        '손톱 모양',
        '손톱 색깔',
        '반달 (lunula) 상태'
      ]
    },

    step8: {
      name: '양손 비교',
      check: [
        '주로 쓰는 손 vs 안 쓰는 손',
        '차이점 분석',
        '변화와 성장 확인'
      ]
    },

    step9: {
      name: '종합 해석',
      approach: [
        '여러 지표를 종합적으로 판단',
        '상충되는 표시가 있으면 맥락 고려',
        '긍정적이고 건설적인 해석',
        '변화 가능성 강조'
      ]
    },

    ethicalGuidelines: {
      do: [
        '긍정적인 면도 함께 말하기',
        '변화 가능성 언급',
        '건강 문제는 의사 권유',
        '정신건강 문제는 전문가 권유'
      ],
      dontDo: [
        '수명 예측 하지 않기',
        '재앙 예언 하지 않기',
        '의학적 진단 하지 않기',
        '두려움 조장 하지 않기'
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
