/** payslip **/
'use strict';

/** onload **/
$(function(){
    
    getPayslipList(1);

    // 검색 버튼 클릭
    $(document).on('click', '#payslipSearch', function() {
        param.startSearchDate = $(startDate).val();
        param.endSearchDate = $(endDate).val();

        getPayslipList(1);
    })

    // 날짜 클릭시 명세서 팝업
    $(document).on('click','.pop_open', function() {
        $(".pop_main").addClass('pop_on');
    });
    $(document).on('click', '.close_btn, .bg-overlay', function() {
        $(".pop_main").removeClass('pop_on');
    });
});

let param = {
    thisPageNo : 1,
    functionNm : 'getPayslipList',
    htmlNm: 'list_pagination',
    pageDivNo: 10,
    pageViewNo: 10
};

/**
 * 급여 명세서 리스트 출력
 */
var getPayslipList = function(pageNo) {
    param.thisPageNo = pageNo;
    ajaxCall({
        method : 'GET',
        url : '/payslip/getPayslipList',
        data : param,
        success : function(object) {
            let PAYSLIP_LIST_HTML = '';
            if(!isEmpty(object)){
                let payslipList = object.payslipList;
                param.totalDataNum = object.payslipTotalCount;
                console.log(object);
                for(let i = 0; i < payslipList.length; i++) {
                    let tmpRow = payslipList[i];
                    console.log(tmpRow.bscAm);
                    console.log(commaStr(tmpRow.bscAm))
                    PAYSLIP_LIST_HTML += '<tr>';
                    PAYSLIP_LIST_HTML += ' <td>'+tmpRow.userId.substring(3, tmpRow.userId.length)+'</td>';
                    PAYSLIP_LIST_HTML += ' <td>'+tmpRow.userNm+'</td>';
                    PAYSLIP_LIST_HTML += ' <td>'+tmpRow.dtyNm+'</td>';
                    PAYSLIP_LIST_HTML += ' <td>'+tmpRow.blgNm+'</td>';
                    PAYSLIP_LIST_HTML += ' <td>';
                    PAYSLIP_LIST_HTML += '<a class="pop_open">' + tmpRow.slydt + '</a>';  
                    PAYSLIP_LIST_HTML += '</td>';   
                    PAYSLIP_LIST_HTML += ' <td>'+tmpRow.slryKdnm+'</td>';
                    PAYSLIP_LIST_HTML += ' <td>'+commaStr(Number(tmpRow.bscAm))+'</td>';
                    PAYSLIP_LIST_HTML += ' <td>'+tmpRow.pydt+'</td>';
                    PAYSLIP_LIST_HTML += '</tr>'

                    $('#payslipList').html(PAYSLIP_LIST_HTML);    
                    setPage(param);
    
                } 
   
            } else {
                PAYSLIP_LIST_HTML += '<tr>'
                PAYSLIP_LIST_HTML += ' <td colspan="12">조회된 정보가 없습니다.</td>';
                PAYSLIP_LIST_HTML += '</tr>'
                $('#payslipList').html(PAYSLIP_LIST_HTML);
                $('#list_pagination').empty();
            }
        }
    })
}
