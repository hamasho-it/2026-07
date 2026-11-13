// カサピタ アプリ共通 JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // ユーザー情報の読み込み（デフォルト値）
    const defaultProfile = {
        name: 'サンプル太郎',
        birthday: '1995年9月26日',
        prefecture: 'サンプル県',
        city: 'サンプル市',
        email: 'sample_user@example.com'
    };

    const savedProfile = JSON.parse(localStorage.getItem('kasapita_profile') || 'null') || defaultProfile;

    // 名前表示箇所の反映（チェックイン画面・マイページなど）
    document.querySelectorAll('.js-user-name').forEach(el => {
        el.textContent = savedProfile.name;
    });

    // マイページ詳細への反映
    const mypageBirthday = document.getElementById('mypage-birthday');
    if (mypageBirthday) mypageBirthday.textContent = savedProfile.birthday;

    const mypageRegion = document.getElementById('mypage-region');
    if (mypageRegion) mypageRegion.textContent = `${savedProfile.prefecture}${savedProfile.city}`;

    const mypageEmail = document.getElementById('mypage-email');
    if (mypageEmail) mypageEmail.textContent = savedProfile.email;

    // マイページ編集フォームの初期値セット
    const editForm = document.getElementById('mypage-edit-form');
    if (editForm) {
        const inputName = document.getElementById('edit-name');
        const inputBirthday = document.getElementById('edit-birthday');
        const inputPref = document.getElementById('edit-prefecture');
        const inputCity = document.getElementById('edit-city');
        const inputEmail = document.getElementById('edit-email');

        if (inputName) inputName.value = savedProfile.name;
        if (inputBirthday) inputBirthday.value = savedProfile.birthday;
        if (inputPref) inputPref.value = savedProfile.prefecture;
        if (inputCity) inputCity.value = savedProfile.city;
        if (inputEmail) inputEmail.value = savedProfile.email;
    }

    // 履歴削除ボタン機能
    const btnDeleteHistory = document.getElementById('btn-delete-history');
    if (btnDeleteHistory) {
        btnDeleteHistory.addEventListener('click', () => {
            const historyList = document.getElementById('history-list');
            if (historyList) {
                historyList.innerHTML = '<p style="text-align:center; padding: 20px; color: var(--color-text-sub); font-size: 16px;">履歴はありません</p>';
                alert('履歴を削除しました。');
            }
        });
    }

    // フォーム送信のイベント処理
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // マイページ編集フォームの場合は入力内容を保存
            if (form.id === 'mypage-edit-form') {
                const updatedProfile = {
                    name: document.getElementById('edit-name')?.value.trim() || defaultProfile.name,
                    birthday: document.getElementById('edit-birthday')?.value.trim() || defaultProfile.birthday,
                    prefecture: document.getElementById('edit-prefecture')?.value.trim() || defaultProfile.prefecture,
                    city: document.getElementById('edit-city')?.value.trim() || defaultProfile.city,
                    email: document.getElementById('edit-email')?.value.trim() || defaultProfile.email
                };
                localStorage.setItem('kasapita_profile', JSON.stringify(updatedProfile));
            }

            // 新規登録フォームの場合も名前・地域・メールを保存
            if (form.id === 'signup-form') {
                const signupName = document.getElementById('signup-name')?.value.trim() || defaultProfile.name;
                const signupBirthday = document.getElementById('signup-birthday')?.value.trim() || defaultProfile.birthday;
                const signupEmail = document.getElementById('signup-email')?.value.trim() || defaultProfile.email;
                const updatedProfile = {
                    ...savedProfile,
                    name: signupName,
                    birthday: signupBirthday,
                    email: signupEmail
                };
                localStorage.setItem('kasapita_profile', JSON.stringify(updatedProfile));
            }

            const action = form.getAttribute('action');
            if (action) {
                window.location.href = action;
            } else {
                alert('処理を完了しました。');
            }
        });
    });
});
