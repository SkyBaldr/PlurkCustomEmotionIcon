'use strict';


(() => {
    let debug = false;
    if (debug) console.log('loading main.js');
    /**
     * Check and set a global guard variable.
     * If this content script is injected into the same page again,
     * it will do nothing next time.
     */
    if (window.plurk_custom_emotionicon_loaded) {
        if (debug) console.log('plurk_custom_emotionicon_loaded... return');
        return;
    }
    window.plurk_custom_emotionicon_loaded = true;


    // if (debug) console.log('inserting css');
    // browser.tabs.insertCSS({ file: 'styles.css' });

    let oAuthKey = '';
    let oAuthSecret = '';

    if (pemConfig)
    {
        oAuthKey = pemConfig.appKey;
        oAuthSecret = pemConfig.appSecret;
    }
    else
    {
        console.log("pemConfig not found. abort Plurk Custom EmotionIcon init");
        return;
    }

    let sigMethod = 'HMAC-SHA1';
    let oauthVer = '1.0';

    let PemIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAABhGlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9Ti6IVBzuIOGSoThbELxy1CkWoEGqFVh1MLv2CJg1Jiouj4Fpw8GOx6uDirKuDqyAIfoC4ujgpukiJ/0sKLWI8OO7Hu3uPu3eAUC8zzeoYAzTdNlOJuJjJroqdr+iBgBCmEJOZZcxJUhK+4+seAb7exXiW/7k/R6+asxgQEIlnmWHaxBvE05u2wXmfOMKKskp8Tjxq0gWJH7muePzGueCywDMjZjo1TxwhFgttrLQxK5oa8SRxVNV0yhcyHquctzhr5Spr3pO/MJzTV5a5TnMICSxiCRJEKKiihDJsxGjVSbGQov24j3/Q9UvkUshVAiPHAirQILt+8D/43a2Vnxj3ksJxIPTiOB/DQOcu0Kg5zvex4zROgOAzcKW3/JU6MPNJeq2lRY+Avm3g4rqlKXvA5Q4w8GTIpuxKQZpCPg+8n9E3ZYH+W6B7zeutuY/TByBNXSVvgINDYKRA2es+7+5q7+3fM83+fgCTOnK0BiGPRAAAAvpQTFRF/+nlUor+nsb2gqLoaZ7+0tr+Zo7kjrbuutry0+7+ZpbvTpL+6u79kqrmfqrutsb2prr2dp7shq7vcpbq6vr+WpLymr7ydp70qsb0zeb8Yob+gqrwttL59vr8rc75dpLuytryZpb40ub7ZorymrbyYpr93u79WpL+iq7tcpbzeabzsML13ub7/vr9yOL64fb8cqb+pMLwssb1wtb5i6bvbp7tjrb5Xo7xhqL2VpL2eqbqbpb6bp76ztr6Z5L0YpL5i673krLwfp7y2ub8Wo70bpLqbpbv9vb+rMb6vtL5+f715u77fp7rnb78iqrxepr0hKbpZo7qt87zdqL1ss7yXo797Pb+eprl8vr+yN71Zpr70ur5dJr1qsL1lrbowtr7fKr5YpLqgqr9XJb9bqL4Upb1pb77eqLimrb24fL9irLyfqb6lrb6m7L1ss780uL9gq78nsLxqsr2bo7ypML4Vpb1bpLy+f79g6bwUo79aJLlaprvcprr7f79utb5Z4703+r82vb+psb0kq712u7+5vb+ytb2Wor9zuL7lbL3/vb+2uL7/v72ssr1bprnvtb0lrrywt7yYpbukrrytsr4or71Xpbuzur2Xor8nLrscqLwkrr6gqb48vb+mrr5hrL26vL+rtL64vr+jLL4rMr8ncL6Z5Lsfa74vdr7kq7sd577x9r8eab7bpr5zt77Z5L8Ypb7fqL02ur65vL9jqr6t878stL0x977c5r6UZb7eaLrlrr3Z478psr20t78fqLr8v7+stL92vL+5vr+Wo7+gqLwVpL9eprrlrbxYpLxVpb8/v7+ssr7bprvvtb7wt77osbuao7ikrbwapbvUpL9ep7sXpLynr7yrsb1hqrwutL5+vr7apb51ub84u7+XpL8jq7xdpbz4ub6xtb6cp7wkrb4Yo7vfqbrcp75lrLy+vb2eqL2Yo76apr71ur3hqr2cqL7jrLu1uL2hq73rsrxVo79dprtusr7pr70Yor7hqb3nrr3Vor6dpbsE4hLtwAAAAF0Uk5TAEDm2GYAAAABYktHRACIBR1IAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH5wsCBTYvPkoWxwAAACJ0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUCBvbiBhIE1hY4eod0MAAADXSURBVEjHtZa7CQJBEIa3BjOLsAfjy8ztY5uYOqzB8ECYZHq4IswFH4jo7Lx+1D85WL6Pfd9sa2P4lVYIq4D4PXsMD3rhIChvGZxkBfLM24w/L8GoDL6LdNdgW6C1Z5hjllscgasCZx3MuvEY893ZP48XsgWLnx6C2EfEaL2QxzvCRt5CStiN/ElUPgw90/n5LQsyChMmqMWt9ND/LhAo4HM4oILa6kwIzlJlDgWB/AthCsUbF/9iUR4XGsrjQkP5moEWFLRkfV8U8bKLF3ZP+e3jJH/+XAEarW+SVM7P2QAAAABJRU5ErkJggg==';

    let trdLicText = 'oauth-signature\n' +
        'https://github.com/bettiolo/oauth-signature-js\n' +
        'Copyright (c) 2014, Marco Bettiolo\n' +
        'All rights reserved.\n' +
        '\n' +
        'Redistribution and use in source and binary forms, with or without\n' +
        'modification, are permitted provided that the following conditions are met:\n' +
        '\n' +
        '* Redistributions of source code must retain the above copyright notice, this\n' +
        '  list of conditions and the following disclaimer.\n' +
        '\n' +
        '* Redistributions in binary form must reproduce the above copyright notice,\n' +
        '  this list of conditions and the following disclaimer in the documentation\n' +
        '  and/or other materials provided with the distribution.\n' +
        '\n' +
        '* Neither the name of the copyright holder nor the names of its\n' +
        '  contributors may be used to endorse or promote products derived from\n' +
        '  this software without specific prior written permission.\n' +
        '\n' +
        'THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"\n' +
        'AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE\n' +
        'IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE\n' +
        'DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE\n' +
        'FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL\n' +
        'DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR\n' +
        'SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER\n' +
        'CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,\n' +
        'OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE\n' +
        'OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.';

    //let emotIconLimit = 60;
    let appname = 'Plurk Emotion Icon Manager';
    let reqTokenUrl = 'https://www.plurk.com/OAuth/request_token';
    let authUrl = 'https://www.plurk.com/OAuth/authorize';
    let accTokenUrl = 'https://www.plurk.com/OAuth/access_token';
    let redirectUrl = 'https://www.plurk.com/';
    let getEmoticonsUrl = 'https://www.plurk.com/APP/Emoticons/get';
    let addEmoticonsUrl = 'https://www.plurk.com/APP/Emoticons/addFromURL';
    let delEmoticonsUrl = 'https://www.plurk.com/APP/Emoticons/delete';

    let PemStringGeneralIcon = '表符';
    let PemStringBtnGrantAccess = '授權存取';
    let PemStringBtnRegrantAccess = '重新授權';
    let PemStringBtnGetOnlineEmotIcon = '取得線上表符';
    let PemStringBtnLoadBakEmotIcon = '讀取備份檔';
    let PemStringBtnSaveBakEmotIcon = '儲存備份檔';
    let PemStringBtnScanEmotIcon = '啟動蒐集者之眼';
    let PemStringBtnClearBakEmotIcon = '清除備份表符';

    let PemStringGrantDesc = '請取得授權，才能存取線上表符';
    let PemStringScanEmoticonDesc = '啟動之後，每５秒會蒐集一次頁面上有顯示的表符';
    let PemStringConfirmClearBackupIconDesc = '確定要清除所有備份區的表符？（建議先儲存備份檔。線上表符不受影響。）';
    let PemStringGranted = '取得授權成功';
    let PemStringGrantFailed = '取得授權失敗，請重試';
    let PemStringReGrant = '已取得授權。要重新授權？';
    let PemStringExpiredReGrant = '授權已逾期，請重新授權';
    let PemStringEmoticonOverLimit = '無法新增表符，可能表符已滿（無噗幣狀態只能有60個表符）';
    let PemStringSaveOK = '儲存完成';
    let PemStringNoIconForSave = '無表符供儲存';

    let PemOauthTempTokenId = 'plurk_emotion_manager_oauth_temp_token';
    let PemOauthTempTokenSecretId = 'plurk_emotion_manager_oauth_temp_token_secret';
    let PemOauthPermTokenId = 'plurk_emotion_manager_oauth_perm_token';
    let PemOauthPermTokenSecretId = 'plurk_emotion_manager_oauth_perm_token_secret';
    let PemBackupEmotIconListId = 'plurk_emotion_manager_emotion_icon_list';
    let PemBrowserUniqueId = 'plurk_emotion_manager_id';

    let customFeatureIconId = 'customFeatureIcon';
    let PemPopWindowNodeId = 'pem-popwindow';
    let PemPopWindowOverlayNodeId = 'pem-popwindow-overlay';
    let PemPopWindowViewNodeId = 'pem-popwindow-view';
    let PemPopWindowHeaderNodeId = 'pem-popwindow-header';
    let PemPopWindowCloseNodeId = 'pem-popwindow-close';
    let PemPopWindowTitleNodeId = 'pem-popwindow-title';
    let PemPopWindowContentNodeId = 'pem-popwindow-content';
    let PemFeatureBtnHolderNodeId = 'pem-feature-btn-holder';
    let PemTab0NodeId = 'pem-tab0';
    let PemReqaccessBtnNodeId = 'pem-reqaccess-btn';
    let PemRefreshServerIconsBtnNodeId = 'pem-refresh-server-icons-btn';
    let PemLoadBackupFileHiddenNodeId = 'pem-load-file-hidden';
    let PemLoadBackupFileNodeId = 'pem-load-file';
    let PemSaveBackupFileNodeId = "pem-save-file";
    let PemClearBackupEmoticonsNodeId = 'pem-clear-backup-emoticons';
    let PemScanEmoticonsNodeId = 'pem-scan-emoticons';
    let PemTrdLicAgreeNodeId = 'pem-trd-lic-agree';
    let PemEmotIconsTitleId = 'pem-emoticons-title';
    let PemEmotIconsHolderId = 'pem-emoticons-holder';
    let PemEmotIconsUlId = 'pem-emoticons-ul';
    let PemBackupEmotIconsTitleId = 'pem-backup-emoticons-title';
    let PemBackupEmotIconsHolderId = 'pem-backup-emoticons-holder';
    let PemBackupEmotIconsUlId = 'pem-backup-emoticons-ul';
    let PemEmoticonLiIndexKey = 'pem-emotion-li-index';
    let PemEmoticonBackupLiIndexKey = 'pem-emotion-bak-li-index';
    let PemLiIndexPrefix = 'pem-emotion-li-';
    let PemLiImgIndexPrefix = 'pem-emotion-li-img-';
    let PemBakLiIndexPrefix = 'pem-bakemoticon-li-';
    let PemBakLiImgIndexPrefix = 'pem-bakemoticon-li-img-';
    let PemTab1NodeId = 'pem-tab1';

    let customFeatureIcon;
    let plurkLayoutBodyNode;
    let popWindowNode;
    let popwindowoverlayNode;
    let popwindowviewNode;
    let popwindowheaderNode;
    let popwindowcloseNode;
    let popwindowtitleNode;
    let popwindowcontentNode;
    let popwindowtab0Node;
    let featureBtnHolderNode;
    let popwindowtab1Node;
    let reqaccesstokenNode;
    let refreshServerIconsNode;
    let loadBackupFileHiddenNode;
    let loadBackupFileNode;
    let saveBackupFileNode;
    let clearBackupEmoticonsNode;
    let emotIconsTitleNode;
    let emotIconsHolderNode;
    let backupEmotIconsTitleNode;
    let backupEmotIconsHolderNode;
    let emotIconsUlNode;
    let backupEmotIconsUlNode;
    let scanEmoticonsNode;
    let trdLicAgreeNode;

    let emotIconsLiNodeArray = [];
    let emotIconsImgNodeArray = [];
    let backupEmotIconsArray = [];
    let backupEmotIconsLiNodeArray = [];
    let backupEmotIconsImgNodeArray = [];

    let scanInterval;


    function xpath(expression, context) {
        return document.evaluate(expression, context, null,
            XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    }

    /**
     *
     * @param str
     * return array.
     */
    function getUrlParams(str)
    {
        let dict = new Map();

        let getSearch = str.split('?');
        let getPara = getSearch.length > 1 ? getSearch[1].split('&') : getSearch[0].split('&');
        for (let i = 0; i < getPara.length; i++)
        {
            let val = getPara[i].split('=');
            if (val.length == 2)
            {
                dict.set(val[0], val[1]);
            }
        }

        return dict;
    }

    function addUrlParamsMap(url, paramsMap) {
        let str = url;

        if (debug) console.log('paramsMap type=', typeof paramsMap);

        //if (typeof paramsMap === 'Map')
        {
            for (const entry of paramsMap.entries()) {
                if (str.indexOf('?') < 0)
                {
                    str += '?';
                }
                else
                {
                    str += '&';
                }

                str += (entry[0] + '=' + entry[1]);
            }
        }

        return str;
    }

    function makeOauthReqUrl(url, oAuthKey, oAuthSecret, redirectUrl)
    {
        let nonce = Math.floor(Math.random() * 999999);
        let timestamp = Math.floor( Date.now() / 1000 );
        let paramsMap = new Map();

        // paramater order for signature must be same as test console.
        let parameters = {};
        parameters.oauth_callback =  redirectUrl;  // DON'T USE ENCODEURI...
        parameters.oauth_consumer_key = oAuthKey;
        parameters.oauth_nonce =  nonce;
        parameters.oauth_version =  oauthVer;
        parameters.oauth_signature_method =  sigMethod;
        parameters.oauth_timestamp =  timestamp;


        let oAuthSig = oauthSignature.generate('GET', url, parameters, oAuthSecret);
        if (debug) console.log('oAuthSig=', oAuthSig);

        // paramater order seems no affect. but it is better same with signature encoding
        paramsMap.set('oauth_callback', redirectUrl);  // DON'T USE ENCODEURI...
        paramsMap.set('oauth_consumer_key', oAuthKey);
        paramsMap.set('oauth_nonce', nonce);
        paramsMap.set('oauth_version', oauthVer);
        paramsMap.set('oauth_signature_method', sigMethod);
        paramsMap.set('oauth_timestamp', timestamp);
        paramsMap.set('oauth_signature', oAuthSig);  //add last.

        let oAuthUrl = addUrlParamsMap(url, paramsMap);
        if (debug) console.log('oAuthReqUrl=', oAuthUrl);

        return oAuthUrl;
    }

    function makeOauthAccUrl(url, oAuthKey, oAuthSecret, oAuthToken, oAuthTokenSecret, oAuthVerifier)
    {
        let nonce = Math.floor(Math.random() * 999999);
        let timestamp = Math.floor( Date.now() / 1000 );
        let paramsMap = new Map();

        // paramater order for signature must be same as test console.
        let parameters = {};
        parameters.oauth_consumer_key = oAuthKey;
        parameters.oauth_timestamp =  timestamp;
        parameters.oauth_nonce =  nonce;
        parameters.oauth_version =  oauthVer;
        parameters.oauth_signature_method =  sigMethod;
        parameters.oauth_token =  oAuthToken;
        parameters.oauth_token_secret =  oAuthTokenSecret;
        parameters.oauth_verifier =  oAuthVerifier;

        let oAuthSig = oauthSignature.generate('GET', url, parameters, oAuthSecret , oAuthTokenSecret);
        if (debug) console.log('oAuthSig=', oAuthSig);

        // paramater order seems no affect. but it is better same with signature encoding
        paramsMap.set('oauth_consumer_key', oAuthKey);
        paramsMap.set('oauth_timestamp', timestamp);
        paramsMap.set('oauth_nonce', nonce);
        paramsMap.set('oauth_version', oauthVer);
        paramsMap.set('oauth_signature_method', sigMethod);
        paramsMap.set('oauth_token', oAuthToken);
        paramsMap.set('oauth_token_secret', oAuthTokenSecret);
        paramsMap.set('oauth_verifier', oAuthVerifier);
        paramsMap.set('oauth_signature', oAuthSig);  //add last.

        let oAuthUrl = addUrlParamsMap(url, paramsMap);
        if (debug) console.log('oAuthAccUrl=', oAuthUrl);

        return oAuthUrl;
    }

    function makeApiUrl(url, oAuthKey, oAuthSecret, oAuthToken, oAuthTokenSecret, otherParams)
    {
        let nonce = Math.floor(Math.random() * 999999);
        let timestamp = Math.floor( Date.now() / 1000 );
        let paramsMap = new Map();

        // paramater order for signature must be same as test console.
        let parameters = {};
        if (otherParams)
        {
            for (const entry of otherParams.entries()) {
                parameters[entry[0]] = entry[1];
            }
        }
        parameters.oauth_consumer_key = oAuthKey;
        parameters.oauth_timestamp =  timestamp;
        parameters.oauth_nonce =  nonce;
        parameters.oauth_version =  oauthVer;
        parameters.oauth_signature_method =  sigMethod;
        parameters.oauth_token =  oAuthToken;


        let apiSig = oauthSignature.generate('GET', url, parameters, oAuthSecret, oAuthTokenSecret);
        if (debug) console.log('apiSig=', apiSig);

        // paramater order seems no affect. but it is better same with signature encoding
        if (otherParams)
        {
            for (const entry of otherParams.entries()) {
                paramsMap.set(entry[0], entry[1]);
            }
        }
        paramsMap.set('oauth_consumer_key', oAuthKey);
        paramsMap.set('oauth_timestamp', timestamp);
        paramsMap.set('oauth_nonce', nonce);
        paramsMap.set('oauth_version', oauthVer);
        paramsMap.set('oauth_signature_method', sigMethod);
        paramsMap.set('oauth_token', oAuthToken);
        paramsMap.set('oauth_signature', apiSig);

        let apiUrl = addUrlParamsMap(url, paramsMap);
        if (debug) console.log('apiUrl=', apiUrl);

        return apiUrl;
    }


    /**
     *
     * @param rootNode : null for global search.
     * @param tagname : must not empty or null, or won't found any
     * @param attrname
     * @param attrvalueforsearch
     * @returns elements
     */
    function attrsearch(rootNode, tagname, attrname, attrvalue)
    {
        if (debug) console.log('call  attrsearch()', rootNode+ ', ' + tagname + ', ' + attrname + ', ' + attrvalue);
        let elements;
        let query;

        if (!rootNode)
            rootNode = document;

        if (tagname && attrname && attrvalue)
        {
            query = (rootNode === document ? '//' : './/') + tagname + '[@' + attrname +'="' + attrvalue + '"]';

        }
        else if (tagname && attrname)
        {
            query = (rootNode === document ? '//' : './/') +tagname+'[@' + attrname + ']';
        }
        else if (tagname)
        {
            query = (rootNode === document ? '//' : './/') +tagname;

        }

        if (debug) console.log('query=', query);

        elements = xpath(query, rootNode);
        if (debug) console.log('attrsearch elements length=' + elements.snapshotLength);
        if (elements.snapshotLength > 0)
        {
            if (debug) console.log('attrsearch ' + elements.snapshotLength + ' elements found');
            return elements;
        }

        return false;
    }



    function init() {
        // your code here
        if (debug) console.log('DOMContentLoaded called');

        let currentUrl = location.search;

        let urlParams = getUrlParams(currentUrl);

        let oauthVerifier = urlParams.get('oauth_verifier');
        let oauthTokenFromUrl = urlParams.get('oauth_token');

        let oauth_temp_token = window.localStorage.getItem(PemOauthTempTokenId);
        let oauth_temp_token_secret = window.localStorage.getItem(PemOauthTempTokenSecretId);


        if (debug) console.log('oauthTokenFromUrl=' , oauthTokenFromUrl , ', oauthVerifier=' , oauthVerifier);
        if (debug) console.log('oauth_temp_token=' , oauth_temp_token , ', oauth_temp_token_secret=' , oauth_temp_token_secret);

        let iconsHolderNodes;
        let iconsHolderNode;
        let itemContainerNodes;
        let itemContainerNode;

        let plurkFormNodes = attrsearch(null, 'div', 'class', 'plurkForm');
        if (plurkFormNodes && plurkFormNodes.snapshotLength > 0)
        {
            iconsHolderNodes = attrsearch(plurkFormNodes.snapshotItem(0), 'ul', 'class', 'icons_holder');

            if (iconsHolderNodes && iconsHolderNodes.snapshotLength > 0)
            {
                iconsHolderNode = iconsHolderNodes.snapshotItem(0);
            }
        }



        if (!iconsHolderNode) //plurk form not found. put icon in somewhere...
        {
            let plurkTopBarNodes = attrsearch(null, 'div', 'id', 'top-bar-user');
            if (plurkTopBarNodes && plurkTopBarNodes.snapshotLength > 0)
            {
                itemContainerNodes = attrsearch(plurkTopBarNodes.snapshotItem(0), 'ul', 'class', 'item-container');

                if (itemContainerNodes && itemContainerNodes.snapshotLength > 0)
                {
                    itemContainerNode = itemContainerNodes.snapshotItem(0);
                }
            }
        }

        if (!iconsHolderNode && !itemContainerNode)  //maybe plurk layout not rendered.
            return;



        if (!customFeatureIcon)  //find first to prevent double add
            customFeatureIcon = document.getElementById(customFeatureIconId);

        if (!customFeatureIcon) {
            customFeatureIcon = document.createElement('li');
            customFeatureIcon.id = customFeatureIconId;
            //customFeatureIcon.setAttribute('src', '/icons/icon.gif');
            //customFeatureIcon.style.height = '32px';
            //customFeatureIcon.className = 'pem-icon';
            //customFeatureIcon.textContent = 'aaaa';

            if (iconsHolderNode)
                iconsHolderNode.appendChild(customFeatureIcon);
            else if (itemContainerNode)
                itemContainerNode.appendChild(customFeatureIcon);

            const customFeatureImgIcon = document.createElement('img');
            customFeatureImgIcon.src = PemIcon;
            customFeatureImgIcon.style.width = '32px';
            customFeatureImgIcon.style.height = '32px';
            customFeatureIcon.appendChild(customFeatureImgIcon);
        }
        customFeatureIcon.addEventListener('click', (ev) => {
            if (debug) console.log('customFeature clicked');

            if (popWindowNode) {
                popWindowNode.classList.add('show');
            }

        });


        let plurkLayoutBodyNodes = attrsearch(null, 'div', 'id', 'layout_body');

        if (plurkLayoutBodyNodes.snapshotLength > 0) {
            plurkLayoutBodyNode = plurkLayoutBodyNodes.snapshotItem(0);
        }
        
        if (!plurkLayoutBodyNode)  //maybe plurk layout not rendered.
            return;

        if (!popWindowNode)  //find first to prevent double add
            popWindowNode = document.getElementById(PemPopWindowNodeId);

        if (!popWindowNode)
        {
            popWindowNode = document.createElement('div');
            popWindowNode.className = 'pop-window poll-editor-popwindow';
            popWindowNode.id = PemPopWindowNodeId;
            plurkLayoutBodyNode.appendChild(popWindowNode);
        }

        if (!popwindowoverlayNode)  //find first to prevent double add
            popwindowoverlayNode = document.getElementById(PemPopWindowOverlayNodeId);

        if (!popwindowoverlayNode)
        {
            popwindowoverlayNode = document.createElement('div');
            popwindowoverlayNode.id = PemPopWindowOverlayNodeId;
            popwindowoverlayNode.className = 'pop-window-overlay';
            popWindowNode.appendChild(popwindowoverlayNode);
            
        }
        popwindowoverlayNode.addEventListener('click', (ev) => {
            if (debug) console.log('popwindowoverlayNode clicked');
            if (popWindowNode)
            {
                popWindowNode.classList.remove('show');
            }
        });

        if (!popwindowviewNode)  //find first to prevent double add
            popwindowviewNode = document.getElementById(PemPopWindowViewNodeId);

        if (!popwindowviewNode)
        {
            popwindowviewNode = document.createElement('div');
            popwindowviewNode.id = PemPopWindowViewNodeId;
            popwindowviewNode.className = 'pop-window-view';
            popwindowviewNode.style.left = '20vw';
            popwindowviewNode.style.top = '10vh';
            popwindowviewNode.style.width = '60vw';
            popwindowviewNode.style.height = '80vh';
            popWindowNode.appendChild(popwindowviewNode);
        }

        if (!popwindowheaderNode)  //find first to prevent double add
            popwindowheaderNode = document.getElementById(PemPopWindowHeaderNodeId);

        if (!popwindowheaderNode)
        {
            popwindowheaderNode = document.createElement('div');
            popwindowheaderNode.id = PemPopWindowHeaderNodeId;
            popwindowheaderNode.className = 'pop-window-header';
            popwindowviewNode.appendChild(popwindowheaderNode);
        }

        if (!popwindowcloseNode)  //find first to prevent double add
            popwindowcloseNode = document.getElementById(PemPopWindowCloseNodeId);

        if (!popwindowcloseNode)
        {
            popwindowcloseNode = document.createElement('div');
            popwindowcloseNode.id = PemPopWindowCloseNodeId;
            popwindowcloseNode.className = 'pop-window-close pif-cancel';
            popwindowheaderNode.appendChild(popwindowcloseNode);

        }
        popwindowcloseNode.addEventListener('click', (ev)=> {
            if (debug) console.log('popwindowcloseNode clicked');

            if (popWindowNode)
            {
                popWindowNode.classList.remove('show');
            }
        });

        if (!popwindowtitleNode)  //find first to prevent double add
            popwindowtitleNode = document.getElementById(PemPopWindowTitleNodeId);

        if (!popwindowtitleNode)
        {
            popwindowtitleNode = document.createElement('h2');
            popwindowtitleNode.id = PemPopWindowTitleNodeId;
            popwindowtitleNode.className = 'pop-window-title';
            popwindowheaderNode.appendChild(popwindowtitleNode);
        }

        if (!popwindowcontentNode)  //find first to prevent double add
            popwindowcontentNode = document.getElementById(PemPopWindowContentNodeId);

        if (!popwindowcontentNode)
        {
            popwindowcontentNode = document.createElement('div');
            popwindowcontentNode.id = PemPopWindowContentNodeId;
            popwindowcontentNode.className = 'pop-window-content';
            popwindowcontentNode.style.height = '90%';  //or scroll won't appear
            popwindowviewNode.appendChild(popwindowcontentNode);
        }

        if (!featureBtnHolderNode)  //find first to prevent double add
            featureBtnHolderNode = document.getElementById(PemFeatureBtnHolderNodeId);

        if (!featureBtnHolderNode) 
        {
            featureBtnHolderNode = document.createElement('div');
            featureBtnHolderNode.id = PemFeatureBtnHolderNodeId;
            featureBtnHolderNode.style.width = 'auto';
            featureBtnHolderNode.style.height = 'auto';
            popwindowcontentNode.appendChild(featureBtnHolderNode);
        }

        if (!popwindowtab0Node)  //find first to prevent double add
            popwindowtab0Node = document.getElementById(PemTab0NodeId);

        if (!popwindowtab0Node)
        {
            popwindowtab0Node = document.createElement('div');
            popwindowtab0Node.id = PemTab0NodeId;
            popwindowcontentNode.appendChild(popwindowtab0Node);
        }

        if (!reqaccesstokenNode)  //find first to prevent double add
            reqaccesstokenNode = document.getElementById(PemReqaccessBtnNodeId);

        if (!reqaccesstokenNode)
        {
            reqaccesstokenNode = document.createElement('button');
            reqaccesstokenNode.id = PemReqaccessBtnNodeId;
            reqaccesstokenNode.className = 'pem-btn';
            featureBtnHolderNode.appendChild(reqaccesstokenNode);
        }

        reqaccesstokenNode.addEventListener('mouseover', (ev) => {
            if (debug) console.log('reqaccesstokenNode mouseover');
            popwindowtitleNode.textContent = PemStringGrantDesc;
        });
        reqaccesstokenNode.addEventListener('mouseout', (ev) => {
            if (debug) console.log('reqaccesstokenNode mouseout');
            popwindowtitleNode.textContent = '';
        });
        reqaccesstokenNode.addEventListener('click', (ev) => {
            if (debug) console.log('reqaccesstokenNode clicked');
            window.localStorage.setItem(PemOauthTempTokenId, '');
            window.localStorage.setItem(PemOauthTempTokenSecretId, '');


            let oauth_perm_token = window.localStorage.getItem(PemOauthPermTokenId);
            let oauth_perm_token_secret = window.localStorage.getItem(PemOauthPermTokenSecretId);
            if (oauth_perm_token && oauth_perm_token_secret)
            {
                if (confirm(PemStringReGrant))
                {
                    window.localStorage.setItem(PemOauthPermTokenId, '');
                    window.localStorage.setItem(PemOauthPermTokenSecretId, '');

                    refreshGrant();
                }
                else
                {
                    return;
                }
            }
            else
            {
                window.localStorage.setItem(PemOauthPermTokenId, '');
                window.localStorage.setItem(PemOauthPermTokenSecretId, '');
                refreshGrant();
            }


            let fRes = fetch(makeOauthReqUrl(reqTokenUrl, oAuthKey, oAuthSecret, redirectUrl));

            fRes.then((res) => {   //why fetch api will send promise to then()!?
                res.text().then((text) => {
                    if (debug) console.log('fetch res=', text);
                    let mapRes = getUrlParams(text);
                    if (debug) console.log('oauthreq mapRes=', mapRes);

                    let oauth_temp_token = mapRes.get('oauth_token');
                    let oauth_temp_token_secret = mapRes.get('oauth_token_secret');

                    if (oauth_temp_token && oauth_temp_token_secret)
                    {
                        window.localStorage.setItem(PemOauthTempTokenId, oauth_temp_token);
                        window.localStorage.setItem(PemOauthTempTokenSecretId, oauth_temp_token_secret);

                        let uid = window.localStorage.getItem(PemBrowserUniqueId);

                        if (debug) console.log('uid from localStorage=', uid);

                        if (!uid)
                        {
                            uid = genHexString(6);
                            window.localStorage.setItem(PemBrowserUniqueId, uid);

                            if (debug) console.log('uid generated=', uid);
                        }


                        let model = window.navigator.userAgent;

                        if (model.indexOf("Firefox") >= 0)
                            model = "Firefox";
                        else if (model.indexOf("Chrome") >= 0)
                            model = "Chrome";
                        else
                            model = "";


                        let paramsMap = new Map();
                        paramsMap.set('oauth_token', oauth_temp_token);

                        if (model)
                        {
                            paramsMap.set('deviceid', uid);
                            paramsMap.set('model', model);
                        }

                        let url = addUrlParamsMap(authUrl, paramsMap);
                        location.assign(url);
                    }
                    else
                    {
                        window.localStorage.setItem(PemOauthTempTokenId, '');
                        window.localStorage.setItem(PemOauthTempTokenSecretId, '');
                        alert(appname + ': ' + '授權失敗');
                    }

                }).catch((e) => {
                    if (debug) console.log('res.text() error=', e);
                });

            }).catch((e) => {
                if (debug) console.log('fetch error=', e);
            });

        });

        if (!refreshServerIconsNode)  //find first to prevent double add
            refreshServerIconsNode = document.getElementById(PemRefreshServerIconsBtnNodeId);

        if (!refreshServerIconsNode)
        {
            refreshServerIconsNode = document.createElement('button');
            refreshServerIconsNode.id = PemRefreshServerIconsBtnNodeId;
            refreshServerIconsNode.className = 'pem-btn';
            refreshServerIconsNode.textContent = PemStringBtnGetOnlineEmotIcon;
            featureBtnHolderNode.appendChild(refreshServerIconsNode);
        }

        refreshServerIconsNode.addEventListener('click', (ev) => {
            if (debug) console.log('refreshServerIconsNode clicked');

            refreshServerEmoticon();
        });

        if (!loadBackupFileHiddenNode)  //find first to prevent double add
            loadBackupFileHiddenNode = document.getElementById(PemLoadBackupFileHiddenNodeId);

        if (!loadBackupFileHiddenNode)
        {
            loadBackupFileHiddenNode = document.createElement('input');
            loadBackupFileHiddenNode.id = PemLoadBackupFileHiddenNodeId;
            loadBackupFileHiddenNode.type = 'file';
            loadBackupFileHiddenNode.setAttribute('accept','.txt,.json,text/json');  //'accept' attribute is not supported with node.attribute style.
            loadBackupFileHiddenNode.style.display = 'none';
            loadBackupFileHiddenNode.addEventListener('change', handleLoadEmotIconBackupFile, false);
            featureBtnHolderNode.appendChild(loadBackupFileHiddenNode);
        }

        if (!loadBackupFileNode)  //find first to prevent double add
            loadBackupFileNode = document.getElementById(PemLoadBackupFileNodeId);

        if (!loadBackupFileNode)
        {
            loadBackupFileNode = document.createElement('button');
            loadBackupFileNode.id = PemLoadBackupFileNodeId;
            loadBackupFileNode.className = 'pem-btn';
            loadBackupFileNode.textContent = PemStringBtnLoadBakEmotIcon;
            featureBtnHolderNode.appendChild(loadBackupFileNode);
        }
        loadBackupFileNode.addEventListener('click', (ev) => {
            if (debug) console.log('loadBackupFileNode clicked');
            if (loadBackupFileHiddenNode) {
                loadBackupFileHiddenNode.click();
            }
        });

        if (!saveBackupFileNode)  //find first to prevent double add
            saveBackupFileNode = document.getElementById(PemSaveBackupFileNodeId);

        if (!saveBackupFileNode)
        {
            saveBackupFileNode = document.createElement('button');
            saveBackupFileNode.id = PemSaveBackupFileNodeId;
            saveBackupFileNode.type = "submit";
            saveBackupFileNode.className = 'pem-btn';
            saveBackupFileNode.textContent = PemStringBtnSaveBakEmotIcon;
            saveBackupFileNode.addEventListener('click', handleSaveEmoticonBackupFile);
            featureBtnHolderNode.appendChild(saveBackupFileNode);
        }

        if (!clearBackupEmoticonsNode)  //find first to prevent double add
            clearBackupEmoticonsNode = document.getElementById(PemClearBackupEmoticonsNodeId);

        if (!clearBackupEmoticonsNode)
        {
            clearBackupEmoticonsNode = document.createElement('button');
            clearBackupEmoticonsNode.id = PemClearBackupEmoticonsNodeId;
            clearBackupEmoticonsNode.className = 'pem-btn';
            clearBackupEmoticonsNode.textContent = PemStringBtnClearBakEmotIcon;
            clearBackupEmoticonsNode.addEventListener('click', handleClearBackupEmoticonList);
            featureBtnHolderNode.appendChild(clearBackupEmoticonsNode);
        }

        if (!scanEmoticonsNode)  //find first to prevent double add
            scanEmoticonsNode = document.getElementById(PemScanEmoticonsNodeId);

        if (!scanEmoticonsNode)
        {
            scanEmoticonsNode = document.createElement('button');
            scanEmoticonsNode.id = PemScanEmoticonsNodeId;
            scanEmoticonsNode.className = 'pem-btn';
            featureBtnHolderNode.appendChild(scanEmoticonsNode);
        }

        scanEmoticonsNode.textContent = PemStringBtnScanEmotIcon;
        scanEmoticonsNode.addEventListener('mouseover', (ev) => {
            if (debug) console.log('scanEmoticonsNode mouseover');
            popwindowtitleNode.textContent = PemStringScanEmoticonDesc;
        });
        scanEmoticonsNode.addEventListener('mouseout', (ev) => {
            if (debug) console.log('scanEmoticonsNode mouseout');
            popwindowtitleNode.textContent = '';
        });
        scanEmoticonsNode.addEventListener('click', handleScanEmoticonFile);

        if (!trdLicAgreeNode)  //find first to prevent double add
            trdLicAgreeNode = document.getElementById(PemTrdLicAgreeNodeId);

        if (!trdLicAgreeNode)
        {
            trdLicAgreeNode = document.createElement('button');
            trdLicAgreeNode.id = PemTrdLicAgreeNodeId;
            trdLicAgreeNode.className = 'pem-btn';
            trdLicAgreeNode.textContent = '3rd party license agreement';
        }

        if (!popwindowtab1Node)  //find first to prevent double add
            popwindowtab1Node = document.getElementById(PemTab1NodeId);

        if (!popwindowtab1Node)
        {
            popwindowtab1Node = document.createElement('div');
            popwindowtab1Node.id = PemTab1NodeId;
            popwindowtab1Node.style.whiteSpace = 'pre-wrap';
            popwindowtab1Node.style.display = 'none';
            popwindowtab1Node.style.marginTop = '0.5em';
            popwindowtab1Node.textContent = trdLicText;
            popwindowcontentNode.appendChild(popwindowtab1Node);
        }

        trdLicAgreeNode.addEventListener('click', (ev) => {


            let trdDisplay = popwindowtab1Node.style.display;

            if (trdDisplay === 'block')
            {
                popwindowtab0Node.style.display = 'block';
                popwindowtab1Node.style.display = 'none';
            }
            else
            {
                popwindowtab0Node.style.display = 'none';
                popwindowtab1Node.style.display = 'block';
            }
        });
        featureBtnHolderNode.appendChild(trdLicAgreeNode);
        //------------------------------------------------


        //--------prepare icon list section

        if (!emotIconsTitleNode)  //find first to prevent double add
            emotIconsTitleNode = document.getElementById(PemEmotIconsTitleId);

        if (!emotIconsTitleNode)
        {
            emotIconsTitleNode = document.createElement('div');
            emotIconsTitleNode.id = PemEmotIconsTitleId;
            emotIconsTitleNode.style.marginTop = '1em';
            emotIconsTitleNode.textContent = '線上表符';
            popwindowtab0Node.appendChild(emotIconsTitleNode);

        }

        if (!emotIconsHolderNode)  //find first to prevent double add
            emotIconsHolderNode = document.getElementById(PemEmotIconsHolderId);

        if (!emotIconsHolderNode)
        {
            emotIconsHolderNode = document.createElement('div');
            emotIconsTitleNode.id = PemEmotIconsHolderId;
            emotIconsHolderNode.className = 'pem-emoticons-holder';
            emotIconsHolderNode.style.width = '100%';
            emotIconsHolderNode.style.height = '25vh';
            popwindowtab0Node.appendChild(emotIconsHolderNode);


        }

        if (!emotIconsUlNode)  //find first to prevent double add
            emotIconsUlNode = document.getElementById(PemEmotIconsUlId);

        if (!emotIconsUlNode)
        {
            emotIconsUlNode = document.createElement('ul');
            emotIconsUlNode.id = PemEmotIconsUlId;
            emotIconsHolderNode.appendChild(emotIconsUlNode);
        }

        if (!backupEmotIconsTitleNode)  //find first to prevent double add
            backupEmotIconsTitleNode = document.getElementById(PemBackupEmotIconsTitleId);

        if (!backupEmotIconsTitleNode)
        {
            backupEmotIconsTitleNode = document.createElement('div');
            backupEmotIconsTitleNode.id = PemBackupEmotIconsTitleId;
            backupEmotIconsTitleNode.textContent = '備份表符';
            popwindowtab0Node.appendChild(backupEmotIconsTitleNode);
        }


        if (!backupEmotIconsHolderNode)  //find first to prevent double add
            backupEmotIconsHolderNode = document.getElementById(PemBackupEmotIconsHolderId);

        if (!backupEmotIconsHolderNode)
        {
            backupEmotIconsHolderNode = document.createElement('div');
            backupEmotIconsHolderNode.id = PemBackupEmotIconsHolderId;
            backupEmotIconsHolderNode.className = 'pem-emoticons-holder';
            backupEmotIconsHolderNode.style.width = '100%';
            backupEmotIconsHolderNode.style.height = '25vh';
            popwindowtab0Node.appendChild(backupEmotIconsHolderNode);
        }

        if (!backupEmotIconsUlNode)  //find first to prevent double add
            backupEmotIconsUlNode = document.getElementById(PemBackupEmotIconsUlId);

        if (!backupEmotIconsUlNode)
        {
            backupEmotIconsUlNode = document.createElement('ul');
            backupEmotIconsUlNode.id = PemBackupEmotIconsUlId;
            backupEmotIconsHolderNode.appendChild(backupEmotIconsUlNode);
        }


        //------process get access token
        if (oauthTokenFromUrl && (oauthTokenFromUrl === oauth_temp_token) && oauth_temp_token_secret && oauthVerifier)
        {
            {
                let fRes = fetch(makeOauthAccUrl(accTokenUrl, oAuthKey, oAuthSecret, oauth_temp_token, oauth_temp_token_secret, oauthVerifier));

                fRes.then((res) => {   //why fetch api will send promise to then()!?
                    res.text().then((text) => {
                        if (debug) console.log('fetch res=', text);
                        let mapRes = getUrlParams(text);
                        if (debug) console.log('oauthacc mapRes=', mapRes);

                        let oauth_token = mapRes.get('oauth_token');
                        let oauth_token_secret = mapRes.get('oauth_token_secret');

                        if (oauth_token && oauth_token_secret)
                        {
                            window.localStorage.setItem(PemOauthPermTokenId, oauth_token);
                            window.localStorage.setItem(PemOauthPermTokenSecretId, oauth_token_secret);

                            refreshGrant();

                            alert(appname + ': ' + PemStringGranted);
                        }
                        else
                        {
                            alert(appname + ': ' + PemStringGrantFailed);
                        }

                        window.localStorage.setItem(PemOauthTempTokenId, '');
                        window.localStorage.setItem(PemOauthTempTokenSecretId, '');

                    }).catch((e) => {
                        if (debug) console.log('res.text() error=', e);
                    });

                }).catch((e) => {
                    if (debug) console.log('fetch error=', e);
                });
            }


        }
        else
        {
            if (debug) console.log('oauth_temp_token or oauth_temp_token_secret or oauthVerifier not found.');
        }
        //------process get access token


        let parsed = JSON.parse(window.localStorage.getItem(PemBackupEmotIconListId));

        if (Array.isArray(parsed))
        {
            backupEmotIconsArray = [];
            parsed.map((elem) => backupEmotIconsArray.push(elem));
        }


        handleRefreshBackupEmoticon();

        refreshGrant();

    }

    function refreshServerEmoticon()
    {
        let oauth_perm_token = window.localStorage.getItem(PemOauthPermTokenId);
        let oauth_perm_token_secret = window.localStorage.getItem(PemOauthPermTokenSecretId);

        if (!oauth_perm_token)
        {
            alert(PemStringGrantDesc);
            return;
        }


        let params = new Map();
        params.set('custom_only', true);
        params.set('non_custom_only', false);

        let fRes = fetch(makeApiUrl(getEmoticonsUrl, oAuthKey, oAuthSecret, oauth_perm_token, oauth_perm_token_secret, params));

        fRes.then((res) => {   //why fetch api will send promise to then()!?

            res.json().then((json) => {
                if (debug) console.log('fetch res=', json);

                if (json.error_text && (json.error_text.indexOf('40106') >= 0) )
                {
                    window.localStorage.setItem(PemOauthPermTokenId, '');
                    window.localStorage.setItem(PemOauthPermTokenSecretId, '');
                    refreshGrant();
                    alert(PemStringExpiredReGrant);
                }
                else
                {
                    refreshEmoticonList(json.custom);
                }



            }).catch((e) => {
                if (debug) console.log('res.text() error=', e);

                alert('資料錯誤，請重試');
            });

        }).catch((e) => {
            if (debug) console.log('fetch error=', e);
        });

    }

    function refreshGrant()
    {
        let oauth_perm_token = window.localStorage.getItem(PemOauthPermTokenId);

        if (oauth_perm_token)
        {
            if (reqaccesstokenNode)
                reqaccesstokenNode.textContent = PemStringBtnRegrantAccess;


            if (refreshServerIconsNode)
                refreshServerIconsNode.disabled = false;
        }
        else
        {
            if (reqaccesstokenNode)
                reqaccesstokenNode.textContent = PemStringBtnGrantAccess;

            if (refreshServerIconsNode)
                refreshServerIconsNode.disabled = true;
        }
    }

    function refreshEmoticonList(aData)
    {
        if (Array.isArray(aData))
        {
            let count = 0;
            let arrayLength = aData.length > backupEmotIconsImgNodeArray.length ? aData.length : backupEmotIconsImgNodeArray.length;

            for (let i = 0; i < arrayLength; i++)
            {
                let emotIconsImgNode = emotIconsImgNodeArray[i];
                let emotIconsLiNode;
                if (!emotIconsImgNode)
                {
                    emotIconsLiNode = document.createElement('li');
                    emotIconsLiNode.id = PemLiIndexPrefix + i;
                    emotIconsLiNode.addEventListener('click', handleEmoticonDelete);
                    emotIconsUlNode.appendChild(emotIconsLiNode);
                    emotIconsLiNodeArray.push(emotIconsLiNode);

                    emotIconsImgNode = document.createElement('img');
                    emotIconsImgNode.id = PemLiImgIndexPrefix + i;
                    emotIconsImgNode.className = 'emoticon_my';
                    emotIconsImgNode.setAttribute(PemEmoticonLiIndexKey, i);

                    emotIconsLiNode.appendChild(emotIconsImgNode);
                    emotIconsImgNodeArray.push(emotIconsImgNode);
                }
                else
                {
                    emotIconsLiNode = emotIconsLiNodeArray[i];
                }

                if (Array.isArray(aData[i]))
                {
                    emotIconsLiNode.style.display = 'inline-block';
                    emotIconsLiNode.setAttribute('emo-keyword', aData[i][0]);
                    emotIconsImgNode.src = aData[i][1];

                    count++;
                }
                else
                {
                    emotIconsLiNode.style.display = 'none';
                    emotIconsLiNode.setAttribute('emo-keyword', '');
                    emotIconsImgNode.src = '';
                }
            }
            emotIconsTitleNode.textContent = '線上表符' + (count > 0 ? ': ' + count + ' 個' : '');

        }
    }


    function handleLoadEmotIconBackupFile(ev) {
        // the example access file via  document.getElementById(),
        // access via this.files is also good.
        // if you access with incoming event, filelist array is in 'ev.target'...
        if (debug) console.log('ev.target.files=', this.files);
        const fileList = ev.target.files;
        if (fileList.length === 1)  //filelist is not array...
        {
            if (debug) console.log('enter file reader=', this.files);
            const fr = new FileReader();
            fr.onloadend = (file) => {
                if (debug) console.log('backup file load done');
                try {
                    let res = JSON.parse(file.target.result);
                    handleRefreshBackupEmoticonList(res);
                }
                catch (e)
                {
                    if (debug) console.log(e);
                    alert('備份檔案需為json格式');
                }
            };
            fr.readAsText(fileList[0]);

        }
    }

    function handleRefreshBackupEmoticon()
    {

        if (Array.isArray(backupEmotIconsArray))
        {
            let length = backupEmotIconsArray.length;
            let uiIndex = 0;

            if (length < backupEmotIconsImgNodeArray.length)
                length = backupEmotIconsImgNodeArray.length;

            for (let i = 0; i < length; i++)
            {
                let backupEmotIconsImgNode;
                let backupEmotIconsLiNode;
                let keyword = '';
                let url = '';

                if (i < backupEmotIconsArray.length)
                {
                    let data = backupEmotIconsArray[i];
                    if (data.keyword && data.url)
                    {
                        keyword = data.keyword;
                        url = data.url;

                        if (uiIndex < backupEmotIconsImgNodeArray.length)
                        {
                            backupEmotIconsImgNode = backupEmotIconsImgNodeArray[uiIndex];
                            backupEmotIconsLiNode = backupEmotIconsLiNodeArray[uiIndex];
                        }
                        else
                        {
                            backupEmotIconsLiNode = document.createElement('li');
                            backupEmotIconsLiNode.id = PemBakLiIndexPrefix + uiIndex;
                            backupEmotIconsLiNode.addEventListener('click', handleEmoticonAdd);
                            backupEmotIconsUlNode.appendChild(backupEmotIconsLiNode);
                            backupEmotIconsLiNodeArray.push(backupEmotIconsLiNode);

                            backupEmotIconsImgNode = document.createElement('img');
                            backupEmotIconsImgNode.id = PemBakLiImgIndexPrefix + uiIndex;
                            backupEmotIconsImgNode.setAttribute(PemEmoticonBackupLiIndexKey, i);

                            backupEmotIconsLiNode.appendChild(backupEmotIconsImgNode);
                            backupEmotIconsImgNodeArray.push(backupEmotIconsImgNode);
                        }


                        backupEmotIconsLiNode.style.display = 'inline-block';
                        backupEmotIconsLiNode.setAttribute('emo-keyword', keyword);
                        backupEmotIconsImgNode.src = url;

                        uiIndex++;
                    }
                }
            }

            for (let i = uiIndex; i < backupEmotIconsLiNodeArray.length; i++)  //hide not used
            {
                let backupEmotIconsLiNode = backupEmotIconsLiNodeArray[i];
                backupEmotIconsLiNode.style.display = 'none';
                backupEmotIconsLiNode.setAttribute('emo-keyword', '');

                let backupEmotIconsImgNode = backupEmotIconsImgNodeArray[i];
                backupEmotIconsImgNode.src = '';
            }

            backupEmotIconsTitleNode.textContent = '備份表符' + (uiIndex > 0 ? ': ' + uiIndex + ' 個' : '');

            if (saveBackupFileNode)
            {
                saveBackupFileNode.disabled = uiIndex === 0;
            }
        }
        else
        {
            if (saveBackupFileNode)
            {
                saveBackupFileNode.disabled = true;
            }
        }
    }

    /*
     * merge by 1st scan: url and 2nd scan: keyword.
     * if keyword exists and url not same, will add a random key
     */
    function handleRefreshBackupEmoticonList(aData)
    {

        if (Array.isArray(aData))
        {
            for (let i = 0; i < aData.length; i++)
            {
                if (aData[i].keyword && aData[i].url)
                {
                    let iconFound = false;
                    let keywordFound = false;

                    for (let j = 0; j < backupEmotIconsArray.length; j++)
                    {
                        let keyword = backupEmotIconsArray[j].keyword;
                        let url = backupEmotIconsArray[j].url;

                        if (url.indexOf("//") < 0)
                        {
                            url = "//" + url;  //plurk_custom backup file compatibility
                        }

                        if (url.indexOf("//") === 0)
                        {
                            url = "https:" + url;  //plurk_custom backup file compatibility
                        }

                        if (!iconFound)
                            iconFound = aData[i].url === url;

                        if (!keywordFound)
                            keywordFound = aData[i].keyword === keyword;
                    }

                    if (!iconFound)
                    {
                        let keyWord = keywordFound ? 'pem-' + genHexString(6) : aData[i].keyword;
                        backupEmotIconsArray.push({keyword: keyWord, url : aData[i].url});
                    }
                }
            }
        }

        window.localStorage.setItem(PemBackupEmotIconListId, JSON.stringify(backupEmotIconsArray));
        handleRefreshBackupEmoticon();
    }

    function handleClearBackupEmoticonList()
    {
        if (confirm(PemStringConfirmClearBackupIconDesc))
        {
            backupEmotIconsArray = [];
            window.localStorage.setItem(PemBackupEmotIconListId, JSON.stringify(backupEmotIconsArray));
            handleRefreshBackupEmoticon();
        }
    }

    function handleEmoticonDelete(ev)
    {
        if (debug) console.log('ev.target=', ev.target);
        if (debug) console.log('ev.target.src=', ev.target.src);
        if (confirm('要刪除線上表符 [' + ev.target.parentNode.getAttribute('emo-keyword') + '] ?'))
        {
            let oauth_perm_token = window.localStorage.getItem(PemOauthPermTokenId);
            let oauth_perm_token_secret = window.localStorage.getItem(PemOauthPermTokenSecretId);

            let imgUrl = ev.target.src;

            if (imgUrl)
            {
                let params = new Map();
                params.set('url', imgUrl);

                let fRes = fetch(makeApiUrl(delEmoticonsUrl, oAuthKey, oAuthSecret, oauth_perm_token, oauth_perm_token_secret, params));

                fRes.then((res) => {   //why fetch api will send promise to then()!?

                    res.json().then((json) => {
                        if (debug) console.log('fetch res=', json);

                        if (json.error_text)
                        {
                            if (json.error_text.indexOf('40106') >= 0)
                            {
                                window.localStorage.setItem(PemOauthPermTokenId, '');
                                window.localStorage.setItem(PemOauthPermTokenSecretId, '');
                                refreshGrant();
                                alert(PemStringExpiredReGrant);
                            }
                        }
                        else
                            refreshServerEmoticon();
                    });
                });
            }
            else
            {
                alert('找不到此表符');
            }
        }
    }

    function handleEmoticonAdd(ev)
    {
        if (debug) console.log('ev.target=', ev.target);
        if (debug) console.log('ev.target.src=', ev.target.src);

        let keyword = ev.target.parentNode.getAttribute('emo-keyword');
        if (confirm('add icon [' + keyword + '] ?'))
        {
            let oauth_perm_token = window.localStorage.getItem(PemOauthPermTokenId);
            let oauth_perm_token_secret = window.localStorage.getItem(PemOauthPermTokenSecretId);

            let imgUrl = ev.target.src;

            if (imgUrl)
            {
                let params = new Map();
                params.set('url', imgUrl);
                params.set('keyword', keyword);

                let fRes = fetch(makeApiUrl(addEmoticonsUrl, oAuthKey, oAuthSecret, oauth_perm_token, oauth_perm_token_secret, params));

                fRes.then((res) => {   //why fetch api will send promise to then()!?

                    res.json().then((json) => {
                        if (debug) console.log('fetch res=', json);

                        if (json.error_text)
                        {
                            if (json.error_text.indexOf('40106') >= 0)
                            {
                                window.localStorage.setItem(PemOauthPermTokenId, '');
                                window.localStorage.setItem(PemOauthPermTokenSecretId, '');
                                refreshGrant();
                                alert(PemStringExpiredReGrant);
                            }
                            if (json.error_text.indexOf('unknown') >= 0)
                                alert(PemStringEmoticonOverLimit);
                        }
                        else
                        {
                            refreshServerEmoticon();
                        }

                    });
                });
            }
            else
            {
                alert('找不到此表符');
            }
        }
    }

    function handleSaveEmoticonBackupFile(ev) {
        ev.preventDefault();
        let data = JSON.parse(window.localStorage.getItem(PemBackupEmotIconListId));


        if (Array.isArray(data) && data.length > 0)
        {
            if (window.showSaveFilePicker)  //chrome style file save
            {
                let timestamp = Math.floor( Date.now() / 1000 );
                let filePickerOpt = {
                    suggestedName: 'PemBak'+ timestamp +'.json',
                    types: [{
                        description: 'JSON',
                        accept: {
                            'text/json': ['.json'],
                        },
                    }],
                };
                window.showSaveFilePicker(filePickerOpt)
                    .then((newHandle) => newHandle.createWritable())
                    .then((writableStream) => writableStream.write(JSON.stringify(data, null, 2)))
                    .then((writableStream) => writableStream.close())
                    .then((_) => {
                        alert(appname + ': ' + PemStringSaveOK);
                    })
                    .catch((e) => {
                        if (debug) console.log('savefile err=', e);
                        alert('取消儲存檔案');
                    });
            }
            else
            {

                const sending = browser.runtime.sendMessage({
                    action: 'data',
                    data: JSON.stringify(data, null, 2)
                });

                sending.then((res) => {
                    if (debug) console.log('sending res=', res);
                    alert(res);
                }, (e) => {
                    if (debug) console.log('sending err=', e);
                    alert(e);
                });
            }

        }
        else
        {
            alert(appname + ': ' + PemStringNoIconForSave);
        }

    }

    function handleScanEmoticonFile()
    {
        if (scanInterval)
        {
            clearInterval(scanInterval);
            scanInterval = null;
            scanEmoticonsNode.textContent = PemStringBtnScanEmotIcon;
        }
        else
        {
            scanEmoticonsNode.textContent = '蒐集者之眼：啟動中';
            scanInterval = setInterval(()=> {
                if (debug) console.log('interval running');
                let allImgNode = attrsearch(null, 'img', 'class', 'emoticon_my');
                let aCollect = [];
                if (debug) console.log('allImgNode.snapshotLength=', allImgNode.snapshotLength);
                for (let i = 0; i < allImgNode.snapshotLength; i++)
                {
                    let imgNode = allImgNode.snapshotItem(i);
                    //if (debug) console.log('imgNode=', imgNode.src);
                    if (imgNode.src.indexOf('emos.plurk.com') >= 0)
                    {
                        aCollect.push({keyword: 'pem-' + genHexString(6), url : imgNode.src});
                    }
                }
                handleRefreshBackupEmoticonList(aCollect);

            }, 5000);
        }


    }

    function genHexString(len) {
        const hex = '0123456789ABCDEF';
        let output = '';
        for (let i = 0; i < len; ++i) {
            output += hex.charAt(Math.floor(Math.random() * hex.length));
        }
        return output;
    }


    //run init
    setTimeout(init, 2000);

    if (debug) console.log('main.js load done');

})();















