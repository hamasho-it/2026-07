// カサピタ アプリ共通 JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // 履歴削除ボタン機能
    const btnDeleteHistory = document.getElementById('btn-delete-history');
    if (btnDeleteHistory) {
        btnDeleteHistory.addEventListener('click', () => {
            const historyList = document.getElementById('history-list');
            if (historyList) {
                historyList.innerHTML = '<p style="text-align:center; padding: 20px; color: #888; font-size: 16px;">履歴はありません</p>';
                alert('履歴を削除しました。');
            }
        });
    }

    // フォーム送信のイベント処理（action属性がある場合はそのページへ遷移）
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const action = form.getAttribute('action');
            if (action) {
                window.location.href = action;
            } else {
                alert('処理を完了しました。');
            }
        });
    });
});
