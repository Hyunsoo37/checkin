// 참여 신청 버튼 클릭 시 폼 표시/숨김 토글
document.getElementById("join-btn").addEventListener("click", () => {
    const form = document.getElementById("support-form");
    if (form.style.display === "none" || form.style.display === "") {
        form.style.display = "block";
    } else {
        form.style.display = "none";
    }
});

// 폼 제출 처리
document.getElementById("join-form").addEventListener("submit", (e) => {
    e.preventDefault(); // 기본 제출 동작 방지
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // 간단한 제출 확인 (실제로는 서버로 전송해야 한다)
    alert(`신청이 완료되었습니다!\n이름: ${name}\n이메일: ${email}\n메시지: ${message || "없음"}`);
    
    // 폼 초기화 및 숨김
    document.getElementById("join-form").reset();
    document.getElementById("support-form").style.display = "none";
});