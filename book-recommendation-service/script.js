/**
 * 민음사 세계문학전집 도서 추천 서비스 - script.js
 * 
 * 주요 기능:
 * 1. 12권의 대표 고전 소설 데이터 관리
 * 2. 분위기, 난이도, 분량 매칭을 통한 추천 점수 계산
 * 3. 결과 페이지 카드 UI 렌더링 및 초기화
 */

// 도서 데이터 (최소 9권 이상인 12권 정의)
const books = [
  {
    id: 1,
    title: "데미안",
    author: "헤르만 헤세",
    number: "44",
    mood: ["성장 이야기", "철학적인", "감성적인"],
    difficulty: "보통",
    length: "짧게 읽기",
    tagline: "내 속에서 솟아 나오려는 것, 바로 그것대로 살아 보려 했다.",
    recommendationReason: "자아의 각성과 내면의 치열한 투쟁을 담아, 삶의 방향을 찾고 방황하는 청춘들에게 깊은 영감과 위로를 줍니다.",
    coverColor: "#4E5D4C" // 차분한 딥 그린
  },
  {
    id: 2,
    title: "인간 실격",
    author: "다자이 오사무",
    number: "103",
    mood: ["어두운", "철학적인", "감성적인"],
    difficulty: "입문용",
    length: "짧게 읽기",
    tagline: "인간의 자격을 상실한 한 남자의 쓸쓸하고 처절한 고백.",
    recommendationReason: "타인의 시선 속에 스스로를 파멸로 몰고 간 주인공을 통해 인간 내면 깊은 곳의 유약함과 고독의 심연을 마주하게 합니다.",
    coverColor: "#2F3E46" // 어두운 차콜
  },
  {
    id: 3,
    title: "위대한 개츠비",
    author: "F. 스콧 피츠제럴드",
    number: "72",
    mood: ["사랑 이야기", "감성적인"],
    difficulty: "입문용",
    length: "보통",
    tagline: "어긋난 시대 속에서 피어난 낭만적인 환상과 비극적인 종말.",
    recommendationReason: "가질 수 없는 옛사랑을 되찾기 위해 삶을 불사른 개츠비의 불꽃 같은 열정과 재즈 시대의 낭만적이면서도 씁쓸한 이면을 완벽히 묘사합니다.",
    coverColor: "#6B1824" // 깊은 버건디
  },
  {
    id: 4,
    title: "이방인",
    author: "알베르 카뮈",
    number: "266",
    mood: ["철학적인", "어두운"],
    difficulty: "보통",
    length: "짧게 읽기",
    tagline: "오늘 엄마가 죽었다. 아니, 어쩌면 어제.",
    recommendationReason: "세상의 거짓과 타협하지 않고 진실만을 말하다가 사회로부터 소외되는 뫼르소의 비극을 통해 실존의 부조리를 묵직하게 질문합니다.",
    coverColor: "#8D5B4C" // 황토/갈색 톤
  },
  {
    id: 5,
    title: "오만과 편견",
    author: "제인 오스틴",
    number: "88",
    mood: ["사랑 이야기", "감성적인", "성장 이야기"],
    difficulty: "보통",
    length: "보통",
    tagline: "서로에 대한 오만함과 편견을 넘어 다가가는 세련된 연애 소설의 고전.",
    recommendationReason: "19세기 영국 시골 사회를 배경으로 한 유쾌하고 섬세한 인물 묘사와, 두 남녀가 내면의 편견을 깨고 진정한 사랑에 눈뜨는 과정이 깊은 몰입감을 줍니다.",
    coverColor: "#1B3B6F" // 클래식 블루
  },
  {
    id: 6,
    title: "변신",
    author: "프란츠 카프카",
    number: "115",
    mood: ["어두운", "철학적인"],
    difficulty: "입문용",
    length: "짧게 읽기",
    tagline: "어느 날 아침, 잠에서 깨어난 그레고르는 자신이 거대한 벌레로 변해 있음을 발견했다.",
    recommendationReason: "한순간에 쓸모없는 존재가 된 주인공을 통해 현대 사회 속 인간 소외와 가족 공동체의 가식적인 민낯을 극적이고 기괴한 우화로 비판합니다.",
    coverColor: "#333533" // 거의 검은색에 가까운 다크 그레이
  },
  {
    id: 7,
    title: "죄와 벌",
    author: "표도르 도스토옙스키",
    number: "30",
    mood: ["어두운", "철학적인", "성장 이야기"],
    difficulty: "깊이 있는 독서",
    length: "긴 호흡",
    tagline: "살인을 저지른 가난한 대학생의 죄의식과 마침내 찾아오는 내면의 구원.",
    recommendationReason: "도덕성과 정의를 참칭해 저지른 범죄, 이로 인한 양심의 가책과 고뇌를 현미경으로 보듯 정교하게 묘사한 러시아 문학의 기념비적 걸작입니다.",
    coverColor: "#3D2B1F" // 무거운 브라운
  },
  {
    id: 8,
    title: "호밀밭의 파수꾼",
    author: "J.D. 샐린저",
    number: "47",
    mood: ["성장 이야기", "감성적인"],
    difficulty: "입문용",
    length: "보통",
    tagline: "위선이 가득한 세상 속에서 홀로 길을 잃은 소년의 솔직한 독백.",
    recommendationReason: "가식으로 가득 찬 성인 사회에 극도의 혐오를 느끼며 방황하는 10대 소년 홀든의 이야기를 통해 순수한 인간관계를 지키고 싶은 열망을 공감할 수 있습니다.",
    coverColor: "#D05A3F" // 민음사 오리지널 톤의 주홍색/코랄
  },
  {
    id: 9,
    title: "카라마조프 가의 형제들",
    author: "표도르 도스토옙스키",
    number: "200",
    mood: ["철학적인", "어두운"],
    difficulty: "깊이 있는 독서",
    length: "긴 호흡",
    tagline: "부친 살해 사건을 통해 인간 내면의 빛과 어둠의 한계를 끝까지 묻는다.",
    recommendationReason: "신앙과 불신, 선과 악, 인간 본성과 도덕성에 대한 우주적 질문을 숨 가쁜 치정 살인 서사 구조에 담아낸 도스토옙스키 문학의 집대성입니다.",
    coverColor: "#4A1525" // 아주 어두운 버건디/퍼플
  },
  {
    id: 10,
    title: "젊은 베르테르의 슬픔",
    author: "요한 볼프강 폰 괴테",
    number: "20",
    mood: ["사랑 이야기", "감성적인"],
    difficulty: "입문용",
    length: "짧게 읽기",
    tagline: "마음을 뒤흔드는 정열적인 사랑과 그 감당할 수 없는 파멸의 슬픔.",
    recommendationReason: "이룰 수 없는 사랑을 안고 서서히 파괴되어 가는 베르테르의 주체할 수 없는 열정이 서간체 형식의 애절하고 서정적인 문장으로 가슴을 울립니다.",
    coverColor: "#8C2F39" // 장미빛 레드
  },
  {
    id: 11,
    title: "그리스인 조르바",
    author: "니코스 카잔차키스",
    number: "207",
    mood: ["철학적인", "성장 이야기", "감성적인"],
    difficulty: "보통",
    length: "보통",
    tagline: "얽매이지 않는 영혼의 소유자 조르바가 외치는 진정한 자유와 삶의 찬가.",
    recommendationReason: "메마른 이론적 삶에 갇혀 있던 책벌레 주인공이 야성적이고 거침없는 조르바를 만나 진짜 삶의 생동과 자유를 느끼고 변화해 가는 감동을 줍니다.",
    coverColor: "#3F5E6B" // 바다빛 스틸 블루
  },
  {
    id: 12,
    title: "동물농장",
    author: "조지 오웰",
    number: "5",
    mood: ["철학적인", "어두운"],
    difficulty: "입문용",
    length: "짧게 읽기",
    tagline: "모든 동물은 평등하다. 그러나 어떤 동물들은 더 평등하다.",
    recommendationReason: "혁명의 열망이 어떻게 독재와 특권층의 변질로 부패하는지를 동물농장이라는 우화를 통해 가장 예리하고도 이해하기 쉽게 보여주는 명작입니다.",
    coverColor: "#5A5C5E" // 그레이
  }
];

