// Lucide 아이콘 초기화
lucide.createIcons();

// 네비게이션 링크 클릭 이벤트 핸들러
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        // active 클래스 업데이트
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        e.target.closest('.nav-link').classList.add('active');

        // 타겟 섹션으로 스크롤
        const targetId = e.target.closest('.nav-link').getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const headerOffset = 20;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    });
});

// 인구 추이 차트
const populationCtx = document.getElementById('populationChart').getContext('2d');
new Chart(populationCtx, {
    type: 'line',
    data: {
        labels: ['2019', '2020', '2021', '2022', '2023'],
        datasets: [{
            label: '노인 인구 (%)',
            data: [8.2, 8.9, 9.4, 9.8, 10.4],
            borderColor: '#3b82f6',
            borderWidth: 2,
            tension: 0.3
        }]
    },
    options: {
        responsive: true,
        plugins: {
            title: { display: true, text: '노인 인구 변화 추이' }
        }
    }
});

// 교통사고 추이 차트
const accidentCtx = document.getElementById('accidentChart').getContext('2d');
new Chart(accidentCtx, {
    type: 'line',
    data: {
        labels: ['2019', '2020', '2021', '2022', '2023'],
        datasets: [{
            label: '교통사고 건수',
            data: [76, 79, 73, 82, 104],
            borderColor: '#ef4444',
            borderWidth: 2,
            tension: 0.3
        }]
    },
    options: {
        responsive: true,
        plugins: {
            title: { display: true, text: '교통사고 발생 추이' }
        }
    }
});

// 지도 초기화
const map = L.map('map').setView([36.50972725, 127.2591418], 12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// 보호구역 데이터
const zones = [
    { name: "밀마루복지마을", lat: 36.50972725, lon: 127.2591418 },
    { name: "전의복지회관", lat: 36.67989279, lon: 127.2085989 },
    { name: "송학2리 노인복지관", lat: 36.53916873, lon: 127.1908696 },
    { name: "세종경로당", lat: 36.60069182, lon: 127.3034413 },
];

// 지도에 보호구역 표시
zones.forEach(zone => {
    L.marker([zone.lat, zone.lon])
        .addTo(map)
        .bindPopup(`<b>${zone.name}</b>`);

    L.circle([zone.lat, zone.lon], {
        color: '#3b82f6',
        fillColor: '#3b82f6',
        fillOpacity: 0.2,
        radius: 300
    }).addTo(map);
});
