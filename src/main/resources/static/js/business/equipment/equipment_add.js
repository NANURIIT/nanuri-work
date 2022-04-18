/** equipment_add **/
'use strict';

/** onload **/
$(function() {
    let seqNo = new URL(document.location.href).searchParams.get('seqNo'); // seqNo세팅
    let uri = new URL(document.location.href).pathname;
    let pathname = uri.split('/')[1];
    let mode = seqNo != null ? 'M' : 'W';                                  // 작성인지 수정인지 모드 설정

    getCommonCode();

    if (mode == 'M') {
        getEquipmentDetail(seqNo);
    }
 
    // 등록 버튼 클릭
    $(document).on('click', '#save', function() {
        let params = {
            eqpmKdCd : $('#eqpmKdCd').val(),
            modlNm : $('#modlNm').val(),
            srlNo : $('#srlNo').val(),
            pyDt : $('#pyDt').val()
        };
        if (mode == 'W') {
            registerEquipment(params, pathname);
        } else if (mode == 'M') {
            params.seqNo = seqNo;
            registerEquipment(params, pathname);
        }
    });    

    // 취소 버튼 클릭
    $(document).on('click', '.cancel_button', function() {
        if(uri.includes('admin') > -1){
            location.href = '/admin/index';
        } else if(uri.includes('mobile') > -1){
            location.href = '/mobile/index';
        }
    });

});

/**
 * 공통코드 호출
 */
 var getCommonCode = function () {
    ajaxCall({
        method: 'GET',
        url: '/employee/getCommonCode',
        data: { dsCd: 'EQUIPMENT' },
        success: function (object) {
            let COMMON_CODE_HTML = '';
            for (let i = 0; i < object.length; i++) {
                let tmpRow = object[i];
                COMMON_CODE_HTML += '<option value="' + tmpRow.dtlCd + '">' + tmpRow.dtlCnm + '</option>'
            }
            $('#eqpmKdCd').html(COMMON_CODE_HTML);
        }
    });
}

/**
 * 장비 정보 등록
 * @param {string} params.modlNm 모델명
 * @param {string} params.srlNo 시리얼번호
 * @param {string} params.pyDt 지급일자
 */
var registerEquipment = function(params, pathname) {
    if(isEmpty(params.modlNm)){
        openPopup({
            title : '실패',
            text : '모델명을 입력해주세요.',
            type : 'error',
            callback: function() {
                $(document).on('click', '.confirm', function()   {
                    $('#modlNm').focus();
                });
            }
        });
    } else if(isEmpty(params.srlNo)) {
        openPopup({
            title : '실패',
            text : '시리얼번호를 입력해주세요.',
            type : 'error',
            callback: function() {
                $(document).on('click', '.confirm', function()   {
                    $('#srlNo').focus();
                });
            }
        });
    } else if(isEmpty(params.pyDt)) {
        openPopup({
            title : '실패',
            text : '지급일자를 입력해주세요.',
            type : 'error',
            callback: function() {
                $(document).on('click', '.confirm', function()   {
                    $('#pyDt').focus();
                });
            }
        });
    } else {
        ajaxCall({
            method : 'POST',
            url :'/equipment/registeEquipment',
            data : params,
            success : openPopup({
                title : '성공',
                text : '장비 등록에 성공했습니다.',
                type : 'success',
                callback : function() {
                    location.href = '/'+pathname+'/index';
                }        
            })
        });
    }
}

/**
 * 장비 정보 상세 조회
 * @param {number} seqNo 일련번호
 */ 
var getEquipmentDetail = function(seqNo) {
    ajaxCall({
        method: 'GET',
        url: '/equipment/equipmentDetail/' + seqNo,
        success: function (object) {
            $('#eqType').val(object.eqType);
            $('#modlNm').val(object.modlNm);
            $('#srlNo').val(object.srlNo);
            $('#pyDt').val(object.pyDt);
        }
    });
}
   

