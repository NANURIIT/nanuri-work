/** basic_add **/
'use strict';

/** onload **/
$(function(){

    getCommonCode();

    // 기본정보 호출
    getBasicInfoDetail();

    // 저장 버튼 클릭
    $(document).on('click', '#save', function(){
        let params = {
            blgDsCd : $('#blgDsCd').val(), 
            blgNm : $('#blgNm').val(), 
            zip : $('#zip').val(), 
            addr : $('#addr').val(), 
            userNm : $('#userNm').val(), 
            dtyNm : $('#dtyNm').val(), 
            telNo : $('#telNo').val(), 
            rrno : $('#rrno').val(), 
            dutNm : $('#dutNm').val(), 
            emailAddr : $('#emailAddr').val()
        }

        registerBasicInfo(params);
    });

    // 취소 버튼 클릭
    $(document).on('click', '.cancel_button', function(){
        location.href = '/mobile/employeeInfo';
    });
});

/**
 * 공통코드 호출
 */
 var getCommonCode = function () {
    ajaxCall({
        method: 'GET',
        url: '/employee/getCommonCode',
        data: { dsCd: 'belong' },
        success: function (object) {
            let COMMON_CODE_HTML = '';
            for (let i = 0; i < object.length; i++) {
                let tmpRow = object[i];
                COMMON_CODE_HTML += '<option value="' + tmpRow.dtlCd + '">' + tmpRow.dtlCnm + '</option>'
            }
            $('#blgDsCd').html(COMMON_CODE_HTML);
        }
    });
}

/**
 * 기본정보 호출
 */
var getBasicInfoDetail = function () {
    ajaxCall({
        method: 'GET',
        url: '/employee/basicInfoDetail',
        success: function (object) {
            $('#blgDsCd').val(object.blgDsCd);
            $('#blgNm').val(object.blgNm);
            $('#zip').val(object.zip);
            $('#addr').val(object.addr);
            $('#userNm').val(object.userNm);
            $('#dtyNm').val(object.dtyNm);
            $('#telNo').val(object.telNo);
            $('#rrno').val(object.rrno);
            $('#dutNm').val(object.dutNm);
            $('#emailAddr').val(object.emailAddr);
        }
    });
}

/**
 * 기본정보 등록
 * @param {*} params 
 */
var registerBasicInfo = function(params){
    console.log(params);
}