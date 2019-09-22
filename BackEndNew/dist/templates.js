angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/CareerForm/templates/CareerForm.html',
    '\n' +
    '<div> \n' +
    '    <div ng-if="CareerFormList.results.length == 0">\n' +
    '        <span>{{\'NoCareerFormsAvailable\' | translate}}</span>\n' +
    '    </div>\n' +
    '    <div class="pmd-card pmd-z-depth pmd-card-custom-view" ng-if="CareerFormList.results.length > 0">\n' +
    '        <div class="table-responsive"></div>\n' +
    '        <table class="table pmd-table table-hover">\n' +
    '            <thead>\n' +
    '                <tr>\n' +
    '                        <th>{{\'userName\' | translate}}</th> \n' +
    '                        <th>{{\'EmailLbl\' | translate}}</th> \n' +
    '                        <th>{{\'Phone1Lbl\' | translate}}</th>  \n' +
    '                        <th>{{\'Career\' | translate}}</th>  \n' +
    '                        <th>{{\'Date\' | translate}}</th>  \n' +
    '                    <th>Message</th>\n' +
    '                    <th>download</th>\n' +
    '                    <th>Status</th>\n' +
    '                </tr>\n' +
    '            </thead>\n' +
    '            <tbody>\n' +
    '                <tr ng-repeat="CareerForm in CareerFormList.results">\n' +
    '                    <td data-title="name">{{CareerForm.fullName}}</td>\n' +
    '                    <td data-title="email">{{CareerForm.email}}</td>\n' +
    '                     \n' +
    '                    <td data-title="phoneNo">{{CareerForm.phoneNo}}</td>\n' +
    '                   \n' +
    '                    <td data-title="career">{{CareerForm.career.title}}</td>\n' +
    '                    <td data-title="date">{{CareerForm.creationTime || Date}}</td>\n' +
    '                    <td data-title="message"> <button ng-click="toggleModal(CareerForm)" class="btn btn-default">Message</button></td>\n' +
    '                    <td >\n' +
    '                        <a class="btn btn-primary editable-table-button btn-xs btn-with-icon" style="width: 94px;" \n' +
    '                        target="_top" href="{{FrontServer}}/Images/{{CareerForm.file}}" download="{{CareerForm.File}}">\n' +
    '                        <i class="fa fa-cloud-download" aria-hidden="true"></i> Download CV</a>\n' +
    '                        \n' +
    '                        <!-- <i class="material-icons md-dark pmd-md cursorPointer font25" ng-click="$state.go(\'editCareerForm\',{CareerFormId: CareerForm.CareerFormId});">Download CV</i> -->\n' +
    '                    </td>\n' +
    '                    <td data-title="name"><div class="buttons" ng-show="!CareerForm.Seen">\n' +
    '                            <button class="center-block btn btn-default  restore-button btn-xs btn-with-icon"\n' +
    '                             ng-click="Seen(CareerForm)"><i class="fa fa-undo" aria-hidden="true"></i> Seen</button>\n' +
    '                        </div>\n' +
    '                        <div class="buttons" ng-show="CareerForm.Seen">\n' +
    '                            {{CareerForm.SeenBy}}\n' +
    '                        </div>\n' +
    '                    </td>   </tr>\n' +
    '                 \n' +
    '            </tbody>\n' +
    '        </table>\n' +
    '    </div>\n' +
    '    <div style="text-align:center;direction: ltr" paging page="1" page-size="10" total="totalCount" paging-action="changePage(page)"\n' +
    '         flex="nogrow" show-prev-next="true" show-first-last="true" hide-if-empty="true" disabled-class="hide">\n' +
    '    </div>\n' +
    '</div>\n' +
    '<modal title="Display message" visible="showModal">\n' +
    ' \n' +
    '  {{showmessage}} \n' +
    '    \n' +
    '  </modal>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/CareerForm/templates/edit.html',
    '<div class="modal-content">\n' +
    '	<div class="modal-header bordered">\n' +
    '		<h2 class="pmd-card-title-text">{{\'CareerForm\' | translate}}</h2>  \n' +
    '	</div>\n' +
    '	<div class="modal-body">\n' +
    '		<form class="form-horizontal" name="editTypeForm"> \n' +
    '           <div> \n' +
    '                <div class="form-group pmd-textfield pmd-textfield-floating-label-compeleted">\n' +
    '                    <label for="first-name"> {{  \'Name\' | translate}} </label>\n' +
    '                    <input required CareerForm="text" class="mat-input form-control" name="title" ng-model="editCareerFormCtrl.CareerForm.title" ng-minlength="3" ng-maxlength="255">\n' +
    '                    <div ng-messages="newCareerFormForm.title.$error" >\n' +
    '                        \n' +
    '                        <div ng-show="newCareerFormForm.title.$error.required && !newCareerFormForm.title.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '                        <div ng-show="(newCareerFormForm.title.$error.minlength || newCareerFormForm.title.$error.maxlength) && !newCareerFormForm.title.$error.required">{{\'NameLengthError255\' | translate}}</div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div> \n' +
    '            <div> \n' +
    '                <div class="form-group pmd-textfield pmd-textfield-floating-label-compeleted">\n' +
    '                    <label for="first-name"> {{\' Description\' | translate}} </label>\n' +
    '                    <textarea required CareerForm="text" class="mat-input form-control" name="description" \n' +
    '                    ng-model="editCareerFormCtrl.CareerForm.description" ng-minlength="3" ng-maxlength="255"></textarea>\n' +
    '                    <div ng-messages="newCareerFormForm.description.$error" >\n' +
    '                        \n' +
    '                        <div ng-show="newCareerFormForm.description.$error.required && !newCareerFormForm.description.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '                        <div ng-show="(newCareerFormForm.description.$error.minlength || newCareerFormForm.description.$error.maxlength) && !newCareerFormForm.description.$error.required">{{\'NameLengthError255\' | translate}}</div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div> \n' +
    '		</form>\n' +
    '	</div>\n' +
    '	<div class="pmd-modal-action text-right">\n' +
    '		<button ng-disabled="editTypeForm.$invalid" class="btn pmd-ripple-effect btn-primary" type="button" ng-click="editCareerFormCtrl.UpdateCareerForm()">{{\'saveChangesBtn\' | translate}}</button>\n' +
    '		<button class="btn pmd-ripple-effect btn-default" type="button" ng-click="editCareerFormCtrl.Close()">{{\'DiscardBtn\' | translate}}</button>\n' +
    '	</div>\n' +
    '</div>\n' +
    '\n' +
    '	\n' +
    '');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/CareerForm/templates/new.html',
    '<div class="modal-content">\n' +
    '    <div class="modal-header bordered">\n' +
    '        <h2 class="pmd-card-title-text">{{\'NewCareerForm\' | translate}}</h2>\n' +
    '    </div>\n' +
    '    <div class="modal-body">\n' +
    '        <form class="form-horizontal" name="newCareerFormForm"> \n' +
    '            <div> \n' +
    '                <div class="form-group pmd-textfield pmd-textfield-floating-label">\n' +
    '                    <label for="first-name"> {{  \'Name\' | translate}} </label>\n' +
    '                    <input required CareerForm="text" class="mat-input form-control" name="title" ng-model="newCareerFormCtrl.title" ng-minlength="3" ng-maxlength="255">\n' +
    '                    <div ng-messages="newCareerFormForm.title.$error" >\n' +
    '                        \n' +
    '                        <div ng-show="newCareerFormForm.title.$error.required && !newCareerFormForm.title.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '                        <div ng-show="(newCareerFormForm.title.$error.minlength || newCareerFormForm.title.$error.maxlength) && !newCareerFormForm.title.$error.required">{{\'NameLengthError255\' | translate}}</div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div> \n' +
    '            <div> \n' +
    '                <div class="form-group pmd-textfield pmd-textfield-floating-label">\n' +
    '                    <label for="first-name"> {{\' Description\' | translate}} </label>\n' +
    '                    <textarea required CareerForm="text" class="mat-input form-control" name="description" \n' +
    '                    ng-model="newCareerFormCtrl.description" ng-minlength="3" ng-maxlength="255"></textarea>\n' +
    '                    <div ng-messages="newCareerFormForm.description.$error" >\n' +
    '                        \n' +
    '                        <div ng-show="newCareerFormForm.description.$error.required && !newCareerFormForm.description.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '                        <div ng-show="(newCareerFormForm.description.$error.minlength || newCareerFormForm.description.$error.maxlength) && !newCareerFormForm.description.$error.required">{{\'NameLengthError255\' | translate}}</div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div> \n' +
    '        </form>\n' +
    '    </div>\n' +
    '    <div class="pmd-modal-action text-right">\n' +
    '        <button ng-disabled="newCareerFormForm.$invalid" class="btn pmd-ripple-effect btn-primary" CareerForm="button" ng-click="newCareerFormCtrl.AddNewCareerForm()">{{\'saveChangesBtn\' | translate}}</button>\n' +
    '        <button class="btn pmd-ripple-effect btn-default" CareerForm="button" ng-click="$state.go(\'CareerForm\');">{{\'DiscardBtn\' | translate}}</button>\n' +
    '    </div>\n' +
    '</div>\n' +
    '');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/About/templates/About.html',
    '\n' +
    '<div> \n' +
    '    <div ng-if="AboutList.length == 0">\n' +
    '        <span>{{\'NoAboutsAvailable\' | translate}}</span>\n' +
    '    </div>\n' +
    '    <div class="pmd-card pmd-z-depth pmd-card-custom-view" ng-if="AboutList.length > 0">\n' +
    '        <div class="table-responsive"></div>\n' +
    '        <table class="table pmd-table table-hover">\n' +
    '            <thead>\n' +
    '                <tr>\n' +
    '                    <th>{{\'Description\' | translate}}</th>  \n' +
    '                    <th></th>\n' +
    '                </tr>\n' +
    '            </thead>\n' +
    '            <tbody>\n' +
    '                <tr ng-repeat="About in AboutList">\n' +
    '                    <td data-title="Name">{{About.descriptionDictionary[selectedLanguage]}}</td>\n' +
    '                  \n' +
    '                    <td width="30%" ng-show="!About.isStatic">\n' +
    '                        <i class="material-icons md-dark pmd-md cursorPointer font25" ng-click="$state.go(\'editAbout\',{aboutId: About.aboutId});">mode_edit</i>\n' +
    '                    </td>\n' +
    '                </tr> \n' +
    '            </tbody>\n' +
    '        </table>\n' +
    '    </div>\n' +
    '    <div style="text-align:center;direction: ltr" paging page="1" page-size="10" total="totalCount" paging-action="changePage(page)"\n' +
    '         flex="nogrow" show-prev-next="true" show-first-last="true" hide-if-empty="true" disabled-class="hide">\n' +
    '    </div>\n' +
    '</div>\n' +
    '');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/About/templates/edit.html',
    '<div class="modal-content">\n' +
    '	<div class="modal-header bordered">\n' +
    '		<h2 class="pmd-card-title-text">{{\'About\' | translate}}</h2>\n' +
    '	</div>\n' +
    '	<div class="modal-body">\n' +
    '		<form class="form-horizontal" name="editAboutForm"> \n' +
    '                <div> \n' +
    '                    <!-- Nav tabs -->\n' +
    '                    <ul class="nav nav-tabs" role="tablist">\n' +
    '                        <li role="presentation" ng-class="{\'active\':$index == 0}" ng-repeat="lang in editAboutCtrl.language">\n' +
    '                            <a href="javascript:void(0);" data-target="#{{lang.value}}-form" aria-controls="home" role="tab" data-toggle="tab">\n' +
    '                                {{lang.value | translate}}\n' +
    '                            </a>\n' +
    '                        </li> \n' +
    '                    </ul>\n' +
    '                    <div class="pmd-card">\n' +
    '                        <div class="pmd-card-body">\n' +
    '                            <!-- Tab panes -->\n' +
    '                            <div class="tab-content">\n' +
    '                                <div role="tablist" class="tab-pane" ng-class="{\'active\':$index == 0}" ng-repeat="lang in editAboutCtrl.language" id="{{lang.value}}-form">\n' +
    '                                    <div class="form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                                        <label for="first-name"> {{ lang.value+\'Description\' | translate}} </label>\n' +
    '                                        <textarea required type="text" class="mat-input form-control" \n' +
    '                                        name="descriptionDictionary{{lang.value+\'Name\'}}"\n' +
    '                                         ng-model="editAboutCtrl.About.descriptionDictionary[lang.key]"\n' +
    '                                          ng-minlength="3" ng-maxlength="255"></textarea>\n' +
    '                                        <div ng-messages="editAboutForm.descriptionDictionary{{lang.value+\'Name\'}}.$error" >\n' +
    '                                            \n' +
    '                                            <div ng-show="editAboutForm.descriptionDictionary{{lang.value+\'Name\'}}.$error.required && !editAboutForm.descriptionDictionary{{lang.value+\'Name\'}}.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '                                            <div ng-show="(editAboutForm.descriptionDictionary{{lang.value+\'Name\'}}.$error.minlength || editAboutForm.descriptionDictionary{{lang.value+\'Name\'}}.$error.maxlength) && !editAboutForm.descriptionDictionary{{lang.value+\'Name\'}}.$error.required">{{\'NameLengthError255\' | translate}}</div>\n' +
    '                                        </div>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </div> \n' +
    '                        </div>\n' +
    '\n' +
    '                   \n' +
    '                    </div>\n' +
    '                </div> \n' +
    '                <!-- <div class="form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                    <label for="first-name">{{\'VideoUrl\' | translate}}</label>\n' +
    '      \n' +
    '                    <input required type="text" class="mat-input form-control" name="videoUrl" ng-model="editAboutCtrl.About.videoUrl" ng-minlength="3" ng-maxlength="50">\n' +
    '                    <div ng-messages="editAboutForm.videoUrl.$error">\n' +
    '                        <div ng-if="editAboutForm.videoUrl.$error.required && !editAboutForm.videoUrl.$pristine">{{\'VideoUrl Is required\' | translate}}</div>\n' +
    '                        <div ng-if="(editAboutForm.videoUrl.$error.minlength || editAboutForm.videoUrl.$error.maxlength) && !editAboutForm.videoUrl.$error.required">{{\'VideoUrl must more that 3 characters\' | translate}}</div>\n' +
    '                    </div>\n' +
    '                </div> -->\n' +
    '		</form>\n' +
    '	</div>\n' +
    '	<div class="pmd-modal-action text-right">\n' +
    '		<button ng-disabled="editAboutForm.$invalid" class="btn pmd-ripple-effect btn-primary" type="button" ng-click="editAboutCtrl.UpdateAbout()">{{\'saveChangesBtn\' | translate}}</button>\n' +
    '		<button class="btn pmd-ripple-effect btn-default" type="button" ng-click="editAboutCtrl.Close()">{{\'DiscardBtn\' | translate}}</button>\n' +
    '	</div>\n' +
    '</div>\n' +
    '\n' +
    '	\n' +
    '');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/Career/templates/Career.html',
    '\n' +
    '<div>\n' +
    '    <div style="margin-bottom:10px">\n' +
    '        <button ng-click="$state.go(\'newCareer\');" class="btn pmd-ripple-effect btn-primary pmd-z-depth" type="button">{{\'AddNew\' | translate}}</button>\n' +
    '\n' +
    '    </div> \n' +
    '    {{CareerList.results}}\n' +
    '    <div ng-if="CareerList.length == 0">\n' +
    '        <span>{{\'NoCareersAvailable\' | translate}}</span>\n' +
    '    </div>\n' +
    '    <div class="pmd-card pmd-z-depth pmd-card-custom-view" ng-if="CareerList.length > 0">\n' +
    '        <div class="table-responsive"></div>\n' +
    '        <table class="table pmd-table table-hover">\n' +
    '            <thead>\n' +
    '                <tr>\n' +
    '                    <th>{{\'Title\' | translate}}</th>\n' +
    '                    <th>{{\'Description\' | translate}}</th> \n' +
    '                    <th></th>\n' +
    '                </tr>\n' +
    '            </thead>\n' +
    '            <tbody>\n' +
    '                <tr ng-repeat="Career in CareerList">\n' +
    '                    <td data-title="title">{{Career.title}}</td>\n' +
    '                    <td data-title="description">{{Career.description}}</td>\n' +
    '                     \n' +
    '                   \n' +
    '                    <td width="30%" >\n' +
    '                        <i class="material-icons md-dark pmd-md cursorPointer font25" ng-click="$state.go(\'editCareer\',{careerId: Career.careerId});">mode_edit</i>\n' +
    '                    </td>\n' +
    '                </tr>\n' +
    '                 \n' +
    '            </tbody>\n' +
    '        </table>\n' +
    '    </div>\n' +
    '    <div style="text-align:center;direction: ltr" paging page="1" page-size="10" total="totalCount" paging-action="changePage(page)"\n' +
    '         flex="nogrow" show-prev-next="true" show-first-last="true" hide-if-empty="true" disabled-class="hide">\n' +
    '    </div>\n' +
    '</div>\n' +
    '');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/Career/templates/edit.html',
    '<div class="modal-content">\n' +
    '	<div class="modal-header bordered">\n' +
    '		<h2 class="pmd-card-title-text">{{\'Career\' | translate}}</h2>  \n' +
    '	</div>\n' +
    '	<div class="modal-body">\n' +
    '		<form class="form-horizontal" name="editTypeForm"> \n' +
    '           <div> \n' +
    '                <div class="form-group pmd-textfield pmd-textfield-floating-label-compeleted">\n' +
    '                    <label for="first-name"> {{  \'Name\' | translate}} </label>\n' +
    '                    <input required Career="text" class="mat-input form-control" name="title" ng-model="editCareerCtrl.Career.title" ng-minlength="3" ng-maxlength="255">\n' +
    '                    <div ng-messages="newCareerForm.title.$error" >\n' +
    '                        \n' +
    '                        <div ng-show="newCareerForm.title.$error.required && !newCareerForm.title.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '                        <div ng-show="(newCareerForm.title.$error.minlength || newCareerForm.title.$error.maxlength) && !newCareerForm.title.$error.required">{{\'NameLengthError255\' | translate}}</div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div> \n' +
    '            <div> \n' +
    '                <div class="form-group pmd-textfield pmd-textfield-floating-label-compeleted">\n' +
    '                    <label for="first-name"> {{\' Description\' | translate}} </label>\n' +
    '                    <textarea required Career="text" class="mat-input form-control" name="description" \n' +
    '                    ng-model="editCareerCtrl.Career.description" ng-minlength="3" ng-maxlength="255"></textarea>\n' +
    '                    <div ng-messages="newCareerForm.description.$error" >\n' +
    '                        \n' +
    '                        <div ng-show="newCareerForm.description.$error.required && !newCareerForm.description.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '                        <div ng-show="(newCareerForm.description.$error.minlength || newCareerForm.description.$error.maxlength) && !newCareerForm.description.$error.required">{{\'NameLengthError255\' | translate}}</div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div> \n' +
    '		</form>\n' +
    '	</div>\n' +
    '	<div class="pmd-modal-action text-right">\n' +
    '		<button ng-disabled="editTypeForm.$invalid" class="btn pmd-ripple-effect btn-primary" type="button" ng-click="editCareerCtrl.UpdateCareer()">{{\'saveChangesBtn\' | translate}}</button>\n' +
    '		<button class="btn pmd-ripple-effect btn-default" type="button" ng-click="editCareerCtrl.Close()">{{\'DiscardBtn\' | translate}}</button>\n' +
    '	</div>\n' +
    '</div>\n' +
    '\n' +
    '	\n' +
    '');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/Career/templates/new.html',
    '<div class="modal-content">\n' +
    '    <div class="modal-header bordered">\n' +
    '        <h2 class="pmd-card-title-text">{{\'NewCareer\' | translate}}</h2>\n' +
    '    </div>\n' +
    '    <div class="modal-body">\n' +
    '        <form class="form-horizontal" name="newCareerForm"> \n' +
    '            <div> \n' +
    '                <div class="form-group pmd-textfield pmd-textfield-floating-label">\n' +
    '                    <label for="first-name"> {{  \'Name\' | translate}} </label>\n' +
    '                    <input required Career="text" class="mat-input form-control" name="title" ng-model="newCareerCtrl.title" ng-minlength="3" ng-maxlength="255">\n' +
    '                    <div ng-messages="newCareerForm.title.$error" >\n' +
    '                        \n' +
    '                        <div ng-show="newCareerForm.title.$error.required && !newCareerForm.title.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '                        <div ng-show="(newCareerForm.title.$error.minlength || newCareerForm.title.$error.maxlength) && !newCareerForm.title.$error.required">{{\'NameLengthError255\' | translate}}</div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div> \n' +
    '            <div> \n' +
    '                <div class="form-group pmd-textfield pmd-textfield-floating-label">\n' +
    '                    <label for="first-name"> {{\' Description\' | translate}} </label>\n' +
    '                    <textarea required Career="text" class="mat-input form-control" name="description" \n' +
    '                    ng-model="newCareerCtrl.description" ng-minlength="3" ng-maxlength="255"></textarea>\n' +
    '                    <div ng-messages="newCareerForm.description.$error" >\n' +
    '                        \n' +
    '                        <div ng-show="newCareerForm.description.$error.required && !newCareerForm.description.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '                        <div ng-show="(newCareerForm.description.$error.minlength || newCareerForm.description.$error.maxlength) && !newCareerForm.description.$error.required">{{\'NameLengthError255\' | translate}}</div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div> \n' +
    '        </form>\n' +
    '    </div>\n' +
    '    <div class="pmd-modal-action text-right">\n' +
    '        <button ng-disabled="newCareerForm.$invalid" class="btn pmd-ripple-effect btn-primary" Career="button" ng-click="newCareerCtrl.AddNewCareer()">{{\'saveChangesBtn\' | translate}}</button>\n' +
    '        <button class="btn pmd-ripple-effect btn-default" Career="button" ng-click="$state.go(\'Career\');">{{\'DiscardBtn\' | translate}}</button>\n' +
    '    </div>\n' +
    '</div>\n' +
    '');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/City/templates/edit.html',
    '<div class="modal-content">\n' +
    '	<div class="modal-header bordered">\n' +
    '		<h2 class="pmd-card-title-text">{{\'City\' | translate}}</h2>\n' +
    '	</div>\n' +
    '	<div class="modal-body">\n' +
    '		<form class="form-horizontal" name="editTypeForm"> \n' +
    '                <div> \n' +
    '                    <!-- Nav tabs -->\n' +
    '                    <ul class="nav nav-tabs" role="tablist">\n' +
    '                        <li role="presentation" ng-class="{\'active\':$index == 0}" ng-repeat="lang in editCityCtrl.language">\n' +
    '                            <a href="javascript:void(0);" data-target="#{{lang.value}}-form" aria-controls="home" role="tab" data-toggle="tab">\n' +
    '                                {{lang.value | translate}}\n' +
    '                            </a>\n' +
    '                        </li> \n' +
    '                    </ul>\n' +
    '                    <div class="pmd-card">\n' +
    '                        <div class="pmd-card-body">\n' +
    '                            <!-- Tab panes -->\n' +
    '                            <div class="tab-content">\n' +
    '                                <div role="tablist" class="tab-pane" ng-class="{\'active\':$index == 0}" ng-repeat="lang in editCityCtrl.language" id="{{lang.value}}-form">\n' +
    '                                    <div class="form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                                        <label for="first-name"> {{ lang.value+\'Name\' | translate}} </label>\n' +
    '                                        <input required type="text" class="mat-input form-control" name="titleDictionary{{lang.value+\'Name\'}}" ng-model="editCityCtrl.City.titleDictionary[lang.key]" ng-minlength="3" ng-maxlength="255">\n' +
    '                                        <div ng-messages="editTypeForm.titleDictionary{{lang.value+\'Name\'}}.$error" >\n' +
    '                                            \n' +
    '                                            <div ng-show="editTypeForm.titleDictionary{{lang.value+\'Name\'}}.$error.required && !editTypeForm.titleDictionary{{lang.value+\'Name\'}}.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '                                            <div ng-show="(editTypeForm.titleDictionary{{lang.value+\'Name\'}}.$error.minlength || editTypeForm.titleDictionary{{lang.value+\'Name\'}}.$error.maxlength) && !editTypeForm.titleDictionary{{lang.value+\'Name\'}}.$error.required">{{\'NameLengthError255\' | translate}}</div>\n' +
    '                                        </div>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </div> \n' +
    '                        </div>\n' +
    '\n' +
    '                   \n' +
    '                    </div>\n' +
    '                </div> \n' +
    ' \n' +
    '		</form>\n' +
    '	</div>\n' +
    '	<div class="pmd-modal-action text-right">\n' +
    '		<button ng-disabled="editTypeForm.$invalid" class="btn pmd-ripple-effect btn-primary" type="button" ng-click="editCityCtrl.UpdateCity()">{{\'saveChangesBtn\' | translate}}</button>\n' +
    '		<button class="btn pmd-ripple-effect btn-default" type="button" ng-click="editCityCtrl.close()">{{\'DiscardBtn\' | translate}}</button>\n' +
    '	</div>\n' +
    '</div>\n' +
    '\n' +
    '	\n' +
    '');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/City/templates/new.html',
    '<div class="modal-content">\n' +
    '    <div class="modal-header bordered">\n' +
    '        <h2 class="pmd-card-title-text">{{\'City\' | translate}}</h2>\n' +
    '    </div>\n' +
    '    <div class="modal-body">\n' +
    '        <form class="form-horizontal" name="newCityForm"> \n' +
    '            <div> \n' +
    '                <!-- Nav tabs -->\n' +
    '                <ul class="nav nav-tabs" role="tablist">\n' +
    '                    <li role="presentation" ng-class="{\'active\':$index == 0}" ng-repeat="lang in newCityCtrl.language">\n' +
    '                        <a href="javascript:void(0);" data-target="#{{lang.value}}-form" aria-controls="home" role="tab" data-toggle="tab">\n' +
    '                            {{lang.value | translate}}  \n' +
    '                        </a>\n' +
    '                    </li> \n' +
    '                </ul>\n' +
    '                <div class="pmd-card">\n' +
    '                    <div class="pmd-card-body">\n' +
    '                        <!-- Tab panes -->\n' +
    '                        <div class="tab-content">\n' +
    '                            <div role="tablist" class="tab-pane" ng-class="{\'active\':$index == 0}" ng-repeat="lang in newCityCtrl.language" id="{{lang.value}}-form">\n' +
    '                                <div class="form-group pmd-textfield pmd-textfield-floating-label">\n' +
    '                                    <label for="first-name"> {{ lang.value+\'Name\' | translate}} </label>\n' +
    '                                    <input required City="text" class="mat-input form-control" name="titleDictionary{{lang.value+\'Name\'}}" ng-model="newCityCtrl.titleDictionary[lang.key]" ng-minlength="3" ng-maxlength="255">\n' +
    '                                    <div ng-messages="newCityForm.titleDictionary{{lang.value+\'Name\'}}.$error" >\n' +
    '										\n' +
    '                                        <div ng-show="newCityForm.titleDictionary{{lang.value+\'Name\'}}.$error.required && !newCityForm.titleDictionary{{lang.value+\'Name\'}}.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '                                        <div ng-show="(newCityForm.titleDictionary{{lang.value+\'Name\'}}.$error.minlength || newCityForm.titleDictionary{{lang.value+\'Name\'}}.$error.maxlength) && !newCityForm.titleDictionary{{lang.value+\'Name\'}}.$error.required">{{\'NameLengthError255\' | translate}}</div>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div> \n' +
    '        </form>\n' +
    '    </div>\n' +
    '    <div class="pmd-modal-action text-right">\n' +
    '        <button ng-disabled="newCityForm.$invalid" class="btn pmd-ripple-effect btn-primary" City="button" ng-click="newCityCtrl.AddNewCity()">{{\'saveChangesBtn\' | translate}}</button>\n' +
    '        <button class="btn pmd-ripple-effect btn-default" City="button" ng-click="newCityCtrl.close()">{{\'DiscardBtn\' | translate}}</button>\n' +
    '    </div>\n' +
    '</div>\n' +
    '');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/Client/templates/Client.html',
    '<div>\n' +
    '    <!-- <div style="margin-bottom:10px">\n' +
    '        <button ng-click="$state.go(\'addClient\');" ng-disabled="ClientCtrl.ClientConsumed.consumedClients >= ClientCtrl.ClientConsumed.maxNumClients" class="btn pmd-ripple-effect btn-primary pmd-z-depth" type="button">{{\'AddClientBtn\' | translate}}</button>\n' +
    ' \n' +
    '    </div> -->\n' +
    '    <div ng-if="ClientCtrl.ClientList.results.length == 0">\n' +
    '        <span>{{\'NoClientAvailable\' | translate}}</span>\n' +
    '    </div>\n' +
    '\n' +
    '    <div class="pmd-card pmd-z-depth pmd-card-custom-view" ng-if="ClientList.length >0">\n' +
    '\n' +
    '        <div class="table-responsive">\n' +
    '            <table class="table pmd-table table-hover">\n' +
    '                <thead>\n' +
    '                    <tr>\n' +
    '                        <th>{{\'ClientName\' | translate}}</th> \n' +
    '                        <th>{{\'EmailLbl\' | translate}}</th> \n' +
    '                        <th>{{\'Phone1Lbl\' | translate}}</th>  \n' +
    '                    </tr>\n' +
    '                </thead>\n' +
    '                <tbody>\n' +
    '                    <tr ng-repeat="Client in ClientList">\n' +
    '                        <td data-title="Name" width="20%">{{Client.fullName}}</td> \n' +
    '                        <td  data-title="email" width="20%">{{Client.email}}  </td> \n' +
    '                        <td  data-title="phone">{{Client.phone}}</td>  \n' +
    '                       \n' +
    '                        <td  width="15%">  \n' +
    '                            <!-- <i class="cursorPointer" ng-click="$state.go(\'editClient\', {ClientId: Client.ClientId});">{{\'Edit\' | translate}} </i> -->\n' +
    '\n' +
    '                        </td>\n' +
    '                    </tr>\n' +
    '                </tbody>\n' +
    '            </table>\n' +
    '        </div>\n' +
    '\n' +
    '    </div>\n' +
    '    <div style="text-align:center;direction: ltr" paging page="1" page-size="10" total="totalCount" paging-action="changePage(page)"\n' +
    '         flex="nogrow" show-prev-next="true" show-first-last="true" hide-if-empty="true" disabled-class="hide">\n' +
    '    </div>\n' +
    '</div>\n' +
    '\n' +
    '');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/Client/templates/addUser.html',
    '{{\'BasicInfoLbl\' | translate}}\n' +
    '<form class="form-horizontal" name="newclientForm">\n' +
    '\n' +
    '    <div class="form-group pmd-textfield pmd-textfield-floating-label">\n' +
    '        <label for="first-name">{{\'Name\' | translate}}</label>\n' +
    '        <input required type="text" class="mat-input form-control" name="fullName" ng-pattern="/^(\\D)+$/" ng-model="fullName" ng-minlength="3"\n' +
    '            ng-maxlength="255">\n' +
    '        <div ng-messages="newclientForm.fullName.$error" class="error">\n' +
    '            <div ng-show="newclientForm.fullName.$error.pattern">{{\'TextOnly\' | translate}}</div>\n' +
    '            <div ng-if="newclientForm.fullName.$error.required && !newclientForm.fullName.$pristine">{{\'fullNameLengthError\' | translate}}</div>\n' +
    '            <div ng-if="(newclientForm.fullName.$error.minlength || newclientForm.fullName.$error.maxlength) ">{{\'NameLengthError255\' | translate}}</div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <div class="form-group pmd-textfield pmd-textfield-floating-label">\n' +
    '        <label for="first-name">{{\'titleLbl\' | translate}}</label>\n' +
    '        <input required type="text" class="mat-input form-control" name="title" ng-pattern="/^(\\D)+$/" ng-model="title" ng-minlength="3"\n' +
    '            ng-maxlength="255">\n' +
    '        <div ng-messages="newclientForm.title.$error">\n' +
    '            <div ng-show="newclientForm.title.$error.pattern">{{\'TextOnly\' | translate}}</div>\n' +
    '            <div ng-if="newclientForm.title.$error.required && !newclientForm.title.$pristine">{{\'title\' | translate}}</div>\n' +
    '            <div ng-if="(newclientForm.title.$error.minlength || newclientForm.title.$error.maxlength)">{{\'NameLengthError255\' | translate}}</div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <div class="form-group pmd-textfield pmd-textfield-floating-label">\n' +
    '        <label>{{\'EmailLbl\' | translate}}</label>\n' +
    '        <input required type="text" class="mat-input form-control" name="userEmail" ng-model="Email" ng-pattern="/^\\w+([-+.\']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$/">\n' +
    '        <span class="error" ng-show="newclientForm.userEmail.$error.pattern">{{\'WrongMail\' | translate}} </span> \n' +
    '        <div ng-messages="newclientForm.email.$error">\n' +
    '            <div ng-if="newclientForm.userEmail.$error.required && !newclientForm.userEmail.$pristine">{{\'EmailLengthError\' | translate}}</div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <div class="form-group pmd-textfield pmd-textfield-floating-label">\n' +
    '\n' +
    '\n' +
    '        <label for="first-name">{{\'phoneLbl\' | translate}}</label>\n' +
    '        <input required type="text" class="mat-input form-control" name="phone" numbers-only ng-model="Phone" ng-minlength="10" ng-maxlength="50">\n' +
    '        <!-- <span class="error" ng-show="newclientForm.phone.$error.pattern">{{\'NotPhoneNumber\' | translate}}   </span> -->\n' +
    '        <div ng-messages="newclientForm.phone.$error">\n' +
    '            <div ng-if="newclientForm.phone.$error.required && !newclientForm.phone.$pristine">{{\'PhoneReqError\' | translate}}</div>\n' +
    '            <div ng-if="(newclientForm.phone.$error.minlength || newclientForm.phone.$error.maxlength)">{{\'PhoneLengthError\' | translate}}</div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <div class="form-group pmd-textfield pmd-textfield-floating-label">\n' +
    '\n' +
    '\n' +
    '        <label for="first-name">{{\'whatsApp\' | translate}}</label>\n' +
    '        <input required type="text" class="mat-input form-control" name="whatsApp" numbers-only ng-model="whatsApp" ng-minlength="10" ng-maxlength="50">\n' +
    '         <div ng-messages="newclientForm.whatsApp.$error">\n' +
    '            <div ng-if="newclientForm.whatsApp.$error.required && !newclientForm.whatsApp.$pristine">{{\'whatsAppReqError\' | translate}}</div>\n' +
    '            <div ng-if="(newclientForm.whatsApp.$error.minlength || newclientForm.whatsApp.$error.maxlength)">{{\'whatsAppLengthError\' | translate}}</div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '\n' +
    '    <div class="form-group pmd-textfield pmd-textfield-floating-label">\n' +
    '        <label for="first-name">{{\'UserPasswordLbl\' | translate}}</label>\n' +
    '        <input required type="password" class="mat-input form-control" name="password" ng-model="Password" ng-minlength="8" ng-maxlength="25">\n' +
    '        <div ng-messages="newclientForm.password.$error">\n' +
    '            <div ng-if="newclientForm.password.$error.required && !newclientForm.password.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '            <div ng-if="(newclientForm.password.$error.minlength || newclientForm.password.$error.maxlength) && !newclientForm.password.newPassword.$error.required">Password length must be 8-25 char.</div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <div class="form-group pmd-textfield pmd-textfield-floating-label">\n' +
    '        <label for="first-name">{{\'ConfirmPasswordLbl\' | translate}}</label>\n' +
    '        <input required type="password" class="mat-input form-control" name="confirmPassword" ng-model="confirmPassword" equalto="newclientForm.password">\n' +
    '        <div ng-messages="newclientForm.confirmPassword.$error">\n' +
    '            <div ng-if="newclientForm.confirmPassword.$error.required && !newclientForm.confirmPassword.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '            <div ng-if="newclientForm.confirmPassword.$error.equalto && !newclientForm.confirmPassword.$error.required">{{\'passworddontmatch\' | translate}}</div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <div class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '        <label for="first-name">{{\'UserType\' | translate}}</label>\n' +
    '        <select required style="width:100% !important" class="select-tags form-control pmd-select2-tags" \n' +
    '            ng-model="selectedType" ng-options="group as group.text for group in userTypeList">\n' +
    '\n' +
    '        </select> \n' +
    '    </div> \n' +
    '    \n' +
    '</form>\n' +
    '<div class="pmd-modal-action text-right">\n' +
    '    <button ng-disabled="newclientForm.$invalid "\n' +
    '     class="btn pmd-ripple-effect btn-primary" type="button" ng-click="AddNewclient()">{{\'saveChangesBtn\' | translate}}</button>\n' +
    '		<button class="btn pmd-ripple-effect btn-default" type="button" ng-click="Close()">{{\'DiscardBtn\' | translate}}</button>\n' +
    '\n' +
    '</div>\n' +
    '<script type="text/javascript">\n' +
    '    $(document).ready(function () { \n' +
    '        $(".select-tags").select2({\n' +
    '            tags: false,\n' +
    '            theme: "bootstrap",\n' +
    '        })\n' +
    '\n' +
    '        $(".select-with-search").select2({\n' +
    '            theme: "bootstrap"\n' +
    '        });\n' +
    '    });\n' +
    '</script>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/Client/templates/editUser.html',
    ' \n' +
    '<form class="form-horizontal" name="newclientForm" autocomplete="off">\n' +
    '    <div class="form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '        <label for="first-name">{{\'fullNameLbl\' | translate}}</label>\n' +
    '        <input required type="text" class="mat-input form-control" name="fullName" ng-model="userObj.fullName" ng-minlength="3"\n' +
    '            ng-maxlength="255">\n' +
    '        <div ng-messages="newclientForm.fullName.$error">\n' +
    '            <div ng-if="newclientForm.fullName.$error.required && !newclientForm.fullName.$pristine">{{\'fullNameLengthError\' | translate}}</div>\n' +
    '            <div ng-if="(newclientForm.fullName.$error.minlength || newclientForm.fullName.$error.maxlength) && !newclientForm.fullName.$error.required">{{\'NameLengthError255\' | translate}}</div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <div class="form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '        <label for="first-name">{{\'titleLbl\' | translate}}</label>\n' +
    '        <input required type="text" class="mat-input form-control" name="title" ng-model="userObj.title" ng-minlength="3" ng-maxlength="255">\n' +
    '        <div ng-messages="newclientForm.title.$error">\n' +
    '            <div ng-if="newclientForm.title.$error.required && !newclientForm.title.$pristine">{{\'title\' | translate}}</div>\n' +
    '            <div ng-if="(newclientForm.title.$error.minlength || newclientForm.title.$error.maxlength) && !newclientForm.title.$error.required">{{\'titleLengthError\' | translate}}</div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <div class="form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '        <label for="first-name">{{\'EmailLbl\' | translate}}</label>\n' +
    '\n' +
    '        <input required type="text" class="mat-input form-control" name="email" ng-model="userObj.email" ng-minlength="3" ng-maxlength="50">\n' +
    '        <div ng-messages="newclientForm.email.$error">\n' +
    '            <div ng-if="newclientForm.email.$error.required && !newclientForm.email.$pristine">{{\'lastName\' | translate}}</div>\n' +
    '            <div ng-if="(newclientForm.email.$error.minlength || newclientForm.email.$error.maxlength) && !newclientForm.email.$error.required">{{\'LastNameLengthError\' | translate}}</div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <div class="form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '        <label for="first-name">{{\'phoneLbl\' | translate}}</label>\n' +
    '\n' +
    '        <input required type="text" class="mat-input form-control" numbers-only name="phone" ng-model="userObj.phone" ng-pattern="phoneNumbr"\n' +
    '            ng-minlength="10" ng-maxlength="50">\n' +
    '        <span class="error" ng-show="newclientForm.phone.$error.pattern">{{\'NotPhoneNumber\' | translate}} </span>\n' +
    '        <div ng-messages="newclientForm.phone.$error">\n' +
    '            <div ng-if="newclientForm.phone.$error.required && !newclientForm.phone.$pristine">{{\'PhoneReqError\' | translate}}</div>\n' +
    '            <div ng-if="(newclientForm.phone.$error.minlength || newclientForm.phone.$error.maxlength)">{{\'PhoneLengthError\' | translate}}</div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '\n' +
    '    <div class="form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '        <label for="first-name">{{\'whatsAppLbl\' | translate}}</label>\n' +
    '\n' +
    '        <input required type="text" class="mat-input form-control" numbers-only name="whatsApp" ng-model="userObj.whatsApp" ng-pattern="whatsAppNumbr"\n' +
    '            ng-minlength="10" ng-maxlength="50">\n' +
    '        <span class="error" ng-show="newclientForm.whatsApp.$error.pattern">{{\'NotwhatsAppNumber\' | translate}} </span>\n' +
    '        <div ng-messages="newclientForm.whatsApp.$error">\n' +
    '            <div ng-if="newclientForm.whatsApp.$error.required && !newclientForm.whatsApp.$pristine">{{\'whatsAppReqError\' | translate}}</div>\n' +
    '            <div ng-if="(newclientForm.whatsApp.$error.minlength || newclientForm.whatsApp.$error.maxlength)">{{\'whatsAppLengthError\' | translate}}</div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '\n' +
    '    <div class="form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '        <label for="first-name">{{\'UserPasswordLbl\' | translate}}</label>\n' +
    '\n' +
    '        <input required type="password" class="mat-input form-control" name="password" ng-model="userObj.password" ng-minlength="8"\n' +
    '            ng-maxlength="25">\n' +
    '        <div ng-messages="newclientForm.password.$error">\n' +
    '            <div ng-if="newclientForm.password.$error.required && !newclientForm.password.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '            <div ng-if="(newclientForm.password.$error.minlength || newclientForm.password.$error.maxlength) && !newclientForm.password.newPassword.$error.required">Password length must be 8-25 char.</div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '\n' +
    '    <div class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '        <label for="first-name">{{\'ConfirmPasswordLbl\' | translate}}</label>\n' +
    '        <input required type="password" class="mat-input form-control" name="confirmPassword" ng-model="userObj.confirmPassword" equalto="newclientForm.password">\n' +
    '        <div ng-messages="newclientForm.confirmPassword.$error">\n' +
    '            <div ng-if="newclientForm.confirmPassword.$error.required && !newclientForm.confirmPassword.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '            <div ng-if="newclientForm.confirmPassword.$error.equalto && !newclientForm.confirmPassword.$error.required">{{\'passworddontmatch\' | translate}}</div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <div class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '        <label for="first-name">{{\'UserType\' | translate}}</label>\n' +
    '        <select required style="width:100% !important" class="select-tags form-control pmd-select2-tags" \n' +
    '            ng-model="selectedType" ng-options="group as group.text for group in userTypeList">\n' +
    '\n' +
    '        </select> \n' +
    '    </div> \n' +
    '    \n' +
    '</form>\n' +
    '<div class="pmd-modal-action text-right">\n' +
    '    <button ng-disabled="newclientForm.$invalid" class="btn pmd-ripple-effect btn-primary" type="button"\n' +
    '        ng-click="Updateclient()">{{\'saveChangesBtn\' | translate}}</button>\n' +
    '		<button class="btn pmd-ripple-effect btn-default" type="button" ng-click="newclientForm.Close()">{{\'DiscardBtn\' | translate}}</button>\n' +
    '\n' +
    '</div>\n' +
    '\n' +
    '\n' +
    '<script type="text/javascript">\n' +
    '    $(document).ready(function () {\n' +
    '        $(".select-add-tags").select2({\n' +
    '            tags: true,\n' +
    '            theme: "bootstrap",\n' +
    '            insertTag: function (data, tag) {\n' +
    '                // Insert the tag at the end of the results\n' +
    '                data.push(tag);\n' +
    '                // console.log(data);\n' +
    '            }\n' +
    '        });\n' +
    '        $(".select-tags").select2({\n' +
    '            tags: false,\n' +
    '            theme: "bootstrap",\n' +
    '        })\n' +
    '        \n' +
    '        $(".select-with-search").select2({\n' +
    '            theme: "bootstrap"\n' +
    '        });\n' +
    '    });\n' +
    '</script>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/Contact/templates/Contact.html',
    '\n' +
    '<div> \n' +
    '    <div ng-if="ContactList.results.length == 0">\n' +
    '        <span>{{\'NoContactsAvailable\' | translate}}</span>\n' +
    '    </div> \n' +
    '     <div class="pmd-card pmd-z-depth pmd-card-custom-view" ng-if="ContactList.length > 0">\n' +
    '        <div class="table-responsive"></div>\n' +
    '        <table class="table pmd-table table-hover">\n' +
    '            <thead>\n' +
    '                <tr>\n' +
    '                    <th>{{\'Address\' | translate}}</th>  \n' +
    '                    <th></th>\n' +
    '                </tr>\n' +
    '            </thead>\n' +
    '            <tbody>\n' +
    '                <tr ng-repeat="Contact in ContactList">\n' +
    '                    <td data-title="Name">{{Contact.addressDictionary[selectedLanguage]}}</td>\n' +
    '                  \n' +
    '                    <td width="30%" ng-show="!Contact.isStatic">\n' +
    '                        <i class="material-icons md-dark pmd-md cursorPointer font25" ng-click="$state.go(\'editContact\',{contactUsId: Contact.contactUsId});">mode_edit</i>\n' +
    '                    </td>\n' +
    '                </tr> \n' +
    '            </tbody>\n' +
    '        </table>\n' +
    '    </div>\n' +
    '    <div style="text-align:center;direction: ltr" paging page="1" page-size="10" total="totalCount" paging-action="changePage(page)"\n' +
    '         flex="nogrow" show-prev-next="true" show-first-last="true" hide-if-empty="true" disabled-class="hide">\n' +
    '    </div>\n' +
    '</div>\n' +
    '');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/Contact/templates/edit.html',
    '<div class="modal-content">\n' +
    '	<div class="modal-header bordered">\n' +
    '		<h2 class="pmd-card-title-text">{{\'Contact\' | translate}}</h2>\n' +
    '	</div>\n' +
    '	<div class="modal-body">\n' +
    '		<form class="form-horizontal" name="editContactForm"> \n' +
    '                <div> \n' +
    '                    <!-- Nav tabs -->\n' +
    '                    <ul class="nav nav-tabs" role="tablist">\n' +
    '                        <li role="presentation" ng-class="{\'active\':$index == 0}" ng-repeat="lang in editContactCtrl.language">\n' +
    '                            <a href="javascript:void(0);" data-target="#{{lang.value}}-form" aria-controls="home" role="tab" data-toggle="tab">\n' +
    '                                {{lang.value | translate}}\n' +
    '                            </a>\n' +
    '                        </li> \n' +
    '                    </ul>\n' +
    '                    <div class="pmd-card">\n' +
    '                        <div class="pmd-card-body">\n' +
    '                            <!-- Tab panes -->\n' +
    '                            <div class="tab-content">\n' +
    '                                <div role="tablist" class="tab-pane" ng-class="{\'active\':$index == 0}" ng-repeat="lang in editContactCtrl.language" id="{{lang.value}}-form">\n' +
    '                                    <div class="form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                                        <label for="first-name"> {{ lang.value+\'Address\' | translate}} </label>\n' +
    '                                        <textarea required type="text" class="mat-input form-control" name="addressDictionary{{lang.value+\'Name\'}}"\n' +
    '                                         ng-model="editContactCtrl.Contact.addressDictionary[lang.key]" ng-minlength="3" ng-maxlength="255"></textarea>\n' +
    '                                        <div ng-messages="editContactForm.addressDictionary{{lang.value+\'Name\'}}.$error" >\n' +
    '                                            \n' +
    '                                            <div ng-show="editContactForm.addressDictionary{{lang.value+\'Name\'}}.$error.required && !editContactForm.addressDictionary{{lang.value+\'Name\'}}.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '                                            <div ng-show="(editContactForm.addressDictionary{{lang.value+\'Name\'}}.$error.minlength || editContactForm.addressDictionary{{lang.value+\'Name\'}}.$error.maxlength) && !editContactForm.addressDictionary{{lang.value+\'Name\'}}.$error.required">{{\'NameLengthError255\' | translate}}</div>\n' +
    '                                        </div>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </div> \n' +
    '                        </div>\n' +
    '\n' +
    '                   \n' +
    '                    </div>\n' +
    '                </div> \n' +
    '              \n' +
    '                <div class="form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                    <label for="first-name">{{\'EmailLbl\' | translate}}</label>\n' +
    '            \n' +
    '                    <input required type="text" class="mat-input form-control" name="email" ng-model="editContactCtrl.Contact.mail" ng-minlength="3" ng-maxlength="50">\n' +
    '                    <div ng-messages="editContactForm.email.$error">\n' +
    '                        <div ng-if="editContactForm.email.$error.required && !editContactForm.email.$pristine">{{\'email is required\' | translate}}</div>\n' +
    '                        <div ng-if="(editContactForm.email.$error.minlength || editContactForm.email.$error.maxlength) && !editContactForm.email.$error.required">{{\'LastNameLengthError\' | translate}}</div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div class="form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                    <label for="first-name">{{\'phoneLbl\' | translate}}</label>\n' +
    '            \n' +
    '                    <input required type="text" class="mat-input form-control" numbers-only name="phone" ng-model="editContactCtrl.Contact.phone" ng-pattern="phoneNumbr"\n' +
    '                        ng-minlength="10" ng-maxlength="50">\n' +
    '                    <span class="error" ng-show="editContactForm.phone.$error.pattern">{{\'NotPhoneNumber\' | translate}} </span>\n' +
    '                    <div ng-messages="editContactForm.phone.$error">\n' +
    '                        <div ng-if="editContactForm.phone.$error.required && !editContactForm.phone.$pristine">{{\'PhoneReqError\' | translate}}</div>\n' +
    '                        <div ng-if="(editContactForm.phone.$error.minlength || editContactForm.phone.$error.maxlength)">{{\'PhoneLengthError\' | translate}}</div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div class="form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                    <label for="first-name">{{\'faxLbl\' | translate}}</label>\n' +
    '            \n' +
    '                    <input required type="text" class="mat-input form-control" numbers-only name="fax" ng-model="editContactCtrl.Contact.fax" ng-pattern="faxNumbr"\n' +
    '                        ng-minlength="10" ng-maxlength="50">\n' +
    '                    <span class="error" ng-show="editContactForm.fax.$error.pattern">{{\'NotfaxNumber\' | translate}} </span>\n' +
    '                    <div ng-messages="editContactForm.fax.$error">\n' +
    '                        <div ng-if="editContactForm.fax.$error.required && !editContactForm.fax.$pristine">{{\'faxReqError\' | translate}}</div>\n' +
    '                        <div ng-if="(editContactForm.fax.$error.minlength || editContactForm.fax.$error.maxlength)">{{\'faxLengthError\' | translate}}</div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div class="form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                    <label for="first-name">{{\'Facebook\' | translate}}</label>\n' +
    '            \n' +
    '                    <input required type="text" class="mat-input form-control" name="Facebook" ng-model="editContactCtrl.Contact.facebook" ng-minlength="3" ng-maxlength="50">\n' +
    '                    <div ng-messages="editContactForm.Facebook.$error">\n' +
    '                        <div ng-if="editContactForm.Facebook.$error.required && !editContactForm.Facebook.$pristine">{{\'Facebook Is Required\' | translate}}</div>\n' +
    '                        <div ng-if="(editContactForm.Facebook.$error.minlength || editContactForm.Facebook.$error.maxlength) && !editContactForm.Facebook.$error.required">{{\'Facebook charachter must be  3\' | translate}}</div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '\n' +
    '                <div class="form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                    <label for="first-name">{{\'instgram\' | translate}}</label>\n' +
    '            \n' +
    '                    <input required type="text" class="mat-input form-control" name="instgram" ng-model="editContactCtrl.Contact.instgram" ng-minlength="3" ng-maxlength="50">\n' +
    '                    <div ng-messages="editContactForm.instgram.$error">\n' +
    '                        <div ng-if="editContactForm.instgram.$error.required && !editContactForm.instgram.$pristine">{{\'instgram Is Required\' | translate}}</div>\n' +
    '                        <div ng-if="(editContactForm.instgram.$error.minlength || editContactForm.instgram.$error.maxlength) && !editContactForm.instgram.$error.required">{{\'instgram charachter must be  3\' | translate}}</div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '\n' +
    '                <div class="form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                    <label for="first-name">{{\'twitter\' | translate}}</label>\n' +
    '            \n' +
    '                    <input required type="text" class="mat-input form-control" name="twitter" ng-model="editContactCtrl.Contact.twitter" ng-minlength="3" ng-maxlength="50">\n' +
    '                    <div ng-messages="editContactForm.twitter.$error">\n' +
    '                        <div ng-if="editContactForm.twitter.$error.required && !editContactForm.twitter.$pristine">{{\'twitter Is Required\' | translate}}</div>\n' +
    '                        <div ng-if="(editContactForm.twitter.$error.minlength || editContactForm.twitter.$error.maxlength) && !editContactForm.twitter.$error.required">{{\'twitter charachter must be  3\' | translate}}</div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div class="form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                    <label for="first-name">{{\'linkedIn\' | translate}}</label>\n' +
    '            \n' +
    '                    <input required type="text" class="mat-input form-control" name="linkedIn" ng-model="editContactCtrl.Contact.linkedIn" ng-minlength="3" ng-maxlength="50">\n' +
    '                    <div ng-messages="editContactForm.linkedIn.$error">\n' +
    '                        <div ng-if="editContactForm.linkedIn.$error.required && !editContactForm.linkedIn.$pristine">{{\'linkedIn Is Required\' | translate}}</div>\n' +
    '                        <div ng-if="(editContactForm.linkedIn.$error.minlength || editContactForm.linkedIn.$error.maxlength) && !editContactForm.linkedIn.$error.required">{{\'linkedIn charachter must be  3\' | translate}}</div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '		</form>\n' +
    '	</div>\n' +
    '	<div class="pmd-modal-action text-right">\n' +
    '		<button ng-disabled="editContactForm.$invalid" class="btn pmd-ripple-effect btn-primary" type="button" ng-click="editContactCtrl.UpdateContact()">{{\'saveChangesBtn\' | translate}}</button>\n' +
    '		<button class="btn pmd-ripple-effect btn-default" type="button" ng-click="editContactCtrl.Close()">{{\'DiscardBtn\' | translate}}</button>\n' +
    '	</div>\n' +
    '</div>\n' +
    '\n' +
    '	\n' +
    '');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/Currency/templates/Currency.html',
    '\n' +
    '<div>\n' +
    '    <div style="margin-bottom:10px">\n' +
    '        <button ng-click="$state.go(\'newCurrency\');" class="btn pmd-ripple-effect btn-primary pmd-z-depth" type="button">{{\'AddNew\' | translate}}</button>\n' +
    '\n' +
    '    </div> \n' +
    '    <div ng-if="CurrencyList.results.length == 0">\n' +
    '        <span>{{\'NoCurrencysAvailable\' | translate}}</span>\n' +
    '    </div>\n' +
    '    <div class="pmd-card pmd-z-depth pmd-card-custom-view" ng-if="CurrencyList.results.length > 0">\n' +
    '        <div class="table-responsive"></div>\n' +
    '        <table class="table pmd-table table-hover">\n' +
    '            <thead>\n' +
    '                <tr>\n' +
    '                    <th>{{\'Name\' | translate}}</th>\n' +
    '                    <!-- <th>{{\'status\' | translate}}</th>  -->\n' +
    '                    <th></th>\n' +
    '                </tr>\n' +
    '            </thead>\n' +
    '            <tbody>\n' +
    '                <tr ng-repeat="Currency in CurrencyList.results">\n' +
    '                    <td data-title="Name">{{Currency.titleDictionary[selectedLanguage]}}</td>\n' +
    '                    \n' +
    '                    <!-- <td>\n' +
    '                        <p ng-show="Currency.isStatic"> Static</p>\n' +
    '                    </td> --> \n' +
    '                   \n' +
    '                    <td width="30%" ng-show="!Currency.isStatic">\n' +
    '                        <i class="material-icons md-dark pmd-md cursorPointer font25" ng-click="$state.go(\'editCurrency\',{currencyId: Currency.currencyId});">mode_edit</i>\n' +
    '                    </td>\n' +
    '                </tr>\n' +
    '                \n' +
    '            </tbody>\n' +
    '        </table>\n' +
    '    </div>\n' +
    '    <div style="text-align:center;direction: ltr" paging page="1" page-size="10" total="totalCount" paging-action="changePage(page)"\n' +
    '         flex="nogrow" show-prev-next="true" show-first-last="true" hide-if-empty="true" disabled-class="hide">\n' +
    '    </div>\n' +
    '</div>\n' +
    '');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/Currency/templates/edit.html',
    '<div class="modal-content">\n' +
    '	<div class="modal-header bordered">\n' +
    '		<h2 class="pmd-card-title-text">{{\'Currency\' | translate}}</h2>\n' +
    '	</div>\n' +
    '	<div class="modal-body">\n' +
    '		<form class="form-horizontal" name="editTypeForm"> \n' +
    '                <div> \n' +
    '                    <!-- Nav tabs -->\n' +
    '                    <ul class="nav nav-tabs" role="tablist">\n' +
    '                        <li role="presentation" ng-class="{\'active\':$index == 0}" ng-repeat="lang in editCurrencyCtrl.language">\n' +
    '                            <a href="javascript:void(0);" data-target="#{{lang.value}}-form" aria-controls="home" role="tab" data-toggle="tab">\n' +
    '                                {{lang.value | translate}}\n' +
    '                            </a>\n' +
    '                        </li> \n' +
    '                    </ul>\n' +
    '                    <div class="pmd-card">\n' +
    '                        <div class="pmd-card-body">\n' +
    '                            <!-- Tab panes -->\n' +
    '                            <div class="tab-content">\n' +
    '                                <div role="tablist" class="tab-pane" ng-class="{\'active\':$index == 0}" ng-repeat="lang in editCurrencyCtrl.language" id="{{lang.value}}-form">\n' +
    '                                    <div class="form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                                        <label for="first-name"> {{ lang.value+\'Name\' | translate}} </label>\n' +
    '                                        <input required type="text" class="mat-input form-control" name="titleDictionary{{lang.value+\'Name\'}}" ng-model="editCurrencyCtrl.Currency.titleDictionary[lang.key]" ng-minlength="3" ng-maxlength="255">\n' +
    '                                        <div ng-messages="editTypeForm.titleDictionary{{lang.value+\'Name\'}}.$error" >\n' +
    '                                            \n' +
    '                                            <div ng-show="editTypeForm.titleDictionary{{lang.value+\'Name\'}}.$error.required && !editTypeForm.titleDictionary{{lang.value+\'Name\'}}.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '                                            <div ng-show="(editTypeForm.titleDictionary{{lang.value+\'Name\'}}.$error.minlength || editTypeForm.titleDictionary{{lang.value+\'Name\'}}.$error.maxlength) && !editTypeForm.titleDictionary{{lang.value+\'Name\'}}.$error.required">{{\'NameLengthError255\' | translate}}</div>\n' +
    '                                        </div>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </div> \n' +
    '                        </div>\n' +
    '\n' +
    '                   \n' +
    '                    </div>\n' +
    '                </div> \n' +
    ' \n' +
    '		</form>\n' +
    '	</div>\n' +
    '	<div class="pmd-modal-action text-right">\n' +
    '		<button ng-disabled="editTypeForm.$invalid" class="btn pmd-ripple-effect btn-primary" type="button" ng-click="editCurrencyCtrl.UpdateCurrency()">{{\'saveChangesBtn\' | translate}}</button>\n' +
    '		<button class="btn pmd-ripple-effect btn-default" type="button" ng-click="editCurrencyCtrl.Close()">{{\'DiscardBtn\' | translate}}</button>\n' +
    '	</div>\n' +
    '</div>\n' +
    '\n' +
    '	\n' +
    '');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/Currency/templates/new.html',
    '<div class="modal-content">\n' +
    '    <div class="modal-header bordered">\n' +
    '        <h2 class="pmd-card-title-text">{{\'NewCurrency\' | translate}}</h2>\n' +
    '    </div>\n' +
    '    <div class="modal-body">\n' +
    '        <form class="form-horizontal" name="newCurrencyForm"> \n' +
    '            <div> \n' +
    '                <!-- Nav tabs -->\n' +
    '                <ul class="nav nav-tabs" role="tablist">\n' +
    '                    <li role="presentation" ng-class="{\'active\':$index == 0}" ng-repeat="lang in newCurrencyCtrl.language">\n' +
    '                        <a href="javascript:void(0);" data-target="#{{lang.value}}-form" aria-controls="home" role="tab" data-toggle="tab">\n' +
    '                            {{lang.value | translate}}\n' +
    '                        </a>\n' +
    '                    </li> \n' +
    '                </ul>\n' +
    '                <div class="pmd-card">\n' +
    '                    <div class="pmd-card-body">\n' +
    '                        <!-- Tab panes -->\n' +
    '                        <div class="tab-content">\n' +
    '                            <div role="tablist" class="tab-pane" ng-class="{\'active\':$index == 0}" ng-repeat="lang in newCurrencyCtrl.language" id="{{lang.value}}-form">\n' +
    '                                <div class="form-group pmd-textfield pmd-textfield-floating-label">\n' +
    '                                    <label for="first-name"> {{ lang.value+\'Name\' | translate}} </label>\n' +
    '                                    <input required Currency="text" class="mat-input form-control" name="titleDictionary{{lang.value+\'Name\'}}" ng-model="newCurrencyCtrl.titleDictionary[lang.key]" ng-minlength="3" ng-maxlength="255">\n' +
    '                                    <div ng-messages="newCurrencyForm.titleDictionary{{lang.value+\'Name\'}}.$error" >\n' +
    '										\n' +
    '                                        <div ng-show="newCurrencyForm.titleDictionary{{lang.value+\'Name\'}}.$error.required && !newCurrencyForm.titleDictionary{{lang.value+\'Name\'}}.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '                                        <div ng-show="(newCurrencyForm.titleDictionary{{lang.value+\'Name\'}}.$error.minlength || newCurrencyForm.titleDictionary{{lang.value+\'Name\'}}.$error.maxlength) && !newCurrencyForm.titleDictionary{{lang.value+\'Name\'}}.$error.required">{{\'NameLengthError255\' | translate}}</div>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div> \n' +
    '        </form>\n' +
    '    </div>\n' +
    '    <div class="pmd-modal-action text-right">\n' +
    '        <button ng-disabled="newCurrencyForm.$invalid" class="btn pmd-ripple-effect btn-primary" Currency="button" ng-click="newCurrencyCtrl.AddNewCurrency()">{{\'saveChangesBtn\' | translate}}</button>\n' +
    '        <button class="btn pmd-ripple-effect btn-default" Currency="button" ng-click="$state.go(\'Currency\');">{{\'DiscardBtn\' | translate}}</button>\n' +
    '    </div>\n' +
    '</div>\n' +
    '');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/Feature/templates/Feature.html',
    '\n' +
    '<div>\n' +
    '    <div style="margin-bottom:10px">\n' +
    '        <button ng-click="$state.go(\'newFeature\');" class="btn pmd-ripple-effect btn-primary pmd-z-depth" type="button">{{\'AddNew\' | translate}}</button>\n' +
    '\n' +
    '    </div> \n' +
    '    <div ng-if="FeatureList.results.length == 0">\n' +
    '        <span>{{\'NoFeaturesAvailable\' | translate}}</span>\n' +
    '    </div>\n' +
    '    <div class="pmd-card pmd-z-depth pmd-card-custom-view" ng-if="FeatureList.results.length > 0">\n' +
    '        <div class="table-responsive"></div>\n' +
    '        <table class="table pmd-table table-hover">\n' +
    '            <thead>\n' +
    '                <tr>\n' +
    '                        <th>{{\'Image\' | translate}}</th> \n' +
    '                        <th>{{\'Name\' | translate}}</th> \n' +
    '                    <th></th>\n' +
    '                </tr>\n' +
    '            </thead>\n' +
    '            <tbody>\n' +
    '                <tr ng-repeat="Feature in FeatureList.results">\n' +
    '                        <td data-title="Image" ><img ng-src="{{Feature.icon}}"\n' +
    '                            ng-alt="{{Feature.titleDictionary[selectedLanguage]}}" style="max-height: 200px;max-width: 200px;"/>\n' +
    '                        </td>\n' +
    '\n' +
    '                            <td data-title="Name">{{Feature.titleDictionary[selectedLanguage]}}   </td>\n' +
    '                      <td width="30%">\n' +
    '                      <i class="material-icons md-dark pmd-md cursorPointer font25" ng-click="$state.go(\'editFeature\',{featureId: Feature.featureId});">mode_edit</i>\n' +
    '                    </td>\n' +
    '                </tr>\n' +
    '             </tbody>\n' +
    '        </table>\n' +
    '    </div>\n' +
    '    <div style="text-align:center;direction: ltr" paging page="1" page-size="10" total="totalCount" paging-action="changePage(page)"\n' +
    '         flex="nogrow" show-prev-next="true" show-first-last="true" hide-if-empty="true" disabled-class="hide">\n' +
    '    </div>\n' +
    '</div>\n' +
    '');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/Feature/templates/edit.html',
    '<div class="modal-content">\n' +
    '    <div class="modal-header bordered">\n' +
    '        <h2 class="pmd-card-title-text">{{\'Feature\' | translate}}</h2>\n' +
    '    </div>\n' +
    '    <div class="modal-body">\n' +
    '        <form class="form-horizontal" name="UpdateFeatureForm">\n' +
    '            <div>\n' +
    '                <!-- Nav tabs -->\n' +
    '                <ul class="nav nav-tabs" role="tablist">\n' +
    '                    <li role="presentation" ng-class="{\'active\':$index == 0}" ng-repeat="lang in editFeatureCtrl.language">\n' +
    '                        <a href="javascript:void(0);" data-target="#{{lang.value}}-form" aria-controls="home" role="tab" data-toggle="tab">\n' +
    '                            {{lang.value | translate}}\n' +
    '                        </a>\n' +
    '                    </li>\n' +
    '                </ul>\n' +
    '                <div class="pmd-card">\n' +
    '                    <div class="pmd-card-body">\n' +
    '                        <!-- Tab panes -->\n' +
    '                        <div class="tab-content">\n' +
    '                            <div role="tablist" class="tab-pane" ng-class="{\'active\':$index == 0}" ng-repeat="lang in editFeatureCtrl.language" id="{{lang.value}}-form">\n' +
    '                                <div class="form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                                    <label for="first-name"> {{ lang.value+\'Name\' | translate}} </label>\n' +
    '                                    <input required type="text" class="mat-input form-control" name="titleDictionary{{lang.value+\'Name\'}}" ng-model="editFeatureCtrl.Feature.titleDictionary[lang.key]" ng-minlength="3" ng-maxlength="255">\n' +
    '                                    <div ng-messages="UpdateFeatureForm.titleDictionary{{lang.value+\'Name\'}}.$error">\n' +
    '\n' +
    '                                        <div ng-show="UpdateFeatureForm.titleDictionary{{lang.value+\'Name\'}}.$error.required && !UpdateFeatureForm.titleDictionary{{lang.value+\'Name\'}}.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '                                        <div ng-show="(UpdateFeatureForm.titleDictionary{{lang.value+\'Name\'}}.$error.minlength || UpdateFeatureForm.titleDictionary{{lang.value+\'Name\'}}.$error.maxlength) && !UpdateFeatureForm.titleDictionary{{lang.value+\'Name\'}}.$error.required">{{\'NameLengthError255\' | translate}}</div>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <div class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '\n' +
    '                <input id="file" name="file" style="display: none;" onchange="angular.element(this).scope().AddFile(this.files)" type="file">\n' +
    '                <button class="btn btn-primary editable-table-button btn-xs btn-with-icon" ng-click="editFeatureCtrl.LoadUploadImages()">{{\'AddImageBtn\' |translate}}</button>\n' +
    '\n' +
    '                <br>\n' +
    '                <div> \n' +
    '                    <img ng-src="{{editFeatureCtrl.Feature.icon}}" style="max-height: 286px;max-width: 286px;">\n' +
    '\n' +
    '                    <!-- <td>\n' +
    '                        <i class="material-icons pmd-md deleteButton cursorPointer font25" style="font-size: 20px;color: grey;cursor: pointer;" ng-click="editFeatureCtrl.removeFeatureFile($index)">delete</i>\n' +
    '                    </td> -->\n' +
    '\n' +
    '\n' +
    '                </div>\n' +
    '                <br> \n' +
    '                 <div >\n' +
    '                    <table>\n' +
    '                        <tbody>\n' +
    '                            <tr ng-repeat="file in editFeatureCtrl.files">\n' +
    '                                <td>\n' +
    '                                    {{file.name}}\n' +
    '                                </td>\n' +
    '                                <td>\n' +
    '                                    <i class="material-icons pmd-md deleteButton cursorPointer font25" style="font-size: 20px;color: grey;cursor: pointer;" ng-click="editFeatureCtrl.removeFile($index)">delete</i>\n' +
    '                                </td>\n' +
    '                            </tr>\n' +
    '                        </tbody>\n' +
    '                    </table>\n' +
    '\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </form>\n' +
    '    </div>\n' +
    '    <div class="pmd-modal-action text-right">\n' +
    '        <button ng-disabled="UpdateFeatureForm.$invalid || editFeatureCtrl.CheckImages.length == 0" class="btn pmd-ripple-effect btn-primary" type="button" ng-click="editFeatureCtrl.UpdateFeature()">{{\'saveChangesBtn\' | translate}}</button>\n' +
    '        <button class="btn pmd-ripple-effect btn-default" type="button" ng-click="editFeatureCtrl.Close()">{{\'DiscardBtn\' | translate}}</button>\n' +
    '    </div>\n' +
    '</div>\n' +
    '\n' +
    '');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/Feature/templates/new.html',
    '<div class="modal-content">\n' +
    '    <div class="modal-header bordered">\n' +
    '        <h2 class="pmd-card-title-text">{{\'NewFeature\' | translate}}</h2>\n' +
    '    </div>\n' +
    '    <div class="modal-body">\n' +
    '        <form class="form-horizontal" name="newFeatureForm">\n' +
    '            <div>\n' +
    '                <!-- Nav tabs -->\n' +
    '                <ul class="nav nav-tabs" role="tablist">\n' +
    '                    <li role="presentation" ng-class="{\'active\':$index == 0}"\n' +
    '                        ng-repeat="lang in newFeatureCtrl.language">\n' +
    '                        <a href="javascript:void(0);" data-target="#{{lang.value}}-form" aria-controls="home" role="tab"\n' +
    '                            data-toggle="tab">\n' +
    '                            {{lang.value | translate}}\n' +
    '                        </a>\n' +
    '                    </li>\n' +
    '                </ul>\n' +
    '                <div class="pmd-card">\n' +
    '                    <div class="pmd-card-body">\n' +
    '                        <!-- Tab panes -->\n' +
    '                        <div class="tab-content">\n' +
    '                            <div role="tablist" class="tab-pane" ng-class="{\'active\':$index == 0}"\n' +
    '                                ng-repeat="lang in newFeatureCtrl.language" id="{{lang.value}}-form">\n' +
    '                                <div class="form-group pmd-textfield pmd-textfield-floating-label">\n' +
    '                                    <label for="first-name"> {{ lang.value+\'Name\' | translate}} </label>\n' +
    '                                    <input required type="text" class="mat-input form-control"\n' +
    '                                        name="titleDictionary{{lang.value+\'Name\'}}"\n' +
    '                                        ng-model="newFeatureCtrl.titleDictionary[lang.key]" ng-minlength="3"\n' +
    '                                        ng-maxlength="255">\n' +
    '                                    <div ng-messages="newFeatureForm.titleDictionary{{lang.value+\'Name\'}}.$error">\n' +
    '\n' +
    '                                        <div\n' +
    '                                            ng-show="newFeatureForm.titleDictionary{{lang.value+\'Name\'}}.$error.required && !newFeatureForm.titleDictionary{{lang.value+\'Name\'}}.$pristine">\n' +
    '                                            {{\'requiredErr\' | translate}}</div>\n' +
    '                                        <div\n' +
    '                                            ng-show="(newFeatureForm.titleDictionary{{lang.value+\'Name\'}}.$error.minlength || newFeatureForm.titleDictionary{{lang.value+\'Name\'}}.$error.maxlength) && !newFeatureForm.titleDictionary{{lang.value+\'Name\'}}.$error.required">\n' +
    '                                            {{\'NameLengthError255\' | translate}}</div>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <div class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '\n' +
    '                <input id="file" name="file" style="display: none;"\n' +
    '                    onchange="angular.element(this).scope().AddFile(this.files)" type="file">\n' +
    '                <button class="btn btn-primary editable-table-button btn-xs btn-with-icon"\n' +
    '                    ng-click="newFeatureCtrl.LoadUploadImages()">{{\'AddImageBtn\' |translate}}</button>\n' +
    '\n' +
    '                <br>\n' +
    '                <div>\n' +
    '                    <table>\n' +
    '                        <tbody>\n' +
    '                            <tr ng-repeat="file in newFeatureCtrl.files">\n' +
    '                                <td>\n' +
    '                                    {{file.name}}\n' +
    '                                </td>\n' +
    '                                <td>\n' +
    '                                    <i class="material-icons pmd-md deleteButton cursorPointer font25"\n' +
    '                                        style="font-size: 20px;color: grey;cursor: pointer;"\n' +
    '                                        ng-click="newFeatureCtrl.removeFile($index)">delete</i>\n' +
    '                                </td>\n' +
    '                            </tr>\n' +
    '                        </tbody>\n' +
    '                    </table>\n' +
    '\n' +
    '                </div>\n' +
    '            </div>\n' +
    '\n' +
    '        </form>\n' +
    '    </div>\n' +
    '    <div class="pmd-modal-action text-right">\n' +
    '        <button ng-disabled="newFeatureForm.$invalid" class="btn pmd-ripple-effect btn-primary" Feature="button"\n' +
    '            ng-click="newFeatureCtrl.AddNewFeature()">{{\'saveChangesBtn\' | translate}}</button>\n' +
    '        <button class="btn pmd-ripple-effect btn-default" Feature="button"\n' +
    '            ng-click="$state.go(\'Feature\');">{{\'DiscardBtn\' | translate}}</button>\n' +
    '    </div>\n' +
    '</div>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/Country/templates/Country.html',
    '\n' +
    '<div>\n' +
    '    <div style="margin-bottom:10px">\n' +
    '        <button ng-click="$state.go(\'newCountry\');" class="btn pmd-ripple-effect btn-primary pmd-z-depth" type="button">{{\'AddNew\' | translate}}</button>\n' +
    '\n' +
    '    </div> \n' +
    '    <div ng-if="CountryList.results.length == 0">\n' +
    '        <span>{{\'NoCountrysAvailable\' | translate}}</span>\n' +
    '    </div>\n' +
    '    <div class="pmd-card pmd-z-depth pmd-card-custom-view" ng-if="CountryList.results.length > 0">\n' +
    '        <div class="table-responsive"></div>\n' +
    '        <table class="table pmd-table table-hover">\n' +
    '            <thead>\n' +
    '                <tr>\n' +
    '                    <th>{{\'Name\' | translate}}</th>\n' +
    '                    <!-- <th>{{\'status\' | translate}}</th> -->\n' +
    '                    <th>{{\'City\' | translate}}</th>\n' +
    '                    <th></th>\n' +
    '                </tr>\n' +
    '            </thead>\n' +
    '            <tbody>\n' +
    '                <tr ng-repeat-start="Country in CountryList.results">\n' +
    '                    <td data-title="Name">{{Country.titleDictionary[selectedLanguage]}}</td>\n' +
    '                    \n' +
    '                    <!-- <td>\n' +
    '                        <p ng-show="Country.isStatic"> Static</p>\n' +
    '                    </td> -->\n' +
    '                    <td>\n' +
    '                        <button ng-click="$state.go(\'newCity\',{countryId: Country.countryId});" class="btn pmd-ripple-effect btn-primary pmd-z-depth" type="button">{{\'AddNewCity\' | translate}}</button>\n' +
    '                        <span href="javascript:void(0);" ng-click="Country.show=!Country.show;CountryCtrl.showMore($event)" ng-show="Country.Cityes.length != 0"\n' +
    '                              class="btn pmd-btn-fab pmd-btn-flat pmd-ripple-effect btn-default btn-sm child-table-expand direct-expand"><i class="material-icons md-dark pmd-sm"></i></span>\n' +
    '                    </td>\n' +
    '                   \n' +
    '                    <td width="30%" ng-show="!Country.isStatic">\n' +
    '                        <i class="material-icons md-dark pmd-md cursorPointer font25" ng-click="$state.go(\'editCountry\',{countryId: Country.countryId});">mode_edit</i>\n' +
    '                    </td>\n' +
    '                </tr>\n' +
    '                <tr ng-repeat-end ng-show="Country.show">\n' +
    '                    <td>\n' +
    '                        <table class="table pmd-table table-hover">\n' +
    '                            <thead>\n' +
    '                                <tr>\n' +
    '                                    <th>{{\'Name\' | translate}}</th>\n' +
    '                                    <!-- <th>{{\'status\' | translate}}</th> -->\n' +
    '                                    <th></th>\n' +
    '                                </tr>\n' +
    '                            </thead>\n' +
    '                            <tbody>\n' +
    '                                <tr ng-repeat="City in Country.cityes">\n' +
    '                                    <td data-title="Name">{{City.titleDictionary[selectedLanguage]}}</td> \n' +
    '                                    <!-- <td>\n' +
    '                                        <p ng-show="City.isStatic"> Static</p>\n' +
    '                                    </td> -->\n' +
    '                                    <td width="30%" ng-show="!City.isStatic">\n' +
    '                                        <i class="material-icons md-dark pmd-md cursorPointer font25" ng-click="$state.go(\'editCity\',{cityId: City.cityId});">mode_edit</i>\n' +
    '                                    </td>\n' +
    '                                </tr>\n' +
    '                            </tbody>\n' +
    '                        </table>\n' +
    '                    </td>\n' +
    '                </tr>\n' +
    '            </tbody>\n' +
    '        </table>\n' +
    '    </div>\n' +
    '    <div style="text-align:center;direction: ltr" paging page="1" page-size="10" total="totalCount" paging-action="changePage(page)"\n' +
    '         flex="nogrow" show-prev-next="true" show-first-last="true" hide-if-empty="true" disabled-class="hide">\n' +
    '    </div>\n' +
    '</div>\n' +
    '');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/Country/templates/edit.html',
    '<div class="modal-content">\n' +
    '	<div class="modal-header bordered">\n' +
    '		<h2 class="pmd-card-title-text">{{\'Country\' | translate}}</h2>\n' +
    '	</div>\n' +
    '	<div class="modal-body">\n' +
    '		<form class="form-horizontal" name="editTypeForm"> \n' +
    '                <div> \n' +
    '                    <!-- Nav tabs -->\n' +
    '                    <ul class="nav nav-tabs" role="tablist">\n' +
    '                        <li role="presentation" ng-class="{\'active\':$index == 0}" ng-repeat="lang in editCountryCtrl.language">\n' +
    '                            <a href="javascript:void(0);" data-target="#{{lang.value}}-form" aria-controls="home" role="tab" data-toggle="tab">\n' +
    '                                {{lang.value | translate}}\n' +
    '                            </a>\n' +
    '                        </li> \n' +
    '                    </ul>\n' +
    '                    <div class="pmd-card">\n' +
    '                        <div class="pmd-card-body">\n' +
    '                            <!-- Tab panes -->\n' +
    '                            <div class="tab-content">\n' +
    '                                <div role="tablist" class="tab-pane" ng-class="{\'active\':$index == 0}" ng-repeat="lang in editCountryCtrl.language" id="{{lang.value}}-form">\n' +
    '                                    <div class="form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                                        <label for="first-name"> {{ lang.value+\'Name\' | translate}} </label>\n' +
    '                                        <input required type="text" class="mat-input form-control" name="titleDictionary{{lang.value+\'Name\'}}" ng-model="editCountryCtrl.Country.titleDictionary[lang.key]" ng-minlength="3" ng-maxlength="255">\n' +
    '                                        <div ng-messages="editTypeForm.titleDictionary{{lang.value+\'Name\'}}.$error" >\n' +
    '                                            \n' +
    '                                            <div ng-show="editTypeForm.titleDictionary{{lang.value+\'Name\'}}.$error.required && !editTypeForm.titleDictionary{{lang.value+\'Name\'}}.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '                                            <div ng-show="(editTypeForm.titleDictionary{{lang.value+\'Name\'}}.$error.minlength || editTypeForm.titleDictionary{{lang.value+\'Name\'}}.$error.maxlength) && !editTypeForm.titleDictionary{{lang.value+\'Name\'}}.$error.required">{{\'NameLengthError255\' | translate}}</div>\n' +
    '                                        </div>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </div> \n' +
    '                        </div>\n' +
    '\n' +
    '                   \n' +
    '                    </div>\n' +
    '                </div> \n' +
    ' \n' +
    '		</form>\n' +
    '	</div>\n' +
    '	<div class="pmd-modal-action text-right">\n' +
    '		<button ng-disabled="editTypeForm.$invalid" class="btn pmd-ripple-effect btn-primary" type="button" ng-click="editCountryCtrl.UpdateCountry()">{{\'saveChangesBtn\' | translate}}</button>\n' +
    '		<button class="btn pmd-ripple-effect btn-default" type="button" ng-click="editCountryCtrl.Close()">{{\'DiscardBtn\' | translate}}</button>\n' +
    '	</div>\n' +
    '</div>\n' +
    '\n' +
    '	\n' +
    '');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/Country/templates/new.html',
    '<div class="modal-content">\n' +
    '    <div class="modal-header bordered">\n' +
    '        <h2 class="pmd-card-title-text">{{\'NewCountry\' | translate}}</h2>\n' +
    '    </div>\n' +
    '    <div class="modal-body">\n' +
    '        <form class="form-horizontal" name="newCountryForm"> \n' +
    '            <div> \n' +
    '                <!-- Nav tabs -->\n' +
    '                <ul class="nav nav-tabs" role="tablist">\n' +
    '                    <li role="presentation" ng-class="{\'active\':$index == 0}" ng-repeat="lang in newCountryCtrl.language">\n' +
    '                        <a href="javascript:void(0);" data-target="#{{lang.value}}-form" aria-controls="home" role="tab" data-toggle="tab">\n' +
    '                            {{lang.value | translate}}\n' +
    '                        </a>\n' +
    '                    </li> \n' +
    '                </ul>\n' +
    '                <div class="pmd-card">\n' +
    '                    <div class="pmd-card-body">\n' +
    '                        <!-- Tab panes -->\n' +
    '                        <div class="tab-content">\n' +
    '                            <div role="tablist" class="tab-pane" ng-class="{\'active\':$index == 0}" ng-repeat="lang in newCountryCtrl.language" id="{{lang.value}}-form">\n' +
    '                                <div class="form-group pmd-textfield pmd-textfield-floating-label">\n' +
    '                                    <label for="first-name"> {{ lang.value+\'Name\' | translate}} </label>\n' +
    '                                    <input required Country="text" class="mat-input form-control" name="titleDictionary{{lang.value+\'Name\'}}" ng-model="newCountryCtrl.titleDictionary[lang.key]" ng-minlength="3" ng-maxlength="255">\n' +
    '                                    <div ng-messages="newCountryForm.titleDictionary{{lang.value+\'Name\'}}.$error" >\n' +
    '										\n' +
    '                                        <div ng-show="newCountryForm.titleDictionary{{lang.value+\'Name\'}}.$error.required && !newCountryForm.titleDictionary{{lang.value+\'Name\'}}.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '                                        <div ng-show="(newCountryForm.titleDictionary{{lang.value+\'Name\'}}.$error.minlength || newCountryForm.titleDictionary{{lang.value+\'Name\'}}.$error.maxlength) && !newCountryForm.titleDictionary{{lang.value+\'Name\'}}.$error.required">{{\'NameLengthError255\' | translate}}</div>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div> \n' +
    '        </form>\n' +
    '    </div>\n' +
    '    <div class="pmd-modal-action text-right">\n' +
    '        <button ng-disabled="newCountryForm.$invalid" class="btn pmd-ripple-effect btn-primary" Country="button" ng-click="newCountryCtrl.AddNewCountry()">{{\'saveChangesBtn\' | translate}}</button>\n' +
    '        <button class="btn pmd-ripple-effect btn-default" Country="button" ng-click="$state.go(\'Country\');">{{\'DiscardBtn\' | translate}}</button>\n' +
    '    </div>\n' +
    '</div>\n' +
    '');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/Hotel/templates/Hotel.html',
    '\n' +
    '<div>\n' +
    '    <div style="margin-bottom:10px">\n' +
    '        <button ng-click="$state.go(\'newHotel\');" class="btn pmd-ripple-effect btn-primary pmd-z-depth" type="button">{{\'AddNew\' | translate}}</button>\n' +
    '\n' +
    '    </div> \n' +
    '    <div ng-if="HotelList.results.length == 0">\n' +
    '        <span>{{\'NoHotelsAvailable\' | translate}}</span>\n' +
    '    </div>\n' +
    '    <div class="pmd-card pmd-z-depth pmd-card-custom-view" ng-if="HotelList.results.length > 0">\n' +
    '        <div class="table-responsive"></div>\n' +
    '        <table class="table pmd-table table-hover">\n' +
    '            <thead>\n' +
    '                <tr>\n' +
    '                    <th>{{\'Image\' | translate}}</th> \n' +
    '                    <th>{{\'Name\' | translate}}</th> \n' +
    '                    <th>{{\'Star\' | translate}}</th> \n' +
    '                    <th>{{\'City\' | translate}}</th>\n' +
    '                    <th></th>\n' +
    '                </tr>\n' +
    '            </thead>\n' +
    '            <tbody>\n' +
    '                <tr ng-repeat="Hotel in HotelList.results">\n' +
    '                    <!-- <td data-title="image">\n' +
    '					<img ng-src=\'{{Hotel.imagesURL[0]}}\' style="    width: 77px;" />\n' +
    '\n' +
    '                   </td> -->\n' +
    '                   <td data-title="Image" ><img ng-src="{{Hotel.imagesURL[0]}}"\n' +
    '                     ng-alt="{{Hotel.titleDictionary[selectedLanguage]}}" style="max-height: 200px;max-width: 200px;"/></td>\n' +
    '\n' +
    '                   <td data-title="Name">{{Hotel.titleDictionary[selectedLanguage]}}</td>\n' +
    '                   <td data-title="star">{{Hotel.star}}</td>\n' +
    '                    <td data-title="city">{{Hotel.city.titleDictionary[selectedLanguage]}}</td>\n' +
    '               \n' +
    '                   \n' +
    '                    <td  >\n' +
    '                        <i class="material-icons md-dark pmd-md cursorPointer font25" ng-click="$state.go(\'editHotel\',{hotelId: Hotel.hotelId});">mode_edit</i>\n' +
    '                    </td>\n' +
    '                </tr>\n' +
    '                \n' +
    '            </tbody>\n' +
    '        </table>\n' +
    '    </div>\n' +
    '    <div style="text-align:center;direction: ltr" paging page="1" page-size="10" total="totalCount" paging-action="changePage(page)"\n' +
    '         flex="nogrow" show-prev-next="true" show-first-last="true" hide-if-empty="true" disabled-class="hide">\n' +
    '    </div>\n' +
    '</div>\n' +
    '');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/Hotel/templates/edit.html',
    '<div class="modal-content">\n' +
    '    <div class="modal-header bordered">\n' +
    '        <h2 class="pmd-card-title-text">{{\'UpdateHotel\' | translate}}</h2>\n' +
    '    </div>\n' +
    '    <div class="modal-body">\n' +
    '        <form class="form-horizontal" name="UpdateHotelForm">\n' +
    '            <div>\n' +
    '                <!-- Nav tabs -->\n' +
    '                <ul class="nav nav-tabs" role="tablist">\n' +
    '                    <li role="presentation" ng-class="{\'active\':$index == 0}"\n' +
    '                        ng-repeat="lang in editHotelCtrl.language">\n' +
    '                        <a href="javascript:void(0);" data-target="#{{lang.value}}-form" aria-controls="home" role="tab"\n' +
    '                            data-toggle="tab">\n' +
    '                            {{lang.value | translate}}\n' +
    '                        </a>\n' +
    '                    </li>\n' +
    '                </ul>\n' +
    '                <div class="pmd-card">\n' +
    '                    <div class="pmd-card-body">\n' +
    '                        <!-- Tab panes -->\n' +
    '                        <div class="tab-content">\n' +
    '                            <div role="tablist" class="tab-pane" ng-class="{\'active\':$index == 0}"\n' +
    '                                ng-repeat="lang in editHotelCtrl.language" id="{{lang.value}}-form">\n' +
    '                                <div class="form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                                    <label for="first-name"> {{ lang.value+\'Name\' | translate}} </label>\n' +
    '                                    <input required Hotel="text" class="mat-input form-control"\n' +
    '                                        name="titleDictionary{{lang.value+\'Name\'}}"\n' +
    '                                        ng-model="editHotelCtrl.Hotel.titleDictionary[lang.key]" ng-minlength="3"\n' +
    '                                        ng-maxlength="255">\n' +
    '                                    <div ng-messages="UpdateHotelForm.titleDictionary{{lang.value+\'Name\'}}.$error">\n' +
    '\n' +
    '                                        <div\n' +
    '                                            ng-show="UpdateHotelForm.titleDictionary{{lang.value+\'Name\'}}.$error.required && !UpdateHotelForm.titleDictionary{{lang.value+\'Name\'}}.$pristine">\n' +
    '                                            {{\'requiredErr\' | translate}}</div>\n' +
    '                                        <div\n' +
    '                                            ng-show="(UpdateHotelForm.titleDictionary{{lang.value+\'Name\'}}.$error.minlength || UpdateHotelForm.titleDictionary{{lang.value+\'Name\'}}.$error.maxlength) && !UpdateHotelForm.titleDictionary{{lang.value+\'Name\'}}.$error.required">\n' +
    '                                            {{\'NameLengthError255\' | translate}}</div>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '\n' +
    '            <div>\n' +
    '                <!-- Nav tabs -->\n' +
    '                <ul class="nav nav-tabs" role="tablist">\n' +
    '                    <li role="presentation" ng-class="{\'active\':$index == 0}"\n' +
    '                        ng-repeat="lang in editHotelCtrl.language">\n' +
    '                        <a href="javascript:void(0);" data-target="#{{lang.value}}-desc-form" aria-controls="home"\n' +
    '                            role="tab" data-toggle="tab">\n' +
    '                            {{lang.value | translate}}\n' +
    '                        </a>\n' +
    '                    </li>\n' +
    '                </ul>\n' +
    '                <div class="pmd-card">\n' +
    '                    <div class="pmd-card-body">\n' +
    '                        <!-- Tab panes -->\n' +
    '                        <div class="tab-content">\n' +
    '                            <div role="tablist" class="tab-pane" ng-class="{\'active\':$index == 0}"\n' +
    '                                ng-repeat="lang in editHotelCtrl.language" id="{{lang.value}}-desc-form">\n' +
    '                                <div class="form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                                    <label for="first-name"> {{ lang.value+\'Description\' | translate}} </label>\n' +
    '                                    <textarea required Updates="text" class="mat-input form-control"\n' +
    '                                        name="descriptionDictionary{{lang.value+\'Name\'}}"\n' +
    '                                        ng-model="editHotelCtrl.Hotel.descriptionDictionary[lang.key]" ng-minlength="3"\n' +
    '                                        ng-maxlength="5255"></textarea>\n' +
    '                                    <div\n' +
    '                                        ng-messages="UpdateHotelForm.descriptionDictionary{{lang.value+\'Name\'}}.$error">\n' +
    '\n' +
    '                                        <div\n' +
    '                                            ng-show="UpdateHotelForm.descriptionDictionary{{lang.value+\'Name\'}}.$error.required && !UpdateHotelForm.descriptionDictionary{{lang.value+\'Name\'}}.$pristine">\n' +
    '                                            {{\'requiredErr\' | translate}}</div>\n' +
    '                                        <div\n' +
    '                                            ng-show="(UpdateHotelForm.descriptionDictionary{{lang.value+\'Name\'}}.$error.minlength || UpdateHotelForm.descriptionDictionary{{lang.value+\'Name\'}}.$error.maxlength) && !UpdateHotelForm.descriptionDictionary{{lang.value+\'Name\'}}.$error.required">\n' +
    '                                            {{\'NameLengthError255\' | translate}}</div>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <div class="row">\n' +
    '                <div\n' +
    '                    class="col-md-3 form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '                    <label for="first-name">{{\'Country\' | translate}}</label>\n' +
    '\n' +
    '                    <select required style="width:50% !important"\n' +
    '                        class="form-control select-with-search pmd-select2-tags" ng-change="CountryChange()"\n' +
    '                        ng-model="selectedCountry"\n' +
    '                        ng-options="a as a.titleDictionary[selectedLanguage] for a in CountryList"></select>\n' +
    '                </div>\n' +
    '\n' +
    '                <div\n' +
    '                    class="col-md-3 form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '                    <label for="first-name">{{\'City\' | translate}}</label>\n' +
    '\n' +
    '                    <select required style="width:50% !important"\n' +
    '                        class="form-control select-with-search pmd-select2-tags" ng-change="CityChange()"\n' +
    '                        ng-model="selectedCity"\n' +
    '                        ng-options="a as a.titleDictionary[selectedLanguage] for a in CityList"></select>\n' +
    '                </div>\n' +
    '\n' +
    '\n' +
    '                <div style="margin-right: 50px; width: 150px;"\n' +
    '                    class="col-md-3 form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '                    <label>{{\'Star\' | translate}}</label>\n' +
    '                    <input required type="text" class="mat-input form-control" name="star" numbers-only\n' +
    '                        ng-model="editHotelCtrl.Hotel.star" ng-minlength="1" ng-maxlength="1">\n' +
    '\n' +
    '                    <div ng-messages="UpdateHotelForm.star.$error">\n' +
    '                        <div ng-if="UpdateHotelForm.star.$error.required && !UpdateHotelForm.star.$pristine">\n' +
    '                            {{\'Star Required\' | translate}}</div>\n' +
    '                        <div ng-if="(UpdateHotelForm.star.$error.minlength || UpdateHotelForm.star.$error.maxlength)">\n' +
    '                            {{\'Max 1 number\' | translate}}</div>\n' +
    '                    </div>\n' +
    '\n' +
    '                </div>\n' +
    '                <!-- <div\n' +
    '                    class="col-md-3 form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '                    <label>{{\'Location\' | translate}}</label>\n' +
    '                    <input type="text" class="mat-input form-control" gm-places-autocomplete ng-model="autocomplete"\n' +
    '                        style="width: 300px;" />\n' +
    '                    <input type="text" name="late" required hidden="hidden" ng-model="editHotelCtrl.Hotel.latitude" />\n' +
    '                    <div ng-messages="UpdateHotelForm.late.$error">\n' +
    '                        <div ng-if="UpdateHotelForm.late.$error.required && !UpdateHotelForm.late.$pristine">\n' +
    '                            {{\'Location Required\' | translate}}</div>\n' +
    '                    </div>\n' +
    '                </div> -->\n' +
    '\n' +
    '\n' +
    '\n' +
    '            </div>\n' +
    '\n' +
    '\n' +
    '\n' +
    '            <div class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '                <label> {{ \'Features\' | translate}} </label>\n' +
    '                <select required style="width:100% !important" class="form-control select-with-search pmd-select2-tags"\n' +
    '                    multiple ng-model="editHotelCtrl.selectedHotelFeatures"\n' +
    '                    ng-options="feature as feature.titleDictionary[selectedLanguage] for feature in FeatureList"></select>\n' +
    '\n' +
    '            </div>\n' +
    '            <div class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '\n' +
    '\n' +
    '                <input id="file" name="file" style="display: none;"\n' +
    '                    onchange="angular.element(this).scope().AddFile(this.files)" type="file">\n' +
    '                <button class="btn btn-primary editable-table-button btn-xs btn-with-icon"\n' +
    '                    ng-click="editHotelCtrl.LoadUploadImages()">{{\'AddImageBtn\' |translate}}</button>\n' +
    '\n' +
    '                <br>\n' +
    '                <div>\n' +
    '                    <table>\n' +
    '                        <tbody>\n' +
    '                            <tr ng-repeat="file in editHotelCtrl.Hotel.imagesURL">\n' +
    '                                <td>\n' +
    '                                    <img ng-src="{{file}}" style="max-height: 286px;max-width: 477px;">\n' +
    '                                </td>\n' +
    '                                <!-- <td>\n' +
    '                                        <i class="material-icons pmd-md deleteButton cursorPointer font25" style="font-size: 20px;color: grey;cursor: pointer;" ng-click="editHotelCtrl.removeHotelFile($index)">delete</i>\n' +
    '                                    </td> -->\n' +
    '                            </tr>\n' +
    '                        </tbody>\n' +
    '                    </table>\n' +
    '\n' +
    '                </div>\n' +
    '                <br>\n' +
    '                <div>\n' +
    '                    <table>\n' +
    '                        <tbody>\n' +
    '                            <tr ng-repeat="file in editHotelCtrl.files">\n' +
    '                                <td>\n' +
    '                                    {{file.name}}\n' +
    '                                </td>\n' +
    '                                <td>\n' +
    '                                    <i class="material-icons pmd-md deleteButton cursorPointer font25"\n' +
    '                                        style="font-size: 20px;color: grey;cursor: pointer;"\n' +
    '                                        ng-click="editHotelCtrl.removeFile($index)">delete</i>\n' +
    '                                </td>\n' +
    '                            </tr>\n' +
    '                        </tbody>\n' +
    '                    </table>\n' +
    '\n' +
    '                </div>\n' +
    '            </div>\n' +
    '\n' +
    '        </form>\n' +
    '    </div>\n' +
    '    <div class="pmd-modal-action text-right">\n' +
    '        <button\n' +
    '            ng-disabled="UpdateHotelForm.$invalid || editHotelCtrl.CheckImages.length == 0  || editHotelCtrl.Hotel.latitude  == \'\'"\n' +
    '            class="btn pmd-ripple-effect btn-primary" Hotel="button"\n' +
    '            ng-click="editHotelCtrl.UpdateHotel()">{{\'saveChangesBtn\' | translate}}</button>\n' +
    '        <button class="btn pmd-ripple-effect btn-default" Hotel="button"\n' +
    '            ng-click="$state.go(\'Hotel\');">{{\'DiscardBtn\' | translate}}</button>\n' +
    '    </div>\n' +
    '</div>\n' +
    '\n' +
    '\n' +
    '\n' +
    '\n' +
    '<script type="text/javascript">\n' +
    '    $(document).ready(function () {\n' +
    '        // $(".select-add-tags").select2({\n' +
    '        //     tags: true,\n' +
    '        //     theme: "bootstrap",\n' +
    '        //     insertTag: function (data, tag) { \n' +
    '        //         data.push(tag); \n' +
    '        //     }\n' +
    '        // });\n' +
    '        $(".select-tags").select2({\n' +
    '            tags: false,\n' +
    '            theme: "bootstrap",\n' +
    '        })\n' +
    '\n' +
    '        $(".select-with-search").select2({\n' +
    '            theme: "bootstrap"\n' +
    '        });\n' +
    '    });\n' +
    '</script>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/Hotel/templates/new.html',
    '<div class="modal-content">\n' +
    '    <div class="modal-header bordered">\n' +
    '        <h2 class="pmd-card-title-text">{{\'NewHotel\' | translate}}</h2>\n' +
    '    </div>\n' +
    '    <div class="modal-body">\n' +
    '        <form class="form-horizontal" name="newHotelForm">\n' +
    '            <div>\n' +
    '                <!-- Nav tabs -->\n' +
    '                <ul class="nav nav-tabs" role="tablist">\n' +
    '                    <li role="presentation" ng-class="{\'active\':$index == 0}" ng-repeat="lang in newHotelCtrl.language">\n' +
    '                        <a href="javascript:void(0);" data-target="#{{lang.value}}-form" aria-controls="home" role="tab"\n' +
    '                            data-toggle="tab">\n' +
    '                            {{lang.value | translate}}\n' +
    '                        </a>\n' +
    '                    </li>\n' +
    '                </ul>\n' +
    '                <div class="pmd-card">\n' +
    '                    <div class="pmd-card-body">\n' +
    '                        <!-- Tab panes -->\n' +
    '                        <div class="tab-content">\n' +
    '                            <div role="tablist" class="tab-pane" ng-class="{\'active\':$index == 0}"\n' +
    '                                ng-repeat="lang in newHotelCtrl.language" id="{{lang.value}}-form">\n' +
    '                                <div class="form-group pmd-textfield pmd-textfield-floating-label">\n' +
    '                                    <label for="first-name"> {{ lang.value+\'Name\' | translate}} </label>\n' +
    '                                    <input required Hotel="text" class="mat-input form-control"\n' +
    '                                        name="titleDictionary{{lang.value+\'Name\'}}"\n' +
    '                                        ng-model="newHotelCtrl.titleDictionary[lang.key]" ng-minlength="3"\n' +
    '                                        ng-maxlength="255">\n' +
    '                                    <div ng-messages="newHotelForm.titleDictionary{{lang.value+\'Name\'}}.$error">\n' +
    '\n' +
    '                                        <div\n' +
    '                                            ng-show="newHotelForm.titleDictionary{{lang.value+\'Name\'}}.$error.required && !newHotelForm.titleDictionary{{lang.value+\'Name\'}}.$pristine">\n' +
    '                                            {{\'requiredErr\' | translate}}</div>\n' +
    '                                        <div\n' +
    '                                            ng-show="(newHotelForm.titleDictionary{{lang.value+\'Name\'}}.$error.minlength || newHotelForm.titleDictionary{{lang.value+\'Name\'}}.$error.maxlength) && !newHotelForm.titleDictionary{{lang.value+\'Name\'}}.$error.required">\n' +
    '                                            {{\'NameLengthError255\' | translate}}</div>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '\n' +
    '            <div>\n' +
    '                <!-- Nav tabs -->\n' +
    '                <ul class="nav nav-tabs" role="tablist">\n' +
    '                    <li role="presentation" ng-class="{\'active\':$index == 0}" ng-repeat="lang in newHotelCtrl.language">\n' +
    '                        <a href="javascript:void(0);" data-target="#{{lang.value}}-desc-form" aria-controls="home"\n' +
    '                            role="tab" data-toggle="tab">\n' +
    '                            {{lang.value | translate}}\n' +
    '                        </a>\n' +
    '                    </li>\n' +
    '                </ul>\n' +
    '                <div class="pmd-card">\n' +
    '                    <div class="pmd-card-body">\n' +
    '                        <!-- Tab panes -->\n' +
    '                        <div class="tab-content">\n' +
    '                            <div role="tablist" class="tab-pane" ng-class="{\'active\':$index == 0}"\n' +
    '                                ng-repeat="lang in newHotelCtrl.language" id="{{lang.value}}-desc-form">\n' +
    '                                <div class="form-group pmd-textfield pmd-textfield-floating-label">\n' +
    '                                    <label for="first-name"> {{ lang.value+\'Description\' | translate}} </label>\n' +
    '                                    <textarea required News="text" class="mat-input form-control"\n' +
    '                                        name="descriptionDictionary{{lang.value+\'Name\'}}"\n' +
    '                                        ng-model="newHotelCtrl.descriptionDictionary[lang.key]" ng-minlength="3"\n' +
    '                                        ng-maxlength="5255"></textarea>\n' +
    '                                    <div ng-messages="newHotelForm.descriptionDictionary{{lang.value+\'Name\'}}.$error">\n' +
    '\n' +
    '                                        <div\n' +
    '                                            ng-show="newHotelForm.descriptionDictionary{{lang.value+\'Name\'}}.$error.required && !newHotelForm.descriptionDictionary{{lang.value+\'Name\'}}.$pristine">\n' +
    '                                            {{\'requiredErr\' | translate}}</div>\n' +
    '                                        <div\n' +
    '                                            ng-show="(newHotelForm.descriptionDictionary{{lang.value+\'Name\'}}.$error.minlength || newHotelForm.descriptionDictionary{{lang.value+\'Name\'}}.$error.maxlength) && !newHotelForm.descriptionDictionary{{lang.value+\'Name\'}}.$error.required">\n' +
    '                                            {{\'NameLengthError255\' | translate}}</div>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <div class="row">\n' +
    '                <div\n' +
    '                    class="col-md-3 form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '                    <label for="first-name">{{\'Country\' | translate}}</label>\n' +
    '\n' +
    '                    <select required style="width:50% !important"\n' +
    '                        class="form-control select-with-search pmd-select2-tags" ng-change="CountryChange()"\n' +
    '                        ng-model="selectedCountry"\n' +
    '                        ng-options="a as a.titleDictionary[selectedLanguage] for a in CountryList"></select>\n' +
    '                </div>\n' +
    '\n' +
    '                <div\n' +
    '                    class="col-md-3 form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '                    <label for="first-name">{{\'City\' | translate}}</label>\n' +
    '\n' +
    '                    <select required style="width:50% !important"\n' +
    '                        class="form-control select-with-search pmd-select2-tags" ng-change="CityChange()"\n' +
    '                        ng-model="selectedCity"\n' +
    '                        ng-options="a as a.titleDictionary[selectedLanguage] for a in CityList"></select>\n' +
    '                </div>\n' +
    '\n' +
    '\n' +
    '                <div style="margin-right: 50px; width: 150px;"\n' +
    '                    class="col-md-3 form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '                    <label>{{\'Star\' | translate}}</label>\n' +
    '                    <input required type="text" class="mat-input form-control" name="star" numbers-only\n' +
    '                        ng-model="newHotelCtrl.star" ng-minlength="1" ng-maxlength="1">\n' +
    '\n' +
    '                    <div ng-messages="newHotelForm.phone.$error">\n' +
    '                        <div ng-if="newHotelForm.phone.$error.required && !newHotelForm.phone.$pristine">\n' +
    '                            {{\'Star Required\' | translate}}</div>\n' +
    '                        <div ng-if="(newHotelForm.phone.$error.minlength || newHotelForm.phone.$error.maxlength)">\n' +
    '                            {{\'Max 1 number\' | translate}}</div>\n' +
    '                    </div>\n' +
    '\n' +
    '                </div>\n' +
    '                <!-- <div\n' +
    '                    class="col-md-3 form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '                    <label>{{\'Location\' | translate}}</label>\n' +
    '                    <input type="text" class="mat-input form-control" gm-places-autocomplete ng-model="autocomplete"\n' +
    '                        style="width: 300px;" />\n' +
    '                    <input type="text" name="late" required hidden="hidden" ng-model="newHotelCtrl.latitude" />\n' +
    '                    <div ng-messages="newHotelForm.late.$error">\n' +
    '                        <div ng-if="newHotelForm.late.$error.required && !newHotelForm.late.$pristine">\n' +
    '                            {{\'Location Required\' | translate}}</div>\n' +
    '                    </div>\n' +
    '                </div> -->\n' +
    '\n' +
    '\n' +
    '\n' +
    '            </div>\n' +
    '\n' +
    '\n' +
    '            <div class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '                <label> {{ \'Features\' | translate}} </label>\n' +
    '                <select required style="width:100% !important" class="form-control select-with-search pmd-select2-tags"\n' +
    '                    multiple ng-model="newHotelCtrl.selectedfeatures"\n' +
    '                    ng-options="feature as feature.titleDictionary[selectedLanguage] for feature in FeatureList"></select>\n' +
    '\n' +
    '            </div>\n' +
    '\n' +
    '\n' +
    '            <div class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '\n' +
    '                <input id="file" name="file" style="display: none;"\n' +
    '                    onchange="angular.element(this).scope().AddFile(this.files)" type="file">\n' +
    '                <button class="btn btn-primary editable-table-button btn-xs btn-with-icon"\n' +
    '                    ng-click="newHotelCtrl.LoadUploadImages()">{{\'AddImageBtn\' |translate}}</button>\n' +
    '\n' +
    '                <br>\n' +
    '                <div>\n' +
    '                    <table>\n' +
    '                        <tbody>\n' +
    '                            <tr ng-repeat="file in newHotelCtrl.files">\n' +
    '                                <td>\n' +
    '                                    {{file.name}}\n' +
    '                                </td>\n' +
    '                                <td>\n' +
    '                                    <i class="material-icons pmd-md deleteButton cursorPointer font25"\n' +
    '                                        style="font-size: 20px;color: grey;cursor: pointer;"\n' +
    '                                        ng-click="newHotelCtrl.removeFile($index)">delete</i>\n' +
    '                                </td>\n' +
    '                            </tr>\n' +
    '                        </tbody>\n' +
    '                    </table>\n' +
    '\n' +
    '                </div>\n' +
    '            </div>\n' +
    '\n' +
    '        </form>\n' +
    '    </div>\n' +
    '    <div class="pmd-modal-action text-right">\n' +
    '        <!-- <button ng-disabled="newHotelForm.$invalid || newHotelCtrl.files.length == 0 || newHotelCtrl.latitude  == \'\'" -->\n' +
    '        <button ng-disabled="newHotelForm.$invalid || newHotelCtrl.files.length == 0 "\n' +
    '            class="btn pmd-ripple-effect btn-primary" Hotel="button"\n' +
    '            ng-click="newHotelCtrl.AddNewHotel()">{{\'saveChangesBtn\' | translate}}</button>\n' +
    '        <button class="btn pmd-ripple-effect btn-default" Hotel="button"\n' +
    '            ng-click="$state.go(\'Hotel\');">{{\'DiscardBtn\' | translate}}</button>\n' +
    '    </div>\n' +
    '</div>\n' +
    ' \n' +
    '<script type="text/javascript">\n' +
    '    $(document).ready(function () {\n' +
    '        // $(".select-add-tags").select2({\n' +
    '        //     tags: true,\n' +
    '        //     theme: "bootstrap",\n' +
    '        //     insertTag: function (data, tag) { \n' +
    '        //         data.push(tag); \n' +
    '        //     }\n' +
    '        // });\n' +
    '        $(".select-tags").select2({\n' +
    '            tags: false,\n' +
    '            theme: "bootstrap",\n' +
    '        })\n' +
    '\n' +
    '        $(".select-with-search").select2({\n' +
    '            theme: "bootstrap"\n' +
    '        });\n' +
    '    });\n' +
    '</script>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/Owner/templates/Owner.html',
    '\n' +
    '<div>\n' +
    '    <div style="margin-bottom:10px">\n' +
    '        <button ng-click="$state.go(\'newOwner\');" class="btn pmd-ripple-effect btn-primary pmd-z-depth" type="button">{{\'AddNew\' | translate}}</button>\n' +
    '\n' +
    '    </div> \n' +
    '    <div ng-if="OwnerList.results.length == 0">\n' +
    '        <span>{{\'NoOwnersAvailable\' | translate}}</span>\n' +
    '    </div>\n' +
    '    <div class="pmd-card pmd-z-depth pmd-card-custom-view" ng-if="OwnerList.results.length > 0">\n' +
    '        <div class="table-responsive"></div>\n' +
    '        <table class="table pmd-table table-hover">\n' +
    '            <thead>\n' +
    '                <tr>\n' +
    '                    <th>{{\'Name\' | translate}}</th>\n' +
    '                    <th>{{\'Postion\' | translate}}</th>\n' +
    '                    <th>{{\'Description\' | translate}}</th>\n' +
    '\n' +
    '                    <!-- <th>{{\'status\' | translate}}</th> --> \n' +
    '                    <th></th>\n' +
    '                </tr>\n' +
    '            </thead>\n' +
    '            <tbody>\n' +
    '                <tr ng-repeat="Owner in OwnerList.results">\n' +
    '                    <td data-title="Name">{{Owner.titleDictionary[selectedLanguage]}}</td>\n' +
    '                    <td data-title="Postion">{{Owner.postionDictionary[selectedLanguage]  | limitTo:20}}</td>  \n' +
    '                    <td data-title="Description">{{Owner.descriptionDictionary[selectedLanguage]  | limitTo:20}}</td>  \n' +
    '                    \n' +
    '                    <!-- <td>\n' +
    '                        <p ng-show="Owner.isStatic"> Static</p>\n' +
    '                    </td> --> \n' +
    '                    <td width="30%" ng-show="!Owner.isStatic">\n' +
    '                        <i class="material-icons md-dark pmd-md cursorPointer font25" ng-click="$state.go(\'editOwner\',{ownerId: Owner.ownerId});">mode_edit</i>\n' +
    '                    </td>\n' +
    '                </tr>\n' +
    '            </tbody>\n' +
    '        </table>\n' +
    '    </div>\n' +
    '    <div style="text-align:center;direction: ltr" paging page="1" page-size="10" total="totalCount" paging-action="changePage(page)"\n' +
    '         flex="nogrow" show-prev-next="true" show-first-last="true" hide-if-empty="true" disabled-class="hide">\n' +
    '    </div>\n' +
    '</div>\n' +
    '');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/Owner/templates/edit.html',
    '<div class="modal-content">\n' +
    '	<div class="modal-header bordered">\n' +
    '		<h2 class="pmd-card-title-text">{{\'Owner\' | translate}}</h2>\n' +
    '	</div>\n' +
    '	<div class="modal-body">\n' +
    '		<form class="form-horizontal" name="editTypeForm"> \n' +
    '                <div> \n' +
    '                    <!-- Nav tabs -->\n' +
    '                    <ul class="nav nav-tabs" role="tablist">\n' +
    '                        <li role="presentation" ng-class="{\'active\':$index == 0}" ng-repeat="lang in editOwnerCtrl.language">\n' +
    '                            <a href="javascript:void(0);" data-target="#{{lang.value}}-form" aria-controls="home" role="tab" data-toggle="tab">\n' +
    '                                {{lang.value | translate}}\n' +
    '                            </a>\n' +
    '                        </li> \n' +
    '                    </ul>\n' +
    '                    <div class="pmd-card">\n' +
    '                        <div class="pmd-card-body">\n' +
    '                            <!-- Tab panes -->\n' +
    '                            <div class="tab-content">\n' +
    '                                <div role="tablist" class="tab-pane" ng-class="{\'active\':$index == 0}" ng-repeat="lang in editOwnerCtrl.language" id="{{lang.value}}-form">\n' +
    '                                    <div class="form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                                        <label for="first-name"> {{ lang.value+\'Name\' | translate}} </label>\n' +
    '                                        <input required type="text" class="mat-input form-control" name="titleDictionary{{lang.value+\'Name\'}}" ng-model="editOwnerCtrl.Owner.titleDictionary[lang.key]" ng-minlength="3" ng-maxlength="255">\n' +
    '                                        <div ng-messages="editTypeForm.titleDictionary{{lang.value+\'Name\'}}.$error" >\n' +
    '                                            \n' +
    '                                            <div ng-show="editTypeForm.titleDictionary{{lang.value+\'Name\'}}.$error.required && !editTypeForm.titleDictionary{{lang.value+\'Name\'}}.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '                                            <div ng-show="(editTypeForm.titleDictionary{{lang.value+\'Name\'}}.$error.minlength || editTypeForm.titleDictionary{{lang.value+\'Name\'}}.$error.maxlength) && !editTypeForm.titleDictionary{{lang.value+\'Name\'}}.$error.required">{{\'NameLengthError255\' | translate}}</div>\n' +
    '                                        </div>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </div> \n' +
    '                        </div>\n' +
    '\n' +
    '                   \n' +
    '                    </div>\n' +
    '                </div> \n' +
    '                <div> \n' +
    '                    <!-- Nav tabs -->\n' +
    '                    <ul class="nav nav-tabs" role="tablist">\n' +
    '                        <li role="presentation" ng-class="{\'active\':$index == 0}" ng-repeat="lang in editOwnerCtrl.language">\n' +
    '                            <a href="javascript:void(0);" data-target="#{{lang.value}}-postion-form" aria-controls="home" role="tab" data-toggle="tab">\n' +
    '                                {{lang.value | translate}}\n' +
    '                            </a>\n' +
    '                        </li> \n' +
    '                    </ul>\n' +
    '                    <div class="pmd-card">\n' +
    '                        <div class="pmd-card-body">\n' +
    '                            <!-- Tab panes -->\n' +
    '                            <div class="tab-content">\n' +
    '                                <div role="tablist" class="tab-pane" ng-class="{\'active\':$index == 0}" ng-repeat="lang in editOwnerCtrl.language" id="{{lang.value}}-postion-form">\n' +
    '                                    <div class="form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                                        <label for="first-name"> {{lang.value+\' Postion\' | translate}} </label>\n' +
    '                                        <input required type="text" class="mat-input form-control" name="postionDictionary{{lang.value+\'Name\'}}" ng-model="editOwnerCtrl.Owner.postionDictionary[lang.key]" ng-minlength="3" ng-maxlength="255">\n' +
    '                                        <div ng-messages="editTypeForm.postionDictionary{{lang.value+\'Name\'}}.$error" >\n' +
    '                                            \n' +
    '                                            <div ng-show="editTypeForm.postionDictionary{{lang.value+\'Name\'}}.$error.required && !editTypeForm.postionDictionary{{lang.value+\'Name\'}}.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '                                            <div ng-show="(editTypeForm.postionDictionary{{lang.value+\'Name\'}}.$error.minlength || editTypeForm.postionDictionary{{lang.value+\'Name\'}}.$error.maxlength) && !editTypeForm.postionDictionary{{lang.value+\'Name\'}}.$error.required">{{\'NameLengthError255\' | translate}}</div>\n' +
    '                                        </div>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </div> \n' +
    '                        </div>\n' +
    '\n' +
    '                   \n' +
    '                    </div>\n' +
    '                </div> \n' +
    ' \n' +
    '\n' +
    '                <div> \n' +
    '                    <!-- Nav tabs -->\n' +
    '                    <ul class="nav nav-tabs" role="tablist">\n' +
    '                        <li role="presentation" ng-class="{\'active\':$index == 0}" ng-repeat="lang in editOwnerCtrl.language">\n' +
    '                            <a href="javascript:void(0);" data-target="#{{lang.value}}-desc-form" aria-controls="home" role="tab" data-toggle="tab">\n' +
    '                                {{lang.value | translate}}\n' +
    '                            </a>\n' +
    '                        </li> \n' +
    '                    </ul>\n' +
    '                    <div class="pmd-card">\n' +
    '                        <div class="pmd-card-body">\n' +
    '                            <!-- Tab panes -->\n' +
    '                            <div class="tab-content">\n' +
    '                                <div role="tablist" class="tab-pane" ng-class="{\'active\':$index == 0}" ng-repeat="lang in editOwnerCtrl.language" id="{{lang.value}}-desc-form">\n' +
    '                                    <div class="form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                                        <label for="first-name"> {{ lang.value+\' Description\' | translate}} </label>\n' +
    '                                        <textarea required type="text" class="mat-input form-control"\n' +
    '                                         name="descriptionDictionary{{lang.value+\'Name\'}}" \n' +
    '                                         ng-model="editOwnerCtrl.Owner.descriptionDictionary[lang.key]"\n' +
    '                                          ng-minlength="3" ng-maxlength="255"></textarea>\n' +
    '                                        <div ng-messages="editTypeForm.descriptionDictionary{{lang.value+\'Name\'}}.$error" >\n' +
    '                                            \n' +
    '                                            <div ng-show="editTypeForm.descriptionDictionary{{lang.value+\'Name\'}}.$error.required && !editTypeForm.descriptionDictionary{{lang.value+\'Name\'}}.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '                                            <div ng-show="(editTypeForm.descriptionDictionary{{lang.value+\'Name\'}}.$error.minlength || editTypeForm.descriptionDictionary{{lang.value+\'Name\'}}.$error.maxlength) && !editTypeForm.descriptionDictionary{{lang.value+\'Name\'}}.$error.required">{{\'NameLengthError255\' | translate}}</div>\n' +
    '                                        </div>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </div> \n' +
    '                        </div>\n' +
    '\n' +
    '                   \n' +
    '                    </div>\n' +
    '                </div> \n' +
    ' \n' +
    '\n' +
    '		</form>\n' +
    '	</div>\n' +
    '	<div class="pmd-modal-action text-right">\n' +
    '		<button ng-disabled="editTypeForm.$invalid" class="btn pmd-ripple-effect btn-primary" type="button" ng-click="editOwnerCtrl.UpdateOwner()">{{\'saveChangesBtn\' | translate}}</button>\n' +
    '		<button class="btn pmd-ripple-effect btn-default" type="button" ng-click="editOwnerCtrl.Close()">{{\'DiscardBtn\' | translate}}</button>\n' +
    '	</div>\n' +
    '</div>\n' +
    '\n' +
    '	\n' +
    '');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/Owner/templates/new.html',
    '<div class="modal-content">\n' +
    '    <div class="modal-header bordered">\n' +
    '        <h2 class="pmd-card-title-text">{{\'NewOwner\' | translate}}</h2>\n' +
    '    </div>\n' +
    '    <div class="modal-body">\n' +
    '        <form class="form-horizontal" name="newOwnerForm"> \n' +
    '            <div> \n' +
    '                <!-- Nav tabs -->\n' +
    '                <ul class="nav nav-tabs" role="tablist">\n' +
    '                    <li role="presentation" ng-class="{\'active\':$index == 0}" ng-repeat="lang in newOwnerCtrl.language">\n' +
    '                        <a href="javascript:void(0);" data-target="#{{lang.value}}-form" aria-controls="home" role="tab" data-toggle="tab">\n' +
    '                            {{lang.value | translate}}\n' +
    '                        </a>\n' +
    '                    </li> \n' +
    '                </ul>\n' +
    '                <div class="pmd-card">\n' +
    '                    <div class="pmd-card-body">\n' +
    '                        <!-- Tab panes -->\n' +
    '                        <div class="tab-content">\n' +
    '                            <div role="tablist" class="tab-pane" ng-class="{\'active\':$index == 0}" ng-repeat="lang in newOwnerCtrl.language" id="{{lang.value}}-form">\n' +
    '                                <div class="form-group pmd-textfield pmd-textfield-floating-label">\n' +
    '                                    <label for="first-name"> {{ lang.value+\'Name\' | translate}} </label>\n' +
    '                                    <input required Owner="text" class="mat-input form-control" name="titleDictionary{{lang.value+\'Name\'}}" ng-model="newOwnerCtrl.titleDictionary[lang.key]" ng-minlength="3" ng-maxlength="255">\n' +
    '                                    <div ng-messages="newOwnerForm.titleDictionary{{lang.value+\'Name\'}}.$error" >\n' +
    '										\n' +
    '                                        <div ng-show="newOwnerForm.titleDictionary{{lang.value+\'Name\'}}.$error.required && !newOwnerForm.titleDictionary{{lang.value+\'Name\'}}.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '                                        <div ng-show="(newOwnerForm.titleDictionary{{lang.value+\'Name\'}}.$error.minlength || newOwnerForm.titleDictionary{{lang.value+\'Name\'}}.$error.maxlength) && !newOwnerForm.titleDictionary{{lang.value+\'Name\'}}.$error.required">{{\'NameLengthError255\' | translate}}</div>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div> \n' +
    '\n' +
    '            <div> \n' +
    '                <!-- Nav tabs -->\n' +
    '                <ul class="nav nav-tabs" role="tablist">\n' +
    '                    <li role="presentation" ng-class="{\'active\':$index == 0}" ng-repeat="lang in newOwnerCtrl.language">\n' +
    '                        <a href="javascript:void(0);" data-target="#{{lang.value}}-postion-form" aria-controls="home" role="tab" data-toggle="tab">\n' +
    '                            {{lang.value | translate}}\n' +
    '                        </a>\n' +
    '                    </li> \n' +
    '                </ul>\n' +
    '                <div class="pmd-card">\n' +
    '                    <div class="pmd-card-body">\n' +
    '                        <!-- Tab panes -->\n' +
    '                        <div class="tab-content">\n' +
    '                            <div role="tablist" class="tab-pane" ng-class="{\'active\':$index == 0}" ng-repeat="lang in newOwnerCtrl.language" id="{{lang.value}}-postion-form">\n' +
    '                                <div class="form-group pmd-textfield pmd-textfield-floating-label">\n' +
    '                                    <label for="first-name"> {{ lang.value+\' Postion\' | translate}} </label>\n' +
    '                                    <input required Owner="text" class="mat-input form-control" name="postionDictionary{{lang.value+\'Name\'}}" ng-model="newOwnerCtrl.postionDictionary[lang.key]" ng-minlength="3" ng-maxlength="255">\n' +
    '                                    <div ng-messages="newOwnerForm.postionDictionary{{lang.value+\'Name\'}}.$error" >\n' +
    '										\n' +
    '                                        <div ng-show="newOwnerForm.postionDictionary{{lang.value+\'Name\'}}.$error.required && !newOwnerForm.postionDictionary{{lang.value+\'Name\'}}.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '                                        <div ng-show="(newOwnerForm.postionDictionary{{lang.value+\'Name\'}}.$error.minlength || newOwnerForm.postionDictionary{{lang.value+\'Name\'}}.$error.maxlength) && !newOwnerForm.postionDictionary{{lang.value+\'Name\'}}.$error.required">{{\'NameLengthError255\' | translate}}</div>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div> \n' +
    '\n' +
    '\n' +
    '            \n' +
    '            <div> \n' +
    '                <!-- Nav tabs -->\n' +
    '                <ul class="nav nav-tabs" role="tablist">\n' +
    '                    <li role="presentation" ng-class="{\'active\':$index == 0}" ng-repeat="lang in newOwnerCtrl.language">\n' +
    '                        <a href="javascript:void(0);" data-target="#{{lang.value}}-desc-form" aria-controls="home" role="tab" data-toggle="tab">\n' +
    '                            {{lang.value | translate}}\n' +
    '                        </a>\n' +
    '                    </li>       \n' +
    '                </ul>\n' +
    '                <div class="pmd-card">\n' +
    '                    <div class="pmd-card-body">\n' +
    '                        <!-- Tab panes -->\n' +
    '                        <div class="tab-content">\n' +
    '                            <div role="tablist" class="tab-pane" ng-class="{\'active\':$index == 0}" ng-repeat="lang in newOwnerCtrl.language" id="{{lang.value}}-desc-form">\n' +
    '                                <div class="form-group pmd-textfield pmd-textfield-floating-label">\n' +
    '                                    <label for="first-name"> {{ lang.value+\' Desctiprtion\' | translate}} </label>\n' +
    '                                    <textarea required Owner="text" class="mat-input form-control" name="+{{lang.value+\'Name\'}}"\n' +
    '                                     ng-model="newOwnerCtrl.descriptionDictionary[lang.key]" ng-minlength="3" ng-maxlength="255">\n' +
    '                                     </textarea>\n' +
    '                                    <div ng-messages="newOwnerForm.descriptionDictionary{{lang.value+\'Name\'}}.$error" >\n' +
    '										\n' +
    '                                        <div ng-show="newOwnerForm.descriptionDictionary{{lang.value+\'Name\'}}.$error.required && !newOwnerForm.descriptionDictionary{{lang.value+\'Name\'}}.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '                                        <div ng-show="(newOwnerForm.descriptionDictionary{{lang.value+\'Name\'}}.$error.minlength || newOwnerForm.descriptionDictionary{{lang.value+\'Name\'}}.$error.maxlength) && !newOwnerForm.descriptionDictionary{{lang.value+\'Name\'}}.$error.required">{{\'NameLengthError255\' | translate}}</div>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div> \n' +
    '\n' +
    '        </form>\n' +
    '    </div>\n' +
    '    <div class="pmd-modal-action text-right">\n' +
    '        <button ng-disabled="newOwnerForm.$invalid" class="btn pmd-ripple-effect btn-primary" Owner="button" ng-click="newOwnerCtrl.AddNewOwner()">{{\'saveChangesBtn\' | translate}}</button>\n' +
    '        <button class="btn pmd-ripple-effect btn-default" Owner="button" ng-click="$state.go(\'Owner\');">{{\'DiscardBtn\' | translate}}</button>\n' +
    '    </div>\n' +
    '</div>\n' +
    '');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/user/templates/addUser.html',
    '{{\'BasicInfoLbl\' | translate}}\n' +
    '<form class="form-horizontal" name="newclientForm">\n' +
    '    <div class="form-group pmd-textfield pmd-textfield-floating-label">\n' +
    '        <label for="first-name">{{\'Name\' | translate}}</label>\n' +
    '        <input required type="text" class="mat-input form-control" name="fullName" ng-pattern="/^(\\D)+$/" ng-model="fullName" ng-minlength="3"\n' +
    '               ng-maxlength="255">\n' +
    '        <div ng-messages="newclientForm.fullName.$error" class="error">\n' +
    '            <div ng-show="newclientForm.fullName.$error.pattern">{{\'TextOnly\' | translate}}</div>\n' +
    '            <div ng-if="newclientForm.fullName.$error.required && !newclientForm.fullName.$pristine">{{\'fullNameLengthError\' | translate}}</div>\n' +
    '            <div ng-if="(newclientForm.fullName.$error.minlength || newclientForm.fullName.$error.maxlength) ">{{\'NameLengthError255\' | translate}}</div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <div class="form-group pmd-textfield pmd-textfield-floating-label">\n' +
    '        <label for="first-name">{{\'titleLbl\' | translate}}</label>\n' +
    '        <input required type="text" class="mat-input form-control" name="title" ng-pattern="/^(\\D)+$/" ng-model="title" ng-minlength="3"\n' +
    '               ng-maxlength="255">\n' +
    '        <div ng-messages="newclientForm.title.$error">\n' +
    '            <div ng-show="newclientForm.title.$error.pattern">{{\'TextOnly\' | translate}}</div>\n' +
    '            <div ng-if="newclientForm.title.$error.required && !newclientForm.title.$pristine">{{\'title\' | translate}}</div>\n' +
    '            <div ng-if="(newclientForm.title.$error.minlength || newclientForm.title.$error.maxlength)">{{\'NameLengthError255\' | translate}}</div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <div class="form-group pmd-textfield pmd-textfield-floating-label">\n' +
    '        <label>{{\'EmailLbl\' | translate}}</label>\n' +
    '        <input required type="text" class="mat-input form-control" name="userEmail" ng-model="Email" ng-pattern="/^\\w+([-+.\']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$/">\n' +
    '        <span class="error" ng-show="newclientForm.userEmail.$error.pattern">{{\'WrongMail\' | translate}} </span>\n' +
    '        <div ng-messages="newclientForm.email.$error">\n' +
    '            <div ng-if="newclientForm.userEmail.$error.required && !newclientForm.userEmail.$pristine">{{\'EmailLengthError\' | translate}}</div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <div class="form-group pmd-textfield pmd-textfield-floating-label">\n' +
    '\n' +
    '        <label for="first-name">{{\'phoneLbl\' | translate}}</label>\n' +
    '        <input required type="text" class="mat-input form-control" name="phone" numbers-only ng-model="Phone" ng-minlength="10" ng-maxlength="50">\n' +
    '        <!-- <span class="error" ng-show="newclientForm.phone.$error.pattern">{{\'NotPhoneNumber\' | translate}}   </span> -->\n' +
    '        <div ng-messages="newclientForm.phone.$error">\n' +
    '            <div ng-if="newclientForm.phone.$error.required && !newclientForm.phone.$pristine">{{\'PhoneReqError\' | translate}}</div>\n' +
    '            <div ng-if="(newclientForm.phone.$error.minlength || newclientForm.phone.$error.maxlength)">{{\'PhoneLengthError\' | translate}}</div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <div class="form-group pmd-textfield pmd-textfield-floating-label">\n' +
    '\n' +
    '        <label for="first-name">{{\'whatsApp\' | translate}}</label>\n' +
    '        <input required type="text" class="mat-input form-control" name="whatsApp" numbers-only ng-model="whatsApp" ng-minlength="10" ng-maxlength="50">\n' +
    '        <div ng-messages="newclientForm.whatsApp.$error">\n' +
    '            <div ng-if="newclientForm.whatsApp.$error.required && !newclientForm.whatsApp.$pristine">{{\'whatsAppReqError\' | translate}}</div>\n' +
    '            <div ng-if="(newclientForm.whatsApp.$error.minlength || newclientForm.whatsApp.$error.maxlength)">{{\'whatsAppLengthError\' | translate}}</div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <div class="form-group pmd-textfield pmd-textfield-floating-label">\n' +
    '        <label for="first-name">{{\'UserPasswordLbl\' | translate}}</label>\n' +
    '        <input required type="password" class="mat-input form-control" name="password" ng-model="Password" ng-minlength="8" ng-maxlength="25">\n' +
    '        <div ng-messages="newclientForm.password.$error">\n' +
    '            <div ng-if="newclientForm.password.$error.required && !newclientForm.password.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '            <div ng-if="(newclientForm.password.$error.minlength || newclientForm.password.$error.maxlength) && !newclientForm.password.newPassword.$error.required">Password length must be 8-25 char.</div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <div class="form-group pmd-textfield pmd-textfield-floating-label">\n' +
    '        <label for="first-name">{{\'ConfirmPasswordLbl\' | translate}}</label>\n' +
    '        <input required type="password" class="mat-input form-control" name="confirmPassword" ng-model="confirmPassword" equalto="newclientForm.password">\n' +
    '        <div ng-messages="newclientForm.confirmPassword.$error">\n' +
    '            <div ng-if="newclientForm.confirmPassword.$error.required && !newclientForm.confirmPassword.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '            <div ng-if="newclientForm.confirmPassword.$error.equalto && !newclientForm.confirmPassword.$error.required">{{\'passworddontmatch\' | translate}}</div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <div class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '        <label for="first-name">{{\'UserType\' | translate}}</label>\n' +
    '        <select required style="width:100% !important" class="select-tags form-control pmd-select2-tags"\n' +
    '                ng-model="selectedType" ng-options="group as group.text for group in userTypeList"></select>\n' +
    '    </div>\n' +
    '\n' +
    '</form>\n' +
    '<div class="pmd-modal-action text-right">\n' +
    '    <button ng-disabled="newclientForm.$invalid "\n' +
    '            class="btn pmd-ripple-effect btn-primary" type="button" ng-click="AddNewclient()">\n' +
    '        {{\'saveChangesBtn\' | translate}}\n' +
    '    </button>\n' +
    '    <button class="btn pmd-ripple-effect btn-default" type="button" ng-click="Close()">{{\'DiscardBtn\' | translate}}</button>\n' +
    '</div>\n' +
    '<script type="text/javascript">\n' +
    '    $(document).ready(function () {\n' +
    '        $(".select-tags").select2({\n' +
    '            tags: false,\n' +
    '            theme: "bootstrap",\n' +
    '        })\n' +
    '\n' +
    '        $(".select-with-search").select2({\n' +
    '            theme: "bootstrap"\n' +
    '        });\n' +
    '    });\n' +
    '</script>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/user/templates/editUser.html',
    ' \n' +
    '<form class="form-horizontal" name="newclientForm" autocomplete="off">\n' +
    '    <div class="form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '        <label for="first-name">{{\'fullName\' | translate}}</label>\n' +
    '        <input required type="text" class="mat-input form-control" name="fullName" ng-model="userObj.fullName" ng-minlength="3"\n' +
    '            ng-maxlength="255">\n' +
    '        <div ng-messages="newclientForm.fullName.$error">\n' +
    '            <div ng-if="newclientForm.fullName.$error.required && !newclientForm.fullName.$pristine">{{\'fullNameLengthError\' | translate}}</div>\n' +
    '            <div ng-if="(newclientForm.fullName.$error.minlength || newclientForm.fullName.$error.maxlength) && !newclientForm.fullName.$error.required">{{\'NameLengthError255\' | translate}}</div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <div class="form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '        <label for="first-name">{{\'titleLbl\' | translate}}</label>\n' +
    '        <input required type="text" class="mat-input form-control" name="title" ng-model="userObj.title" ng-minlength="3" ng-maxlength="255">\n' +
    '        <div ng-messages="newclientForm.title.$error">\n' +
    '            <div ng-if="newclientForm.title.$error.required && !newclientForm.title.$pristine">{{\'title\' | translate}}</div>\n' +
    '            <div ng-if="(newclientForm.title.$error.minlength || newclientForm.title.$error.maxlength) && !newclientForm.title.$error.required">{{\'titleLengthError\' | translate}}</div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <div class="form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '        <label for="first-name">{{\'EmailLbl\' | translate}}</label>\n' +
    '\n' +
    '        <input required type="text" class="mat-input form-control" name="email" ng-model="userObj.email" ng-minlength="3" ng-maxlength="50">\n' +
    '        <div ng-messages="newclientForm.email.$error">\n' +
    '            <div ng-if="newclientForm.email.$error.required && !newclientForm.email.$pristine">{{\'email is required\' | translate}}</div>\n' +
    '            <div ng-if="(newclientForm.email.$error.minlength || newclientForm.email.$error.maxlength) && !newclientForm.email.$error.required">{{\'LastNameLengthError\' | translate}}</div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <div class="form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '        <label for="first-name">{{\'phoneLbl\' | translate}}</label>\n' +
    '\n' +
    '        <input required type="text" class="mat-input form-control" numbers-only name="phone" ng-model="userObj.phone" ng-pattern="phoneNumbr"\n' +
    '            ng-minlength="10" ng-maxlength="50">\n' +
    '        <span class="error" ng-show="newclientForm.phone.$error.pattern">{{\'NotPhoneNumber\' | translate}} </span>\n' +
    '        <div ng-messages="newclientForm.phone.$error">\n' +
    '            <div ng-if="newclientForm.phone.$error.required && !newclientForm.phone.$pristine">{{\'PhoneReqError\' | translate}}</div>\n' +
    '            <div ng-if="(newclientForm.phone.$error.minlength || newclientForm.phone.$error.maxlength)">{{\'PhoneLengthError\' | translate}}</div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '\n' +
    '    <div class="form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '        <label for="first-name">{{\'whatsApp\' | translate}}</label>\n' +
    '\n' +
    '        <input required type="text" class="mat-input form-control" numbers-only name="whatsApp" ng-model="userObj.whatsApp" ng-pattern="whatsAppNumbr"\n' +
    '            ng-minlength="10" ng-maxlength="50">\n' +
    '        <span class="error" ng-show="newclientForm.whatsApp.$error.pattern">{{\'NotwhatsAppNumber\' | translate}} </span>\n' +
    '        <div ng-messages="newclientForm.whatsApp.$error">\n' +
    '            <div ng-if="newclientForm.whatsApp.$error.required && !newclientForm.whatsApp.$pristine">{{\'whatsAppReqError\' | translate}}</div>\n' +
    '            <div ng-if="(newclientForm.whatsApp.$error.minlength || newclientForm.whatsApp.$error.maxlength)">{{\'whatsAppLengthError\' | translate}}</div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '\n' +
    '    <div class="form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '        <label for="first-name">{{\'UserPasswordLbl\' | translate}}</label>\n' +
    '\n' +
    '        <input required type="password" class="mat-input form-control" name="password" ng-model="userObj.password" ng-minlength="8"\n' +
    '            ng-maxlength="25">\n' +
    '        <div ng-messages="newclientForm.password.$error">\n' +
    '            <div ng-if="newclientForm.password.$error.required && !newclientForm.password.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '            <div ng-if="(newclientForm.password.$error.minlength || newclientForm.password.$error.maxlength) && !newclientForm.password.newPassword.$error.required">Password length must be 8-25 char.</div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '\n' +
    '    <div class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '        <label for="first-name">{{\'ConfirmPasswordLbl\' | translate}}</label>\n' +
    '        <input required type="password" class="mat-input form-control" name="confirmPassword" ng-model="userObj.confirmPassword" equalto="newclientForm.password">\n' +
    '        <div ng-messages="newclientForm.confirmPassword.$error">\n' +
    '            <div ng-if="newclientForm.confirmPassword.$error.required && !newclientForm.confirmPassword.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '            <div ng-if="newclientForm.confirmPassword.$error.equalto && !newclientForm.confirmPassword.$error.required">{{\'passworddontmatch\' | translate}}</div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <div class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '        <label for="first-name">{{\'UserType\' | translate}}</label>\n' +
    '        <select required style="width:100% !important" class="select-tags form-control pmd-select2-tags" \n' +
    '            ng-model="selectedType" ng-options="group as group.text for group in userTypeList">\n' +
    '\n' +
    '        </select> \n' +
    '    </div> \n' +
    '    \n' +
    '</form>\n' +
    '<div class="pmd-modal-action text-right">\n' +
    '    <button ng-disabled="newclientForm.$invalid" class="btn pmd-ripple-effect btn-primary" type="button"\n' +
    '        ng-click="Updateclient()">{{\'saveChangesBtn\' | translate}}</button>\n' +
    '		<button class="btn pmd-ripple-effect btn-default" type="button" ng-click="newclientForm.Close()">{{\'DiscardBtn\' | translate}}</button>\n' +
    '\n' +
    '</div>\n' +
    '\n' +
    '\n' +
    '<script type="text/javascript">\n' +
    '    $(document).ready(function () {\n' +
    '        $(".select-add-tags").select2({\n' +
    '            tags: true,\n' +
    '            theme: "bootstrap",\n' +
    '            insertTag: function (data, tag) {\n' +
    '                // Insert the tag at the end of the results\n' +
    '                data.push(tag);\n' +
    '                // console.log(data);\n' +
    '            }\n' +
    '        });\n' +
    '        $(".select-tags").select2({\n' +
    '            tags: false,\n' +
    '            theme: "bootstrap",\n' +
    '        })\n' +
    '        \n' +
    '        $(".select-with-search").select2({\n' +
    '            theme: "bootstrap"\n' +
    '        });\n' +
    '    });\n' +
    '</script>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/user/templates/user.html',
    '<div>\n' +
    '    <div style="margin-bottom:10px">\n' +
    '        <button ng-click="$state.go(\'addUser\');" ng-disabled="userCtrl.userConsumed.consumedUsers >= userCtrl.userConsumed.maxNumUsers" class="btn pmd-ripple-effect btn-primary pmd-z-depth" type="button">{{\'AddUserBtn\' | translate}}</button>\n' +
    ' \n' +
    '    </div>\n' +
    '    <div ng-if="userCtrl.userList.results.length == 0">\n' +
    '        <span>{{\'NouserAvailable\' | translate}}</span>\n' +
    '    </div>\n' +
    '\n' +
    '    <div class="pmd-card pmd-z-depth pmd-card-custom-view" ng-if="userList.length >0">\n' +
    '\n' +
    '        <div class="table-responsive">\n' +
    '            <table class="table pmd-table table-hover">\n' +
    '                <thead>\n' +
    '                    <tr>\n' +
    '                        <th>{{\'userName\' | translate}}</th>\n' +
    '                        <th>{{\'Title\' | translate}}</th> \n' +
    '                        <th>{{\'EmailLbl\' | translate}}</th> \n' +
    '                        <th>{{\'Phone1Lbl\' | translate}}</th> \n' +
    '                        <th>{{\'Type\' | translate}}</th> \n' +
    '                    </tr>\n' +
    '                </thead>\n' +
    '                <tbody>\n' +
    '                    <tr ng-repeat="user in userList">\n' +
    '                        <td data-title="Name" width="20%">{{user.fullName}}</td>\n' +
    '                        <td  data-title="title">{{user.title}}</td> \n' +
    '                        <td  data-title="email" width="20%">{{user.email}}  </td> \n' +
    '                        <td  data-title="phone">{{user.phone}}</td> \n' +
    '                        <td  data-title="type"> {{(userTypeList  |filter: {id: key})[user.userType].text}}</td> \n' +
    '                       \n' +
    '                        <td  width="15%">  \n' +
    '                            <i class="cursorPointer" ng-click="$state.go(\'editUser\', {userId: user.userId});">{{\'Edit\' | translate}} </i>\n' +
    '\n' +
    '                        </td>\n' +
    '                    </tr>\n' +
    '                </tbody>\n' +
    '            </table>\n' +
    '        </div>\n' +
    '\n' +
    '    </div>\n' +
    '    <div style="text-align:center;direction: ltr" paging page="1" page-size="10" total="totalCount" paging-action="changePage(page)"\n' +
    '         flex="nogrow" show-prev-next="true" show-first-last="true" hide-if-empty="true" disabled-class="hide">\n' +
    '    </div>\n' +
    '</div>\n' +
    '\n' +
    '');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/core/Delete/templates/ConfirmDeleteDialog.html',
    '<div class="modal-content">\n' +
    '	<div class="modal-body">{{\'deleteConfirmationLbl\' | translate}}<strong>{{deleteDlCtrl.itemName}}</strong> {{deleteDlCtrl.message}}? </div>\n' +
    '	<div class="pmd-modal-action text-right">\n' +
    '		<button class="btn pmd-ripple-effect btn-primary pmd-btn-flat" type="button" ng-click="deleteDlCtrl.Confirm()">{{\'deleteBtn\' | translate}}</button>\n' +
    '		<button class="btn pmd-ripple-effect btn-default pmd-btn-flat" type="button" ng-click="deleteDlCtrl.close()">{{\'cancelBtn\' | translate}}</button>\n' +
    '	</div>\n' +
    '</div>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/core/login/templates/login.html',
    '<div class="logincard" ng-if="!isLoggedIn()">\n' +
    '  	<div class="pmd-card card-default pmd-z-depth">\n' +
    '		<div class="login-card">\n' +
    '			<form ng-submit="submit(username,password)" name="loginForm">	\n' +
    '				<div class="pmd-card-body">\n' +
    '					<div class="alert alert-success" role="alert"> Oh snap! Change a few things up and try submitting again. </div>\n' +
    '                    <div class="form-group pmd-textfield pmd-textfield-floating-label">\n' +
    '                        <label for="inputError1" class="control-label pmd-input-group-label">Email</label>\n' +
    '                        <div class="input-group">\n' +
    '                            <div class="input-group-addon"><i class="material-icons md-dark pmd-sm">perm_identity</i></div>\n' +
    '                            <input type="text" class="form-control" id="exampleInputAmount" required name="username" ng-model="username" ng-change="reset()">\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                    \n' +
    '                    <div class="form-group pmd-textfield pmd-textfield-floating-label">\n' +
    '                        <label for="inputError1" class="control-label pmd-input-group-label">Password</label>\n' +
    '                        <div class="input-group">\n' +
    '                            <div class="input-group-addon"><i class="material-icons md-dark pmd-sm">lock_outline</i></div>\n' +
    '                            <input required type="password" name="password" ng-model="password" ng-change="reset()" minlength="6"  class="form-control" >\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div ng-if="invalidLoginInfo" class="loginFailed">\n' +
    '                    <span>Incorrect username or password.</span>\n' +
    '                </div>\n' +
    '                <div ng-if="inActiveUser" class="loginFailed">\n' +
    '                    <span>Your account is deleted.</span>\n' +
    '                </div>\n' +
    '				<div class="pmd-card-footer card-footer-no-border card-footer-p16 text-center">\n' +
    '					<button  type="submit" class="btn pmd-ripple-effect btn-primary btn-block">Login</button>\n' +
    '				</div>\n' +
    '			</form>\n' +
    '		</div>\n' +
    '		\n' +
    '		\n' +
    '	</div>\n' +
    '</div>\n' +
    '');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/HotelReservation/templates/HotelReservation.html',
    ' \n' +
    '<div> \n' +
    '    <div ng-if="HotelReservationList.results.length == 0">\n' +
    '        <span>{{\'NoHotelReservationsAvailable\' | translate}}</span>\n' +
    '    </div>\n' +
    '    <div class="pmd-card pmd-z-depth pmd-card-custom-view" ng-if="HotelReservationList.results.length > 0">\n' +
    '        <div class="table-responsive"></div>\n' +
    '        <table class="table pmd-table table-hover">\n' +
    '            <thead>\n' +
    '                <tr>\n' +
    '                        <th>{{\'Hotel\' | translate}}</th>  \n' +
    '                        <th>{{\'Date\' | translate}}</th>  \n' +
    '                        <th>{{\'User\' | translate}}</th>  \n' +
    '                        <th>{{\'Status\' | translate}}</th>  \n' +
    '                        <th>{{\'InCharge\' | translate}}</th>  \n' +
    '                    <th></th>\n' +
    '                </tr>\n' +
    '            </thead>\n' +
    '            <tbody>\n' +
    '                <tr ng-class="{\'red-text\': HotelReservation.status == 3,\'green-text\': HotelReservation.status == 1}" ng-repeat="HotelReservation in HotelReservationList.results">\n' +
    '                    <td data-title="Hotel">{{HotelReservation.hotel.titleDictionary[selectedLanguage]}}</td>\n' +
    '                    <td data-title="Date">{{HotelReservation.creationTime}}</td>\n' +
    '                    <td data-title="User"> {{HotelReservation.user.fullName}}  </td>\n' +
    '                    <td> {{(StatusList  |filter: {id: key})[HotelReservation.status].text | translate}} </td> \n' +
    '                     <td > {{HotelReservation.seenUser.fullName}} / {{HotelReservation.user.title}} </td>\n' +
    '                   <td  > \n' +
    '                        <i class="material-icons md-dark pmd-md cursorPointer font25" ng-click="$state.go(\'editHotelReservation\',{hotelReservationId: HotelReservation.hotelReservationId});">mode_edit</i>\n' +
    '                            </td>\n' +
    '                </tr> \n' +
    '            </tbody>\n' +
    '        </table>\n' +
    '    </div>\n' +
    '    <div style="text-align:center;direction: ltr" paging page="1" page-size="10" total="totalCount" paging-action="changePage(page)"\n' +
    '         flex="nogrow" show-prev-next="true" show-first-last="true" hide-if-empty="true" disabled-class="hide">\n' +
    '    </div>\n' +
    '</div>\n' +
    '');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/HotelReservation/templates/edit.html',
    '<div class="modal-content">\n' +
    '    <div class="modal-header bordered">\n' +
    '        <h2 class="pmd-card-title-text">{{\'HotelReservation\' | translate}}</h2>\n' +
    '    </div>\n' +
    '    <div class="modal-body">\n' +
    '        <form class="form-horizontal" name="editHotelReservationForm">\n' +
    '\n' +
    '            <div class="form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                <label for="first-name">{{\'Tickect No\' | translate}}</label>\n' +
    '                <input readonly="readonly" type="text" class="mat-input form-control"\n' +
    '                       ng-model="editHotelReservationCtrl.HotelReservation.tickectNo">\n' +
    '                    </div>\n' +
    '\n' +
    '                <div>\n' +
    '                    <br>\n' +
    '                    <!-- Nav tabs -->\n' +
    '                    <ul class="nav nav-tabs" role="tablist">\n' +
    '                        <li role="presentation" ng-class="{\'active\':$index == 0}" ng-repeat="lang in editHotelReservationCtrl.language">\n' +
    '                            <a href="javascript:void(0);" data-target="#{{lang.value}}-form" aria-controls="home" role="tab" data-toggle="tab">\n' +
    '                                {{lang.value | translate}}\n' +
    '                            </a>\n' +
    '                        </li>\n' +
    '                    </ul>\n' +
    '                    <div class="pmd-card">\n' +
    '                        <div class="pmd-card-body">\n' +
    '                            <!-- Tab panes -->\n' +
    '                            <div class="tab-content">\n' +
    '                                <div role="tablist" class="tab-pane" ng-class="{\'active\':$index == 0}" ng-repeat="lang in editHotelReservationCtrl.language" id="{{lang.value}}-form">\n' +
    '                                    <div class="form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                                        <label for="first-name"> {{ lang.value+\'Name\' | translate}} </label>\n' +
    '                                        <input readonly="readonly" required type="text" class="mat-input form-control"\n' +
    '                                                  name="titleDictionary{{lang.value+\'Name\'}}"\n' +
    '                                                  ng-model="editHotelReservationCtrl.HotelReservation.hotel.titleDictionary[lang.key]"\n' +
    '                                               />  \n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '\n' +
    '                    </div>\n' +
    '                </div> \n' +
    '                <div class="row">\n' +
    '                        <div class="col-md-4 form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '                        <label for="first-name">{{\'checkIn\' | translate}}</label>\n' +
    '                        <input  id="checkin"  type="text" class="mat-input form-control"\n' +
    '                               ng-model="editHotelReservationCtrl.HotelReservation.checkIn">\n' +
    '                    </div>\n' +
    '\n' +
    '                    <div class="col-md-4 form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '                        <label for="first-name">{{\'checkOut\' | translate}}</label>\n' +
    '                        <input  id="checkout"  type="text"  required class="mat-input form-control"\n' +
    '                               ng-model="editHotelReservationCtrl.HotelReservation.checkOut">\n' +
    '                               <!-- <input type="text" id="startdate" class="form-control" required /> -->\n' +
    '                             </div>\n' +
    '\n' +
    '\n' +
    '                </div>\n' +
    '             \n' +
    '                <div class="row">\n' +
    '                        <div class="col-md-4 form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '                        <label for="first-name">{{\'Child\' | translate}}</label>\n' +
    '                        <input   type="text" class="mat-input form-control" numbers-only name="child"  ng-minlength="1" ng-maxlength="3"\n' +
    '                               ng-model="editHotelReservationCtrl.HotelReservation.child">\n' +
    '                               <span class="error" ng-show="editHotelReservationForm.child.$error.pattern">{{\'Not Child Number\' | translate}} </span>\n' +
    '                               <div ng-messages="editHotelReservationForm.child.$error">\n' +
    '                                   <div ng-if="editHotelReservationForm.child.$error.required && !editHotelReservationForm.child.$pristine">{{\'Child required\' | translate}}</div>\n' +
    '                                   <div ng-if="(editHotelReservationForm.child.$error.minlength || editHotelReservationForm.child.$error.maxlength)">{{\'PhoneLengthError\' | translate}}</div>\n' +
    '                               </div>\n' +
    '                            \n' +
    '                            </div>\n' +
    '\n' +
    '                    <div class="col-md-4 form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '                        <label for="first-name">{{\'Adult\' | translate}}</label>\n' +
    '                        <input  type="text" class="mat-input form-control" numbers-only name="adult"  ng-minlength="1" ng-maxlength="3"\n' +
    '                               ng-model="editHotelReservationCtrl.HotelReservation.adult">\n' +
    '                               <span class="error" ng-show="editHotelReservationForm.adult.$error.pattern">{{\'Not Adult Number\' | translate}} </span>\n' +
    '                               <div ng-messages="editHotelReservationForm.adult.$error">\n' +
    '                                   <div ng-if="editHotelReservationForm.adult.$error.required && !editHotelReservationForm.adult.$pristine">{{\'Adult required\' | translate}}</div>\n' +
    '                                   <div ng-if="(editHotelReservationForm.adult.$error.minlength || editHotelReservationForm.adult.$error.maxlength)">{{\'PhoneLengthError\' | translate}}</div>\n' +
    '                               </div>\n' +
    '                            \n' +
    '                      </div>\n' +
    '                      <div class="col-md-4 form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '                            <label for="first-name">{{\'roomCount\' | translate}}</label>\n' +
    '                            <input  type="text" class="mat-input form-control" numbers-only name="roomCount"  ng-minlength="1" ng-maxlength="3"\n' +
    '                                   ng-model="editHotelReservationCtrl.HotelReservation.roomCount">\n' +
    '                                   <span class="error" ng-show="editHotelReservationForm.roomCount.$error.pattern">{{\'Not roomCount Number\' | translate}} </span>\n' +
    '                                   <div ng-messages="editHotelReservationForm.roomCount.$error">\n' +
    '                                       <div ng-if="editHotelReservationForm.roomCount.$error.required && !editHotelReservationForm.roomCount.$pristine">{{\'roomCount required\' | translate}}</div>\n' +
    '                                       <div ng-if="(editHotelReservationForm.roomCount.$error.minlength || editHotelReservationForm.roomCount.$error.maxlength)">{{\'PhoneLengthError\' | translate}}</div>\n' +
    '                                   </div>\n' +
    '                                \n' +
    '                          </div>\n' +
    '\n' +
    '                </div>\n' +
    '                <div class="row"> \n' +
    '                        <div class="col-md-4 form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '                        <label for="first-name">{{\'UserName\' | translate}}</label>\n' +
    '                        <input readonly="readonly" type="text" class="mat-input form-control"\n' +
    '                               ng-model="editHotelReservationCtrl.HotelReservation.user.fullName">\n' +
    '                    </div>\n' +
    '                    <div class="col-md-4 form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '                        <label for="first-name">{{\'Email\' | translate}}</label>\n' +
    '                        <input readonly="readonly" type="text" class="mat-input form-control"\n' +
    '                               ng-model="editHotelReservationCtrl.HotelReservation.user.email">\n' +
    '                    </div>\n' +
    '                    <div class="col-md-4 form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '                        <label for="first-name">{{\'phone\' | translate}}</label>\n' +
    '                        <input readonly="readonly" type="text" class="mat-input form-control"\n' +
    '                               ng-model="editHotelReservationCtrl.HotelReservation.user.phone">\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                \n' +
    '                <div class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '                        <label for="first-name">{{\'Status\' | translate}}</label>\n' +
    '                        <select required style="width:100% !important" class="select-tags form-control pmd-select2-tags" \n' +
    '                            ng-model="selectedStatus" ng-options="group as group.text for group in StatusList">\n' +
    '                \n' +
    '                        </select> \n' +
    '                        {{selectedStatus.id}}\n' +
    '                    </div> \n' +
    '                    \n' +
    '        </form>\n' +
    '    </div>\n' +
    '    <div class="pmd-modal-action text-right">\n' +
    '        <button ng-disabled="editHotelReservationForm.$invalid" class="btn pmd-ripple-effect btn-primary" type="button" ng-click="editHotelReservationCtrl.UpdateHotelReservation()">{{\'saveChangesBtn\' | translate}}</button>\n' +
    '        <button class="btn pmd-ripple-effect btn-default" type="button" ng-click="editHotelReservationCtrl.Close()">{{\'DiscardBtn\' | translate}}</button>\n' +
    '    </div>\n' +
    '</div>\n' +
    '\n' +
    '\n' +
    '<script type="text/javascript">\n' +
    '    $(document).ready(function () { \n' +
    '        $(".select-tags").select2({\n' +
    '            tags: false,\n' +
    '            theme: "bootstrap",\n' +
    '        })\n' +
    '\n' +
    '        $(".select-with-search").select2({\n' +
    '            theme: "bootstrap"\n' +
    '        });\n' +
    '    });\n' +
    '\n' +
    '     $(function () {\n' +
    '        $(\'#checkin\').datetimepicker(\n' +
    '            {\n' +
    '                //   viewMode: \'years\',\n' +
    '                //  format: \'DD/MM/YYYY\',\n' +
    '                minDate: new Date()\n' +
    '            }\n' +
    '    );\n' +
    '    $(\'#checkout\').datetimepicker(\n' +
    '            {\n' +
    '                //   viewMode: \'years\',\n' +
    '                //  format: \'DD/MM/YYYY\',\n' +
    '                minDate: new Date()\n' +
    '            }\n' +
    '    );\n' +
    '    });\n' +
    '</script>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/News/templates/News.html',
    '\n' +
    '<div>\n' +
    '    <div style="margin-bottom:10px">\n' +
    '        <button ng-click="$state.go(\'newNews\');" class="btn pmd-ripple-effect btn-primary pmd-z-depth" type="button">{{\'AddNew\' | translate}}</button>\n' +
    '\n' +
    '    </div> \n' +
    '    <div ng-if="NewsList.results.length == 0">\n' +
    '        <span>{{\'NoNewssAvailable\' | translate}}</span>\n' +
    '    </div>\n' +
    '    <div class="pmd-card pmd-z-depth pmd-card-custom-view" ng-if="NewsList.results.length > 0">\n' +
    '        <div class="table-responsive"></div>\n' +
    '        <table class="table pmd-table table-hover">\n' +
    '            <thead>\n' +
    '                <tr>\n' +
    '                        <th>{{\'Image\' | translate}}</th> \n' +
    '                        <th>{{\'Name\' | translate}}</th>\n' +
    '                    <th>{{\'Description\' | translate}}</th>\n' +
    '                    <!-- <th>{{\'status\' | translate}}</th> --> \n' +
    '                    <th></th>\n' +
    '                </tr>\n' +
    '            </thead>\n' +
    '            <tbody>\n' +
    '                <tr ng-repeat="News in NewsList.results">\n' +
    '                        <td data-title="Image" ><img ng-src="{{News.image}}"\n' +
    '                            ng-alt="{{News.titleDictionary[selectedLanguage]}}" style="max-height: 200px;max-width: 200px;"/>\n' +
    '                        </td>\n' +
    '\n' +
    '                            <td data-title="Name">{{News.titleDictionary[selectedLanguage]}}</td>\n' +
    '                    <td data-title="Description">{{News.descriptionDictionary[selectedLanguage]  | limitTo:20}}</td>  \n' +
    '                     \n' +
    '                    <td width="30%" ng-show="!News.isStatic">\n' +
    '                        <i class="material-icons md-dark pmd-md cursorPointer font25" ng-click="$state.go(\'editNews\',{newsId: News.newsId});">mode_edit</i>\n' +
    '                    </td>\n' +
    '                </tr>\n' +
    '                \n' +
    '            </tbody>\n' +
    '        </table>\n' +
    '    </div>\n' +
    '    <div style="text-align:center;direction: ltr" paging page="1" page-size="10" total="totalCount" paging-action="changePage(page)"\n' +
    '         flex="nogrow" show-prev-next="true" show-first-last="true" hide-if-empty="true" disabled-class="hide">\n' +
    '    </div>\n' +
    '</div>\n' +
    '');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/News/templates/edit.html',
    '<div class="modal-content">\n' +
    '	<div class="modal-header bordered">\n' +
    '		<h2 class="pmd-card-title-text">{{\'News\' | translate}}</h2>\n' +
    '	</div>\n' +
    '	<div class="modal-body">\n' +
    '		<form class="form-horizontal" name="UpdateNewsForm"> \n' +
    '                <div> \n' +
    '                    <!-- Nav tabs -->\n' +
    '                    <ul class="nav nav-tabs" role="tablist">\n' +
    '                        <li role="presentation" ng-class="{\'active\':$index == 0}" ng-repeat="lang in editNewsCtrl.language">\n' +
    '                            <a href="javascript:void(0);" data-target="#{{lang.value}}-form" aria-controls="home" role="tab" data-toggle="tab">\n' +
    '                                {{lang.value | translate}}\n' +
    '                            </a>\n' +
    '                        </li> \n' +
    '                    </ul>\n' +
    '                    <div class="pmd-card">\n' +
    '                        <div class="pmd-card-body">\n' +
    '                            <!-- Tab panes -->\n' +
    '                            <div class="tab-content">\n' +
    '                                <div role="tablist" class="tab-pane" ng-class="{\'active\':$index == 0}" ng-repeat="lang in editNewsCtrl.language" id="{{lang.value}}-form">\n' +
    '                                    <div class="form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                                        <label for="first-name"> {{ lang.value+\'Name\' | translate}} </label>\n' +
    '                                        <input required type="text" class="mat-input form-control" name="titleDictionary{{lang.value+\'Name\'}}" ng-model="editNewsCtrl.News.titleDictionary[lang.key]" ng-minlength="3" ng-maxlength="255">\n' +
    '                                        <div ng-messages="UpdateNewsForm.titleDictionary{{lang.value+\'Name\'}}.$error" >\n' +
    '                                            \n' +
    '                                            <div ng-show="UpdateNewsForm.titleDictionary{{lang.value+\'Name\'}}.$error.required && !UpdateNewsForm.titleDictionary{{lang.value+\'Name\'}}.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '                                            <div ng-show="(UpdateNewsForm.titleDictionary{{lang.value+\'Name\'}}.$error.minlength || UpdateNewsForm.titleDictionary{{lang.value+\'Name\'}}.$error.maxlength) && !UpdateNewsForm.titleDictionary{{lang.value+\'Name\'}}.$error.required">{{\'NameLengthError255\' | translate}}</div>\n' +
    '                                        </div>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </div> \n' +
    '                        </div>\n' +
    '\n' +
    '                   \n' +
    '                    </div>\n' +
    '                </div> \n' +
    ' \n' +
    '                <div> \n' +
    '                    <!-- Nav tabs -->\n' +
    '                    <ul class="nav nav-tabs" role="tablist">\n' +
    '                        <li role="presentation" ng-class="{\'active\':$index == 0}" ng-repeat="lang in editNewsCtrl.language">\n' +
    '                            <a href="javascript:void(0);" data-target="#{{lang.value}}-desc-form" aria-controls="home" role="tab" data-toggle="tab">\n' +
    '                                {{lang.value | translate}}\n' +
    '                            </a>\n' +
    '                        </li> \n' +
    '                    </ul>\n' +
    '                    <div class="pmd-card">\n' +
    '                        <div class="pmd-card-body">\n' +
    '                            <!-- Tab panes -->\n' +
    '                            <div class="tab-content">\n' +
    '                                <div role="tablist" class="tab-pane" ng-class="{\'active\':$index == 0}" ng-repeat="lang in editNewsCtrl.language" id="{{lang.value}}-desc-form">\n' +
    '                                    <div class="form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                                        <label for="first-name"> {{ lang.value+\'Name\' | translate}} </label>\n' +
    '                                        <textarea required type="text" class="mat-input form-control"\n' +
    '                                         name="descriptionDictionary{{lang.value+\'Name\'}}" \n' +
    '                                         ng-model="editNewsCtrl.News.descriptionDictionary[lang.key]" ng-minlength="3" ng-maxlength="255"></textarea>\n' +
    '                                        <div ng-messages="UpdateNewsForm.descriptionDictionary{{lang.value+\'Name\'}}.$error" >\n' +
    '                                            \n' +
    '                                            <div ng-show="UpdateNewsForm.descriptionDictionary{{lang.value+\'Name\'}}.$error.required && !UpdateNewsForm.descriptionDictionary{{lang.value+\'Name\'}}.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '                                            <div ng-show="(UpdateNewsForm.descriptionDictionary{{lang.value+\'Name\'}}.$error.minlength || UpdateNewsForm.descriptionDictionary{{lang.value+\'Name\'}}.$error.maxlength) && !UpdateNewsForm.descriptionDictionary{{lang.value+\'Name\'}}.$error.required">{{\'NameLengthError255\' | translate}}</div>\n' +
    '                                        </div>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </div> \n' +
    '                        </div>\n' +
    '\n' +
    '                   \n' +
    '                    </div>\n' +
    '                </div> \n' +
    '                <div class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '    \n' +
    '                        <input id="file" name="file" style="display: none;" onchange="angular.element(this).scope().AddFile(this.files)"   type="file">\n' +
    '                        <button class="btn btn-primary editable-table-button btn-xs btn-with-icon" ng-click="editNewsCtrl.LoadUploadImages()">{{\'AddImageBtn\' |translate}}</button>\n' +
    '                \n' +
    '                        <br>\n' +
    '                        <div>\n' +
    '                            \n' +
    '                                                <img ng-src="{{editNewsCtrl.News.image}}" style="max-height: 286px;max-width: 286px;"> \n' +
    '                                        </td>\n' +
    '                                        <!-- <td>\n' +
    '                                            <i class="material-icons pmd-md deleteButton cursorPointer font25" style="font-size: 20px;color: grey;cursor: pointer;" ng-click="editNewsCtrl.removeNewsFile($index)">delete</i>\n' +
    '                                        </td> -->\n' +
    '                            \n' +
    '                        </div>\n' +
    '                        <br>  <div>\n' +
    '                                <table>\n' +
    '                                    <tbody>\n' +
    '                                        <tr ng-repeat="file in editNewsCtrl.files">\n' +
    '                                            <td>\n' +
    '                                                          {{file.name}}\n' +
    '                                            </td>\n' +
    '                                            <td>\n' +
    '                                                <i class="material-icons pmd-md deleteButton cursorPointer font25" style="font-size: 20px;color: grey;cursor: pointer;" ng-click="editNewsCtrl.removeFile($index)">delete</i>\n' +
    '                                            </td>\n' +
    '                                        </tr>\n' +
    '                                    </tbody>\n' +
    '                                </table>\n' +
    '            \n' +
    '                            </div>\n' +
    '                    </div>\n' +
    '		</form>\n' +
    '	</div>\n' +
    '	<div class="pmd-modal-action text-right">\n' +
    '		<button ng-disabled="UpdateNewsForm.$invalid || editNewsCtrl.CheckImages.length == 0 " class="btn pmd-ripple-effect btn-primary" type="button" ng-click="editNewsCtrl.UpdateNews()">{{\'saveChangesBtn\' | translate}}</button>\n' +
    '		<button class="btn pmd-ripple-effect btn-default" type="button" ng-click="editNewsCtrl.Close()">{{\'DiscardBtn\' | translate}}</button>\n' +
    '	</div>\n' +
    '</div>\n' +
    '\n' +
    '	\n' +
    '');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/News/templates/new.html',
    '<div class="modal-content">\n' +
    '    <div class="modal-header bordered">\n' +
    '        <h2 class="pmd-card-title-text">{{\'Add\' | translate}}</h2>\n' +
    '    </div>\n' +
    '    <div class="modal-body">\n' +
    '        <form class="form-horizontal" name="newNewsForm">\n' +
    '            <div>\n' +
    '                <!-- Nav tabs -->\n' +
    '                <ul class="nav nav-tabs" role="tablist">\n' +
    '                    <li role="presentation" ng-class="{\'active\':$index == 0}" ng-repeat="lang in newNewsCtrl.language">\n' +
    '                        <a href="javascript:void(0);" data-target="#{{lang.value}}-form" aria-controls="home" role="tab"\n' +
    '                            data-toggle="tab">\n' +
    '                            {{lang.value | translate}}\n' +
    '                        </a>\n' +
    '                    </li>\n' +
    '                </ul>\n' +
    '                <div class="pmd-card">\n' +
    '                    <div class="pmd-card-body">\n' +
    '                        <!-- Tab panes -->\n' +
    '                        <div class="tab-content">\n' +
    '                            <div role="tablist" class="tab-pane" ng-class="{\'active\':$index == 0}"\n' +
    '                                ng-repeat="lang in newNewsCtrl.language" id="{{lang.value}}-form">\n' +
    '                                <div class="form-group pmd-textfield pmd-textfield-floating-label">\n' +
    '                                    <label for="first-name"> {{ lang.value+\'Name\' | translate}} </label>\n' +
    '                                    <input required News="text" class="mat-input form-control"\n' +
    '                                        name="titleDictionary{{lang.value+\'Name\'}}"\n' +
    '                                        ng-model="newNewsCtrl.titleDictionary[lang.key]" ng-minlength="3"\n' +
    '                                        ng-maxlength="255">\n' +
    '                                    <div ng-messages="newNewsForm.titleDictionary{{lang.value+\'Name\'}}.$error">\n' +
    '\n' +
    '                                        <div\n' +
    '                                            ng-show="newNewsForm.titleDictionary{{lang.value+\'Name\'}}.$error.required && !newNewsForm.titleDictionary{{lang.value+\'Name\'}}.$pristine">\n' +
    '                                            {{\'requiredErr\' | translate}}</div>\n' +
    '                                        <div\n' +
    '                                            ng-show="(newNewsForm.titleDictionary{{lang.value+\'Name\'}}.$error.minlength || newNewsForm.titleDictionary{{lang.value+\'Name\'}}.$error.maxlength) && !newNewsForm.titleDictionary{{lang.value+\'Name\'}}.$error.required">\n' +
    '                                            {{\'NameLengthError255\' | translate}}</div>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <div>\n' +
    '                <!-- Nav tabs -->\n' +
    '                <ul class="nav nav-tabs" role="tablist">\n' +
    '                    <li role="presentation" ng-class="{\'active\':$index == 0}" ng-repeat="lang in newNewsCtrl.language">\n' +
    '                        <a href="javascript:void(0);" data-target="#{{lang.value}}-desc-form" aria-controls="home"\n' +
    '                            role="tab" data-toggle="tab">\n' +
    '                            {{lang.value | translate}}\n' +
    '                        </a>\n' +
    '                    </li>\n' +
    '                </ul>\n' +
    '                <div class="pmd-card">\n' +
    '                    <div class="pmd-card-body">\n' +
    '                        <!-- Tab panes -->\n' +
    '                        <div class="tab-content">\n' +
    '                            <div role="tablist" class="tab-pane" ng-class="{\'active\':$index == 0}"\n' +
    '                                ng-repeat="lang in newNewsCtrl.language" id="{{lang.value}}-desc-form">\n' +
    '                                <div class="form-group pmd-textfield pmd-textfield-floating-label">\n' +
    '                                    <label for="first-name"> {{ lang.value+\'Description\' | translate}} </label>\n' +
    '                                    <textarea required News="text" class="mat-input form-control"\n' +
    '                                        name="descriptionDictionary{{lang.value+\'Name\'}}"\n' +
    '                                        ng-model="newNewsCtrl.descriptionDictionary[lang.key]" ng-minlength="3"\n' +
    '                                        ng-maxlength="255"></textarea>\n' +
    '                                    <div ng-messages="newNewsForm.descriptionDictionary{{lang.value+\'Name\'}}.$error">\n' +
    '\n' +
    '                                        <div\n' +
    '                                            ng-show="newNewsForm.descriptionDictionary{{lang.value+\'Name\'}}.$error.required && !newNewsForm.descriptionDictionary{{lang.value+\'Name\'}}.$pristine">\n' +
    '                                            {{\'requiredErr\' | translate}}</div>\n' +
    '                                        <div\n' +
    '                                            ng-show="(newNewsForm.descriptionDictionary{{lang.value+\'Name\'}}.$error.minlength || newNewsForm.descriptionDictionary{{lang.value+\'Name\'}}.$error.maxlength) && !newNewsForm.descriptionDictionary{{lang.value+\'Name\'}}.$error.required">\n' +
    '                                            {{\'NameLengthError255\' | translate}}</div>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '\n' +
    '            <div class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '\n' +
    '                <input id="file" name="file" style="display: none;"\n' +
    '                    onchange="angular.element(this).scope().AddFile(this.files)" type="file">\n' +
    '                <button class="btn btn-primary editable-table-button btn-xs btn-with-icon"\n' +
    '                    ng-click="newNewsCtrl.LoadUploadImages()">{{\'AddImageBtn\' |translate}}</button>\n' +
    '\n' +
    '                <br>\n' +
    '                <div>\n' +
    '                    <table>\n' +
    '                        <tbody>\n' +
    '                            <tr ng-repeat="file in newNewsCtrl.files">\n' +
    '                                <td>\n' +
    '                                    {{file.name}}\n' +
    '                                </td>\n' +
    '                                <td>\n' +
    '                                    <i class="material-icons pmd-md deleteButton cursorPointer font25"\n' +
    '                                        style="font-size: 20px;color: grey;cursor: pointer;"\n' +
    '                                        ng-click="newNewsCtrl.removeFile($index)">delete</i>\n' +
    '                                </td>\n' +
    '                            </tr>\n' +
    '                        </tbody>\n' +
    '                    </table>\n' +
    '\n' +
    '                </div>\n' +
    '            </div>\n' +
    '\n' +
    '        </form>\n' +
    '    </div>\n' +
    '    <div class="pmd-modal-action text-right">\n' +
    '        <button ng-disabled="newNewsForm.$invalid|| newNewsCtrl.files.length == 0 "\n' +
    '            class="btn pmd-ripple-effect btn-primary" News="button"\n' +
    '            ng-click="newNewsCtrl.AddNewNews()">{{\'saveChangesBtn\' | translate}}</button>\n' +
    '        <button class="btn pmd-ripple-effect btn-default" News="button"\n' +
    '            ng-click="$state.go(\'News\');">{{\'DiscardBtn\' | translate}}</button>\n' +
    '    </div>\n' +
    '</div>');
}]);
