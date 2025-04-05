// 활동 목록 초기화
function initActivities() {
    const activityList = document.getElementById("activity-list");
    const activities = [
        "미술치료 - 감정을 그림으로 표현하기",
        "음악치료 - 함께 노래 부르기",
        "무용·동작 치료 - 몸으로 스트레스 풀기",
        "드라마 치료 - 역할극으로 감정 이해하기",
        "문학·글쓰기 치료 - 일기 쓰기와 공유",
    ];

    activities.forEach((activity) => {
        const card = document.createElement("div");
        card.className = "activity-card";
        card.textContent = activity;
        activityList.appendChild(card);
    });
}

// 참여 신청 폼 표시
function showJoinForm() {
    const formSection = document.getElementById("support-form");
    formSection.style.display = "block";
    document.getElementById("join-btn").style.display = "none"; // 버튼 숨기기
}

// 폼 제출 처리
document.getElementById("join-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // 간단한 제출 확인 (실제 서버 연동은 별도 필요)
    alert(`${name}님의 신청이 완료되었습니다!\n이메일: ${email}\n메시지: ${message || "없음"}`);
    this.reset();
    document.getElementById("support-form").style.display = "none";
    document.getElementById("join-btn").style.display = "block"; // 버튼 다시 보이기
});

// 페이지 로드 시 활동 목록 초기화
window.onload = initActivities;