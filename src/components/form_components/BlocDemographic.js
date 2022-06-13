import React from "react";

function BlocDemographic({ formDatas, handleChange }) {
  return (
    <>
      <div>
        <label htmlFor="demographics.address">
          Please enter the farm address (street, city)
        </label>
        <input
          type="text"
          name="demographics.address"
          value={formDatas.demographics.address}
          onChange={(event) => handleChange({ event: event, state: true })}
        />
      </div>
      <div>
        <label htmlFor="demographics.zip_code">Please enter the zip code</label>
        <input
          type="text"
          name="demographics.zip_code"
          value={formDatas.demographics.zip_code}
          onChange={(event) => handleChange({ event: event, state: true })}
        />
      </div>
      <div>
        <label htmlFor="demographics.state">
          What is the state ? (2 letters code and capital letters)
        </label>
        <input
          type="text"
          name="demographics.state"
          value={formDatas.demographics.state}
          onChange={(event) => handleChange({ event: event, state: true })}
        />
      </div>
      <div>
        Enter your contact information:
        <div>
          <label htmlFor="demographics.contact_info_website">Website</label>
          <input
            type="text"
            name="demographics.contact_info_website"
            value={formDatas.demographics.contact_info_website}
            onChange={(event) => handleChange({ event: event, state: true })}
          />
        </div>
        <div>
          <label htmlFor="demographics.contact_info_email">Email</label>
          <input
            type="text"
            name="demographics.contact_info_website"
            value={formDatas.demographics.contact_info_website}
            onChange={(event) => handleChange({ event: event, state: true })}
          />
        </div>
        <div>
          <label htmlFor="demographics.contact_info_phone">Phone</label>
          <input
            type="text"
            name="demographics.contact_info_phone"
            value={formDatas.demographics.contact_info_phone}
            onChange={(event) => handleChange({ event: event, state: true })}
          />
        </div>
      </div>
    </>
  );
}

export default BlocDemographic;
