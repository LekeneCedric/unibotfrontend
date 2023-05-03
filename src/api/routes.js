const ROUTES = {
  V1:{
    AUTH:{
      LOGIN:'v1/public/user/login',
      REGISTER:'v1/public/user/register'
    },
    USER:{
      GET:'v1/user',
      UPDATE:'v1/user/update',
      LOGOUT:'v1/user/logout',
      PIECE:{
        GET:'v1/user/piece',
        ADD:'v1/user/piece/add',
        DELETE:'v1/user/piece'
      },
      REQUEST: {
        DEMANDESRELEVENOTE:{
          GET:'v1/user/request/demandeReleveNote',
          ADD:'v1/user/request/demandeReleveNote/add',
          GETONE:'v1/user/request/demandeReleveNote/one',
          REMOVE:'v1/user/request/demandeReleveNote/remove',
          DOWNLOAD:'v1/user/request/demandeReleveNote/download/req'
        }
      }
    }
  }

};
export default ROUTES;
