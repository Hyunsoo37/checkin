// Google Maps API 초기화
function initMap() {
  const centerPos = { lat: 37.6288, lng: 127.2162 }; // 남양주시 경춘로 883-36 (금곡동)
  const map = new google.maps.Map(document.getElementById("map"), {
      center: centerPos,
      zoom: 13,
  });

  // 지정된 위치에 마커 추가
  new google.maps.Marker({
      position: centerPos,
      map: map,
      title: "남양주시자원봉사센터",
      icon: {
          url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png", // 파란색 마커로 표시
      },
  });

  // 정신과 병원 검색 함수
  function searchHospitals(position) {
      // 목업 데이터 - 남양주시 및 인근 지역 기준
      const mockHospitals = [
          {
              name: "남양주정신건강의학과의원",
              address: "경기도 남양주시 경춘로 123",
              phone: "031-555-1234",
              distance: "3.2km",
              type: "psychiatry",
              lat: 37.6300,
              lng: 127.2200,
          },
          {
              name: "진접신경정신과",
              address: "경기도 남양주시 진접읍 장현로 456",
              phone: "031-567-8901",
              distance: "5.7km",
              type: "psychiatry",
              lat: 37.7200,
              lng: 127.1900,
          },
          {
              name: "구리정신건강의학과",
              address: "경기도 구리시 경춘로 789",
              phone: "031-234-5678",
              distance: "8.4km",
              type: "psychiatry",
              lat: 37.6000,
              lng: 127.1300,
          },
      ];

      // 지도에 병원 마커 표시
      mockHospitals.forEach((hospital) => {
          new google.maps.Marker({
              position: { lat: hospital.lat, lng: hospital.lng },
              map: map,
              title: hospital.name,
          });
      });

      // 병원 목록 업데이트
      updateHospitalList(mockHospitals);
  }

  // 병원 목록 업데이트 함수
  function updateHospitalList(hospitals) {
      const hospitalList = document.getElementById("hospital-list");
      hospitalList.innerHTML = "";

      hospitals.forEach((hospital) => {
          const card = document.createElement("div");
          card.className = "hospital-card";
          card.innerHTML = `
              <div class="hospital-name">${hospital.name}</div>
              <div class="hospital-info">
                  <i class="fas fa-map-marker-alt"></i> ${hospital.address}
              </div>
              <div class="hospital-info">
                  <i class="fas fa-phone"></i> ${hospital.phone}
              </div>
              <div class="hospital-info">
                  <i class="fas fa-walking"></i> 거리: <span class="hospital-distance">${hospital.distance}</span>
              </div>
              <div class="hospital-type">정신과</div>
          `;
          hospitalList.appendChild(card);
      });
  }

  // 병원 검색 실행 (고정 위치 사용함)
  searchHospitals(centerPos);
}