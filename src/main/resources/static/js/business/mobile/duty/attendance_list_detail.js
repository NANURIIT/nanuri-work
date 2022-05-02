/** attendance_list **/
'use strict';

/** onload **/
$(function(){
    let seqNo = new URL(document.location.href).searchParams.get('seqNo');
    
    getDutyHistoryDetail(seqNo)

    $(document).on('click', '.cancel_button', function(){
        location.href = '/mobile/dutyList';
    });
});

const WEEKDAY = ['일', '월', '화', '수', '목', '금', '토'];

/**
 * 근태 상세정보 호출
 * @param {Number} seqNo 일련번호
 */
var getDutyHistoryDetail = function(seqNo){
    ajaxCall({
        method : 'GET', 
        url : '/duty/getDutyHistoryDetail/' + seqNo, 
        success : function(object){
            $('#empNo').val(object.telNo.substring(3, object.telNo.length));
            $('#userNm').val(object.userNm);
            $('#dtyNm').val(object.dtyNm);
            $('#blgNm').val(object.blgNm);
            $('#dtyNm').val(object.dtyNm);
            $('#basDt').val(object.basDt);
            $('#svceFormCdNm').val(object.svceFormCdNm);

            if(isEmpty(object.sbtAftVctnDys) == false){
                if(object.sbtAftVctnDys % 1 === 0){
                    $('#sbtAftVctnDys').val(object.sbtAftVctnDys.substring(0, object.sbtAftVctnDys.length - 3));
                } else {
                    $('#sbtAftVctnDys').val(object.sbtAftVctnDys.substring(0, object.sbtAftVctnDys.length - 1));
                }
            }
            
            $('#stDt').val(object.stDt + '('+WEEKDAY[new Date(object.stDt.substring(0, 10)).getDay()]+')');
            $('#stTm').val(object.stTm.substring(0, object.stTm.length - 3));

            if(isEmpty(object.edDt) == false) {
                $('#edDt').val(object.edDt + '('+WEEKDAY[new Date(object.edDt.substring(0, 10)).getDay()]+')');
            }
            if(isEmpty(object.edTm) == false){
                $('#edTm').val(object.edTm.substring(0, object.edTm.length - 3));
            }   

            $('#rgDtm').val(object.rgDtm.substring(0, 10) + '('+WEEKDAY[new Date(object.rgDtm.substring(0, 10)).getDay()]+') ' + object.rgDtm.substring(11, object.rgDtm.length - 3));
            $('#dczStsCdnm').val(object.dczStsCdnm);

            if(isEmpty(object.dczDtm) == false){
                $('#dczDtm').val(object.dczDtm.substring(0, 10) + '('+WEEKDAY[new Date(object.dczDtm.substring(0, 10)).getDay()]+') ' + object.dczDtm.substring(11, object.dczDtm.length - 3));
            }
            
            if(isEmpty(object.dczmnNm) == false){
                $('#dczmnNm').val(object.dczmnNm);
            }
        }
    })
}