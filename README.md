# Plurk Custom EmotionIcon

![](screenshot.png)

安裝之後，必須到本擴充套件設定的權限頁面進行授權。
授權網頁存取，本擴充套件才能運作。
授權檔案下載，才能儲存備份表符檔案。

擴充套件設定授權之後，重新載入頁面，會出現本擴充套件的icon。
點擊icon之後再進行Plurk授權。本擴充套件才能存取線上表符。

功能：
讀取自訂表符備份檔：支援噗浪卡卡的備份檔。以累加的方式運作。自動過濾重複網址的表符（不管圖像是否相同），重複keyword會自動加上編碼keyword

儲存表符備份檔：可儲存備份表符區的所有自訂表符（只有圖檔連結）

蒐集者之眼：每５秒蒐集一次頁面上的表符，噗內的必須打開噗的狀態才能取得。
若有取得線上表符也會自動收集

線上新增自訂表符：在備份表符區點擊該表符即可新增至線上表符

線上移除自訂表符：在線上表符區點擊該表符即可移除該線上表符


##關於使用程式碼自行載入

app key與app secret請自行到 https://www.plurk.com/PlurkApp/create 申請。填入appconfig.js的對應參數。
chrome使用需注意： 請把manifest裡面的"browser_specific_settings"與"background"兩個參數註解，即可通過安裝檢查。
