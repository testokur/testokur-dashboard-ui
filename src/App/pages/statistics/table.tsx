import * as _ from 'lodash';
import React from 'react';
import { IdentityStats, WebApiStats, ReportStats, NotificationStats } from './types';
import { withLoading } from '../../components';
import { styles } from './styles';
import { withStyles, ListItemText, List, ListItem, Divider, Chip } from '@material-ui/core';
import Textsms from '@material-ui/icons/Textsms';
import Face from '@material-ui/icons/Face';
import CameraAlt from '@material-ui/icons/CameraAlt';
import GridOn from '@material-ui/icons/GridOn';
import School from '@material-ui/icons/School';

interface Props {
  classes: any;
  identityStats: IdentityStats;
  webApiStats: WebApiStats;
  reportStats: ReportStats;
  notificationStats: NotificationStats;
}

/* eslint-disable react/display-name */
const component = (props: Props) => {
  return (
    <div>
      <Chip color="secondary" className={props.classes.title} icon={<Textsms />} label={'SMS'} />
      <div className={props.classes.list}>
        <List>
          <ListItem>
            <ListItemText
              primary="Kullanici Tarafindan Gun Icinde Iletilen Sms Sayisi"
              secondary={`${_.get(props, 'notificationStats.totalUserSmsCountInDay')} ( Kontor Olarak : ${_.get(
                props,
                'notificationStats.totalSmsCredit',
              )} ) `}
            />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemText
              primary="Sistem(Otomatik) Tarafindan Gun Icinde Iletilen SMS Sayisi"
              secondary={_.get(props, 'notificationStats.TotalSystemSmsCountInDay')}
            />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemText
              primary="Gun Icinde Gonderilen Basarili SMS Sayisi"
              secondary={_.get(props, 'notificationStats.totalSuccessfulSmsCountInDay')}
            />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemText
              primary="Gun Icinde Hata Alinan SMS Sayisi"
              secondary={_.get(props, 'notificationStats.totalFailedSmsCountInDay')}
            />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemText
              primary="En Uzun SMS Gonderim Suresi"
              secondary={`${_.get(props, 'notificationStats.longestSmsDuration')} milisaniye`}
            />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemText
              primary="Ortalama SMS Gonderim Suresi"
              secondary={`${_.get(props, 'notificationStats.averageSmsDuration')} milisaniye`}
            />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemText
              primary="Toplam Gonderilen SMS Sayisi (Agustos 2017'den itibaren)"
              secondary={_.get(props, 'notificationStats.totalSmsCountAll')}
            />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemText
              primary="Toplam Kullanici Tarafindan Tuketilen Sms Kontor Sayisi (Agustos 2017'den itibaren)"
              secondary={_.get(props, 'notificationStats.totalSmsCreditsAll')}
            />
          </ListItem>
          <Divider component="li" />
        </List>
      </div>
      <Chip color="secondary" className={props.classes.title} icon={<Face />} label={'KULLANICILAR'} />
      <div className={props.classes.list}>
        <List>
          <ListItem>
            <ListItemText
              primary="Gun icinde oturum acan kisi sayisi"
              secondary={_.get(props, 'identityStats.totalIndividualLoginCountInDay')}
            />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemText
              primary="Lisans suresi bugun biten kullanicilar"
              secondary={_.get(props, 'identityStats.expiredUsersToday')}
            />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemText
              primary="Aktif Kullanici Sayisi"
              secondary={_.get(props, 'identityStats.totalActiveUserCount')}
            />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemText primary="Toplam Kullanici Sayisi" secondary={_.get(props, 'identityStats.totalUserCount')} />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemText
              primary="Bugun Onaylanan Yeni Kullanici Sayisi"
              secondary={_.get(props, 'identityStats.newUserActivatedCountToday')}
            />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemText
              primary="Bugun Lisans Uzatan Yeni Kullanici Sayisi"
              secondary={_.get(props, 'identityStats.subscriptionExtendedCountToday')}
            />
          </ListItem>
          <Divider component="li" />
        </List>
      </div>
      <Chip color="secondary" className={props.classes.title} icon={<CameraAlt />} label={'OPTIK OKUMA'} />
      <div className={props.classes.list}>
        <List>
          <ListItem>
            <ListItemText
              primary="Bugun/Toplam Okutulan Ogrenci Optik Form Sayisi"
              secondary={`${_.get(props, 'webApiStats.todayScannedStudentFormCount')} / ${_.get(
                props,
                'webApiStats.totalScannedStudentFormCount',
              )} `}
            />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemText
              primary="Bugun/Toplam Kameradan Okutulan Ogrenci Optik Form Sayisi"
              secondary={`${_.get(props, 'webApiStats.todayScannedStudentFormCountByCamera')} / ${_.get(
                props,
                'webApiStats.totalScannedStudentFormCountByCamera',
              )} `}
            />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemText
              primary="Bugun/Toplam Dosyadan Okutulan Ogrenci Optik Form Sayisi"
              secondary={`${_.get(props, 'webApiStats.todayScannedStudentFormCountByFile')} / ${_.get(
                props,
                'webApiStats.totalScannedStudentFormCountByFile',
              )} `}
            />
          </ListItem>
          <Divider component="li" />
        </List>
      </div>
      <Chip color="secondary" className={props.classes.title} icon={<GridOn />} label={'RAPORLAR'} />
      <div className={props.classes.list}>
        <List>
          <ListItem>
            <ListItemText
              primary="Bugun/Toplam Alinan Rapor Sayisi"
              secondary={`${_.get(props, 'reportStats.todayCount')} / ${_.get(props, 'reportStats.totalCount')} `}
            />
          </ListItem>
          <Divider component="li" />
        </List>
      </div>
      <Chip color="secondary" className={props.classes.title} icon={<School />} label={'TANIM'} />
      <div className={props.classes.list}>
        <List>
          <ListItem>
            <ListItemText
              primary="Bugun/Toplam Sinav Tanim Sayisi"
              secondary={`${_.get(props, 'webApiStats.todayExamCount')} / ${_.get(
                props,
                'webApiStats.totalExamCount',
              )} `}
            />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemText
              primary="Bugun/Toplam Girilen Ogrenci Sayisi"
              secondary={`${_.get(props, 'webApiStats.todayStudentCount')} / ${_.get(
                props,
                'webApiStats.totalStudentCount',
              )} `}
            />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemText
              primary="E-Okul'dan Aktarilan Bugun/Toplam Ogrenci Sayisi"
              secondary={`${_.get(props, 'webApiStats.todayESchoolStudentCount')} / ${_.get(
                props,
                'webApiStats.totalESchoolStudentCount',
              )} `}
            />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemText
              primary="Seri Ogrenci Girisinden Girilen  Bugun/Toplam Ogrenci Sayisi"
              secondary={`${_.get(props, 'webApiStats.todayBulkStudentCount')} / ${_.get(
                props,
                'webApiStats.totalBulkStudentCount',
              )} `}
            />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemText
              primary="Tek tek Girilen Bugun/Toplam Ogrenci Sayisi"
              secondary={`${_.get(props, 'webApiStats.todaySingleEntryStudentCount')} / ${_.get(
                props,
                'webApiStats.totalSingleEntryStudentCount',
              )} `}
            />
          </ListItem>
          <Divider component="li" />
        </List>
      </div>
    </div>
  );
};

export default withStyles(styles as any, { withTheme: true })(withLoading(component) as any);
