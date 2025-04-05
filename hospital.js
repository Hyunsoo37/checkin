// Google Maps API 초기화
function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 37.5665, lng: 126.9780 }, // 서울 시청 좌표
      zoom: 13,
    });
  
    // 현재 위치 버튼 클릭 이벤트
    document.getElementById("current-location-btn").addEventListener("click", () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            map.setCenter(pos);
            map.setZoom(15);
            searchHospitals(pos);
          },
          () => {
            alert("현재 위치를 가져올 수 없습니다. 위치 서비스 권한을 확인해주세요.");
          }
        );
      } else {
        alert("이 브라우저에서는 위치 서비스를 지원하지 않습니다.");
      }
    });
  
    // 검색 버튼 클릭 이벤트
    document.getElementById("search-btn").addEventListener("click", () => {
      const location = document.getElementById("location").value;
      if (location) {
        // 여기에 실제 주소 검색 API 호출 코드가 들어갑니다
        // 임시로 서울 시청 좌표 사용
        const pos = { lat: 37.5665, lng: 126.9780 };
        map.setCenter(pos);
        searchHospitals(pos);
      } else {
        alert("주소 또는 지역명을 입력해주세요.");
      }
    });
  
    // 병원 검색 함수 (실제로는 API 호출이 필요)
    function searchHospitals(position) {
      // 임시 데이터 - 실제로는 API에서 가져와야 함
      const mockHospitals = [
        {
          name: "서울대학교병원",
          address: "서울특별시 종로구 대학로 101",
          phone: "02-2072-0000",
          distance: "1.2km",
          type: "internal",
          lat: 37.5794,
          lng: 126.9980
        },
        {
          name: "아산병원",
          address: "서울특별시 송파구 올림픽로 43길 88",
          phone: "02-3010-3114",
          distance: "3.5km",
          type: "surgical",
          lat: 37.5265,
          lng: 127.1064
        },
        {
          name: "세브란스병원",
          address: "서울특별시 서대문구 연세로 50-1",
          phone: "02-2228-0000",
          distance: "2.8km",
          type: "pediatric",
          lat: 37.5602,
          lng: 126.9421
        }
      ];
  
      // 지도에 마커 표시
      mockHospitals.forEach(hospital => {
        new google.maps.Marker({
          position: { lat: hospital.lat, lng: hospital.lng },
          map: map,
          title: hospital.name
        });
      });
  
      // 병원 목록 업데이트
      updateHospitalList(mockHospitals);
    }
  
    // 병원 목록 업데이트 함수
    function updateHospitalList(hospitals) {
      const hospitalList = document.getElementById("hospital-list");
      hospitalList.innerHTML = "";
  
      const selectedType = document.getElementById("hospital-type").value;
      const maxDistance = parseInt(document.getElementById("distance").value);
  
      hospitals.forEach(hospital => {
        // 필터링 조건
        if ((selectedType === "all" || hospital.type === selectedType) && 
            parseFloat(hospital.distance) <= maxDistance) {
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
            <div class="hospital-type">${getHospitalTypeName(hospital.type)}</div>
          `;
          hospitalList.appendChild(card);
        }
      });
    }
  
    // 병원 타입 한글명 변환
    function getHospitalTypeName(type) {
      const types = {
        "internal": "내과",
        "surgical": "외과",
        "pediatric": "소아과",
        "dental": "치과",
        "ophthalmology": "안과"
      };
      return types[type] || "기타";
    }
  
    // 필터 변경 이벤트 리스너
    document.getElementById("hospital-type").addEventListener("change", () => {
      // 실제로는 다시 검색을 수행해야 하지만, 여기서는 목업 데이터 사용
      const currentCenter = map.getCenter();
      searchHospitals({ lat: currentCenter.lat(), lng: currentCenter.lng() });
    });
  
    document.getElementById("distance").addEventListener("change", () => {
      const currentCenter = map.getCenter();
      searchHospitals({ lat: currentCenter.lat(), lng: currentCenter.lng() });
    });
  }