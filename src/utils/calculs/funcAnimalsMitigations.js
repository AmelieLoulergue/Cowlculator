import * as funcMitigations from "./mitigationsAnimal/index";
import { getCattleDairy, getCattleBeef } from "./getCattleAnimals";
const funcAnimalsMitigations = ({ datasForm, animalsEF }) => {
  const cattleDairy = getCattleDairy({ datasForm });
  const cattleBeef = getCattleBeef({ datasForm });
  const mitigationEFImpFeedDairy = funcMitigations.funcMitigationsImpFeedDairy({
    datasForm: datasForm,
    EFDairy: animalsEF?.EFDairy,
    cattleDairy,
  });
  const mitigationEFAdditiveDairy =
    funcMitigations.funcMitigationsAdditiveDairy({
      datasForm: datasForm,
      EFDairy: animalsEF?.EFDairy,
      cattleDairy,
    });
  const mitigationEFLTBreedingDairy =
    funcMitigations.funcMitigationsLTBreedingDairy({
      datasForm: datasForm,
      EFDairy: animalsEF?.EFDairy,
      cattleDairy,
    });
  const mitigationEFImpFeedBeef = funcMitigations.funcMitigationsImpFeedBeef({
    datasForm: datasForm,
    EFBeef: animalsEF?.EFBeef,
    cattleBeef,
  });

  const mitigationEFAdditiveBeef = funcMitigations.funcMitigationsAdditiveBeef({
    datasForm: datasForm,
    EFBeef: animalsEF?.EFBeef,
    cattleBeef,
  });
  const mitigationEFLTBreedingBeef =
    funcMitigations.funcMitigationsLTBreedingBeef({
      datasForm: datasForm,
      EFBeef: animalsEF?.EFBeef,
      cattleBeef,
    });
  const mitigationEFImpFeedSheep = funcMitigations.funcMitigationsImpFeedSheep({
    datasForm: datasForm,
    EFSheep: animalsEF?.EFSheep,
  });
  const mitigationEFAdditiveSheep =
    funcMitigations.funcMitigationsAdditiveSheep({
      datasForm: datasForm,
      EFSheep: animalsEF?.EFSheep,
    });

  const mitigationEFLTBreedingSheep =
    funcMitigations.funcMitigationsLTBreedingSheep({
      datasForm: datasForm,
      EFSheep: animalsEF?.EFSheep,
    });
  return (
    mitigationEFAdditiveBeef +
    mitigationEFAdditiveDairy +
    mitigationEFAdditiveSheep +
    mitigationEFImpFeedBeef +
    mitigationEFImpFeedDairy +
    mitigationEFImpFeedSheep +
    mitigationEFLTBreedingBeef +
    mitigationEFLTBreedingDairy +
    mitigationEFLTBreedingSheep
  );
};

export default funcAnimalsMitigations;
