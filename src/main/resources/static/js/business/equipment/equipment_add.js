/** equipment_add **/
'use strict';

/** onload **/
$(function() {
    let pageInfo = getPageInfo();
    let seqNo = pageInfo.seqNo;
    let pathname = pageInfo.pathname;
    let mode = pageInfo.mode;

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
        location.href = '/'+pathname+'/index';
    });

});

/**
 * 공통코드 호출
 */
 var getCommonCode = function () {
    ajaxCall({
        method: 'GET',
        url: '/employee/getCommonCode',
        async : false, 
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
 * @param {number} params.seqNo 일련번호 -> 수정일때만 존재
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
        success: function (equipment) {
            fillValue(equipment);
        }
    });
}
   

