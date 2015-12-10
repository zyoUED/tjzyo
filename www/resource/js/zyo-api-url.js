define('zyAPIurl', function () {
    var HTTP_URL="http://api.lkhealth.net/index.php?";
    var HTTP_URL="http://testapi.lkhealth.net/index.php?";
	var zyAPIurl= {
		//资讯详情接口
		news_detail:HTTP_URL+'r=news/newsdetail',
		//症状详情接口
		symptom_detail:HTTP_URL+'r=drug/getsymptomexplanation',
		//药品详情接口
		drug_detail:HTTP_URL+'r=drug/getdrugexplanation',
		//疾病详情接口
		disease_detail:HTTP_URL+'r=drug/getdiseaseexplanation',
		//化验指标详情接口
		assay_detail:HTTP_URL+'r=news/assaydetail',
		//店员详情接口
		shopper_detail:HTTP_URL+'r=employee/employeeInfo',
        //体检工具列表接口 start=0&row=20
        medical_tool:HTTP_URL+'r=drug/medicaltool',
	}
    return zyAPIurl;
});
