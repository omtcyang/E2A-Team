document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.img-compare-container').forEach(function(container) {
    const afterImg = container.querySelector('.img-after');
    const slider = container.querySelector('.img-compare-slider');
    // 支持所有 hint 类名
    const hint = container.querySelector('.img-compare-hint-black, .img-compare-hint-white');
    const initialPercent = 20;

    // 初始化
    function resetCompare() {
      if (afterImg) {
        afterImg.style.clipPath = 'inset(0 ' + (100 - initialPercent) + '% 0 0)';
      }
      if (slider) {
        slider.style.left = initialPercent + '%';
      }
    }

    // 滑块拖动
    function setSlider(x) {
      const rect = container.getBoundingClientRect();
      let offset = x - rect.left;
      offset = Math.max(0, Math.min(offset, rect.width));
      const percent = offset / rect.width * 100;
      afterImg.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
      slider.style.left = percent + '%';
    }

    // 鼠标悬停时滑动
    container.addEventListener('mousemove', function(e) {
      setSlider(e.clientX);
    });

    // 鼠标进入时隐藏提示
    container.addEventListener('mouseenter', function() {
      if (hint) hint.style.display = 'none';
    });

    // 鼠标离开时恢复提示和初始比例
    container.addEventListener('mouseleave', function() {
      if (hint) hint.style.display = '';
      resetCompare();
    });

    // 支持触摸
    let startX = 0, startY = 0;
    container.addEventListener('touchstart', function(e) {
      if (hint) hint.style.display = 'none';
      if (e.touches.length > 0) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
      }
    }, {passive: false});

    container.addEventListener('touchmove', function(e) {
      if (e.touches.length > 0) {
        setSlider(e.touches[0].clientX);
        // 判断左右滑动，阻止页面滚动
        var dx = Math.abs(e.touches[0].clientX - startX);
        var dy = Math.abs(e.touches[0].clientY - startY);
        if (dx > dy) {
          e.preventDefault();
        }
      }
    }, {passive: false});

    container.addEventListener('touchend', function(e) {
      if (hint) hint.style.display = '';
      resetCompare();
    });

    // 页面加载时初始化一次
    resetCompare();
  });
});