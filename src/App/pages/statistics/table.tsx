import { get } from 'testokur-utils';
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
const table = (props: Props) => {
  const totalStudentCount: number =
    get(props, 'webApiStats.totalESchoolStudentCount', 0) +
    get(props, 'webApiStats.totalBulkStudentCount', 0) +
    get(props, 'webApiStats.totalSingleEntryStudentCount', 0);
  const todayStudentCount: number =
    get(props, 'webApiStats.todayESchoolStudentCount', 0) +
    get(props, 'webApiStats.todayBulkStudentCount', 0) +
    get(props, 'webApiStats.todaySingleEntryStudentCount', 0);

  const todayScannedStudentFormCount: number =
    get(props, 'webApiStats.todayScannedStudentFormCountByCamera', 0) +
    get(props, 'webApiStats.todayScannedStudentFormCountByFile', 0);
  const totalScannedStudentFormCount: number =
    get(props, 'webApiStats.totalScannedStudentFormCountByCamera', 0) +
    get(props, 'webApiStats.totalScannedStudentFormCountByFile', 0);

  return (
    <div>
      <Chip color="secondary" className={props.classes.title} icon={<Textsms />} label={'SMS'} />
      <div className={props.classes.list}>
        <List>
          <ListItem>
            <ListItemText
              primary="Kullanici Tarafindan Gun Icinde Iletilen Sms Sayisi"
              secondary={`${get(props, 'notificationStats.totalUserSmsCountInDay')} ( Kontor Olarak : ${get(
                props,
                'notificationStats.totalSmsCredit',
              )} ) `}
            />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemText
              primary="Sistem(Otomatik) Tarafindan Gun Icinde Iletilen SMS Sayisi"
              secondary={get(props, 'notificationStats.totalSystemSmsCountInDay')}
            />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemText
              primary="Gun Icinde Gonderilen Basarili SMS Sayisi"
              secondary={get(props, 'notificationStats.totalSuccessfulSmsCountInDay')}
            />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemText
              primary="Gun Icinde Hata Alinan SMS Sayisi"
              secondary={get(props, 'notificationStats.totalFailedSmsCountInDay')}
            />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemText
              primary="En Uzun SMS Gonderim Suresi"
              secondary={`${get(props, 'notificationStats.longestSmsDuration')} milisaniye`}
            />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemText
              primary="Ortalama SMS Gonderim Suresi"
              secondary={`${get(props, 'notificationStats.averageSmsDuration')} milisaniye`}
            />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemText
              primary="Gun icinde en fazla kontor harcayan kullanici ( harcadigi kontor) "
              secondary={`${get(props, 'notificationStats.topSmsSenderEmailInDay')} (${get(
                props,
                'notificationStats.topSmsSenderCreditInDay',
              )})`}
            />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemText
              primary="Toplam Gonderilen SMS Sayisi (Agustos 2017'den itibaren)"
              secondary={get(props, 'notificationStats.totalSmsCountAll')}
            />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemText
              primary="Toplam Kullanici Tarafindan Tuketilen Sms Kontor Sayisi (Agustos 2017'den itibaren)"
              secondary={get(props, 'notificationStats.totalSmsCreditsAll')}
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
              secondary={get(props, 'identityStats.totalIndividualLoginCountInDay')}
            />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemText
              primary="Lisans suresi bugun biten kullanicilar"
              secondary={get(props, 'identityStats.expiredUsersToday')}
            />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemText
              primary="Aktif Kullanici Sayisi"
              secondary={get(props, 'identityStats.totalActiveUserCount')}
            />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemText primary="Toplam Kullanici Sayisi" secondary={get(props, 'identityStats.totalUserCount')} />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemText
              primary="Bugun Onaylanan Yeni Kullanici Sayisi"
              secondary={get(props, 'identityStats.newUserActivatedCountToday')}
            />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemText
              primary="Bugun Lisans Uzatan Yeni Kullanici Sayisi"
              secondary={get(props, 'identityStats.subscriptionExtendedCountToday')}
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
              secondary={`${todayScannedStudentFormCount} / ${totalScannedStudentFormCount}`}
            />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemText
              primary="Bugun/Toplam Kameradan Okutulan Ogrenci Optik Form Sayisi"
              secondary={`${get(props, 'webApiStats.todayScannedStudentFormCountByCamera')} / ${get(
                props,
                'webApiStats.totalScannedStudentFormCountByCamera',
              )} `}
            />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemText
              primary="Bugun/Toplam Dosyadan Okutulan Ogrenci Optik Form Sayisi"
              secondary={`${get(props, 'webApiStats.todayScannedStudentFormCountByFile')} / ${get(
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
              secondary={`${get(props, 'reportStats.todayCount')} / ${get(props, 'reportStats.totalCount')} `}
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
              secondary={`${get(props, 'webApiStats.todayExamCount')} / ${get(props, 'webApiStats.totalExamCount')} `}
            />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemText
              primary="Bugun/Toplam Girilen Ogrenci Sayisi"
              secondary={`${todayStudentCount} / ${totalStudentCount} `}
            />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemText
              primary="E-Okul'dan Aktarilan Bugun/Toplam Ogrenci Sayisi"
              secondary={`${get(props, 'webApiStats.todayESchoolStudentCount')} / ${get(
                props,
                'webApiStats.totalESchoolStudentCount',
              )} `}
            />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemText
              primary="Seri Ogrenci Girisinden Girilen  Bugun/Toplam Ogrenci Sayisi"
              secondary={`${get(props, 'webApiStats.todayBulkStudentCount')} / ${get(
                props,
                'webApiStats.totalBulkStudentCount',
              )} `}
            />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemText
              primary="Tek tek Girilen Bugun/Toplam Ogrenci Sayisi"
              secondary={`${get(props, 'webApiStats.todaySingleEntryStudentCount')} / ${get(
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

export default withStyles(styles as any, { withTheme: true })(withLoading(table) as any);
