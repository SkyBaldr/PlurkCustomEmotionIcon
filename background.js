"use strict";

(() => {
    console.log("init background.js");

//let PemBackupEmotIconListId = 'plurk_emotion_manager_emotion_icon_list';

//browserAction is changed to "action" in manifest v3, and only can use in background script...
    browser.action.onClicked.addListener(() => {
        console.log("init background.js");
        //browser.runtime.openOptionsPage();

        //seems can use permissions api...
        browser.permissions.request({
            permissions: ["downloads"],
            origins: ['*://*.plurk.com/*']
        });

        // let data = window.sessionStorage.getItem(PemBackupEmotIconListId);
        // console.log('data=', data);

    });

    browser.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
        //console.log("browser.runtime.onMessage called. message=", message);
        if (message.action !== 'data')
            return;

        let data = message.data;
        let res = '';
//    window.sessionStorage.setItem(PemBackupEmotIconListId, JSON.stringify(data, null, 2));  //use sessionstorage need convert to string.

        if (browser.downloads)
        {
            let blob = new Blob([data], {type: "application/json;charset=utf-8"});
            let fileUrl = URL.createObjectURL(blob);
            let timestamp = Math.floor( Date.now() / 1000 );

            await browser.downloads.download({
                url: fileUrl,
                filename: 'PemBak'+ timestamp + '.json',
                saveAs: true
            }).then((_) => {
                console.log("save ok");
                res = '已儲存';
            }).catch((e) => {
                console.log("save error=", e);
                res = '取消儲存';

            });

        }
        else
        {
            res = '儲存失敗。請到擴充套件設定，打開檔案儲存權限';
            console.log('browser.downloads not found');
        }

        return res;  //seems sendresponse isn't work... must call return and await style...
    });
})();
