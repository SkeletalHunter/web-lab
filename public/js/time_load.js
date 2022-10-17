(() => {
    window.onload = () => {
        let perf = performance.getEntriesByType("navigation")[0];
        let serv_time = document.getElementById("time");
        serv_time.innerHTML = `Время загрузки страницы ${(perf.loadEventStart - perf.loadEventEnd).toFixed(3)} ms (клиент)
        ${serv_time.innerHTML}`;
    };
} )();