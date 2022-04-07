/** basic_add **/
'use strict';

/** onload **/
$(function(){

    getCommonCode();


    // 취소 버튼 클릭
    $(document).on('click', '.cancel_button', function(){
        location.href = '/employee/index';
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