// DOM 로드 완료 후 초기화
document.addEventListener("DOMContentLoaded", () => {
  // 섹션 엘리먼트
  const homeSection = document.getElementById("home-section");
  const quizSection = document.getElementById("quiz-section");
  const resultSection = document.getElementById("result-section");

  // 버튼 엘리먼트
  const btnStart = document.getElementById("btn-start");
  const btnSubmit = document.getElementById("btn-submit");
  const btnReset = document.getElementById("btn-reset");

  // 카드 렌더링 컨테이너
  const cardContainer = document.getElementById("card-container");
  const alertBox = document.getElementById("alert-box");

  // 헤더 로고 엘리먼트
  const headerLogo = document.getElementById("header-logo");

  // 0. 헤더 로고 클릭 시 메인페이지로 이동 및 초기화
  headerLogo.addEventListener("click", () => {
    resetQuiz();
    homeSection.classList.remove("hidden");
    quizSection.classList.add("hidden");
    resultSection.classList.add("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // 1. 메인 화면 -> 퀴즈 화면 전환
  btnStart.addEventListener("click", () => {
    transitionSection(homeSection, quizSection);
  });

  // 2. 퀴즈 제출 및 책 추천 로직
  btnSubmit.addEventListener("click", () => {
    // 선택 값 가져오기
    const selectedMood = document.querySelector('input[name="mood"]:checked')?.value;
    const selectedDifficulty = document.querySelector('input[name="difficulty"]:checked')?.value;
    const selectedLength = document.querySelector('input[name="length"]:checked')?.value;

    // 예외 처리: 모든 항목을 선택하지 않았을 때
    if (!selectedMood || !selectedDifficulty || !selectedLength) {
      showAlert("모든 질문에 답해주셔야 어울리는 책을 추천해 드릴 수 있어요.");
      return;
    }

    // 경고 박스 숨기기
    hideAlert();

    // 추천 책 리스트 계산
    const recommendedBooks = getRecommendations(selectedMood, selectedDifficulty, selectedLength);

    // 카드 렌더링
    renderCards(recommendedBooks);

    // 결과 화면으로 전환
    transitionSection(quizSection, resultSection);
  });

  // 3. 다시 추천받기 (초기화)
  btnReset.addEventListener("click", () => {
    resetQuiz();
    transitionSection(resultSection, quizSection);
  });

  // 섹션 부드러운 전환 함수
  function transitionSection(fromSection, toSection) {
    fromSection.classList.add("hidden");
    toSection.classList.remove("hidden");
    // 스크롤 맨 위로 이동
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // 커스텀 알림창 표시 함수
  function showAlert(message) {
    alertBox.textContent = message;
    alertBox.classList.remove("hidden");
    // 경고 박스 위치로 스크롤
    alertBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function hideAlert() {
    alertBox.classList.add("hidden");
  }

  // 설문 초기화
  function resetQuiz() {
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(radio => {
      radio.checked = false;
    });
    hideAlert();
    cardContainer.innerHTML = "";
  }

  // 알고리즘: 사용자의 기호에 따른 추천 점수 매기기
  function getRecommendations(mood, difficulty, length) {
    const scoredBooks = books.map(book => {
      let score = 0;

      // 1. 분위기 매치 (선택한 분위기가 도서 태그에 포함되면 가중치 부여)
      if (book.mood.includes(mood)) {
        score += 3;
      }

      // 2. 난이도 매치
      if (book.difficulty === difficulty) {
        score += 2;
      }

      // 3. 분량 매치
      if (book.length === length) {
        score += 2;
      }

      // 동률 방지 및 다양성을 위한 약간의 가중치
      // 도서 고유 번호를 활용한 소수점 가중치 부여로 일관성 있고 정교한 정렬 유지
      score += (book.id * 0.01);

      return { book, score };
    });

    // 점수 내림차순 정렬 후 상위 3권 반환
    scoredBooks.sort((a, b) => b.score - a.score);
    return scoredBooks.slice(0, 3).map(item => item.book);
  }

  // 추천 결과 카드 렌더링
  function renderCards(recommendedList) {
    cardContainer.innerHTML = "";

    recommendedList.forEach((book, index) => {
      const card = document.createElement("div");
      card.className = "book-card";
      // 페이드인 애니메이션 딜레이 설정
      card.style.animationDelay = `${index * 0.15}s`;

      card.innerHTML = `
        <div class="card-cover-wrapper" style="background-color: ${book.coverColor}">
          <div class="card-cover-grid">
            <span class="cover-number">No. ${book.number}</span>
            <div class="cover-title-group">
              <h3 class="cover-title">${book.title}</h3>
              <p class="cover-author">${book.author}</p>
            </div>
            <span class="cover-logo">민음사</span>
          </div>
        </div>
        <div class="card-info">
          <div class="card-meta">
            <span class="meta-tag tag-difficulty">난이도: ${book.difficulty}</span>
            <span class="meta-tag tag-length">분량: ${book.length}</span>
          </div>
          <p class="card-tagline">“${book.tagline}”</p>
          <div class="card-reason">
            <h4>추천 이유</h4>
            <p>${book.recommendationReason}</p>
          </div>
        </div>
      `;

      cardContainer.appendChild(card);
    });
  }
});
