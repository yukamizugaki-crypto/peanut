'use strict';

// ===== ページ先頭へスムーズスクロール =====
var pagetopBtn = document.getElementById('pagetop-btn');
if (pagetopBtn) {
  pagetopBtn.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ===== 商品カードのフェードイン =====
function init() {
  var cards = document.querySelectorAll('.product-card, .cartBox, .news-item, .topBox');
  cards.forEach(function(card, i) {
    card.style.opacity = '0';
    card.style.transform = 'translateY(18px)';
    card.style.transition = 'opacity .45s ease, transform .45s ease';
    setTimeout(function() {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 80 + i * 70);
  });

  // ページヒーロー・ページタイトルのアニメーション
  var hero = document.querySelector('.mainImage-catch');
  if (hero) {
    hero.style.opacity = '0';
    hero.style.transform = 'translateY(-12px)';
    hero.style.transition = 'opacity .6s ease, transform .6s ease';
    setTimeout(function() {
      hero.style.opacity = '1';
      hero.style.transform = 'translateY(0)';
    }, 100);
  }

  // お問い合わせフォーム送信（デモ）
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var btn = document.getElementById('contact-submit');
      btn.textContent = '送信しました';
      btn.style.background = '#27ae60';
      btn.disabled = true;
    });
  }

  // ===== モバイル用ナビゲーション位置調整 (ヘッダーの子要素に移動してstickyに連動させる) =====
  var header = document.getElementById('header');
  var gNavi = document.getElementById('gNavi');
  var headerRight = document.getElementById('headerRight');
  var originalParent = document.getElementById('mainImage');
  var mobileContact = null;

  function adjustLayout() {
    if (window.innerWidth <= 768) {
      if (header && gNavi && gNavi.parentNode !== header) {
        header.appendChild(gNavi);

        // お問い合わせ情報やSNSボタンをモバイルメニューの下部に複製して挿入
        if (headerRight && !mobileContact) {
          mobileContact = document.createElement('div');
          mobileContact.className = 'mobile-menu-contact';
          mobileContact.innerHTML = headerRight.innerHTML;
          gNavi.appendChild(mobileContact);
        }
      }
    } else {
      if (originalParent && gNavi && gNavi.parentNode !== originalParent) {
        originalParent.appendChild(gNavi);
        
        // モバイル用のお問い合わせ情報を削除
        if (mobileContact && mobileContact.parentNode === gNavi) {
          gNavi.removeChild(mobileContact);
          mobileContact = null;
        }

        // 開閉状態をクリア
        var menuToggle = document.getElementById('menu-toggle');
        if (menuToggle) {
          menuToggle.classList.remove('menu-active');
        }
        gNavi.classList.remove('menu-active');
      }
    }
  }

  // 初期実行とリサイズイベントの登録
  adjustLayout();
  window.addEventListener('resize', adjustLayout);

  // ===== ハンバーガーメニューの開閉制御 =====
  var menuToggle = document.getElementById('menu-toggle');
  if (menuToggle && gNavi) {
    menuToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      menuToggle.classList.toggle('menu-active');
      gNavi.classList.toggle('menu-active');
    });

    // メニュー外クリックで閉じる
    document.addEventListener('click', function(e) {
      if (!menuToggle.contains(e.target) && !gNavi.contains(e.target)) {
        menuToggle.classList.remove('menu-active');
        gNavi.classList.remove('menu-active');
      }
    });

    // メニュー内のリンクをクリックしたときに自動でメニューを閉じる
    var menuLinks = gNavi.querySelectorAll('a');
    menuLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        menuToggle.classList.remove('menu-active');
        gNavi.classList.remove('menu-active');
      });
    });
  }
}

// DOM構築完了後に実行する安全なラッパー
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
