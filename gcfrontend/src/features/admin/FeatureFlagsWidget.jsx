/**
 * FeatureFlagsWidget.jsx
 * features\admin\FeatureFlagsWidget.jsx
 */
import React, { useState, useEffect } from "react";
import {
  fetchFeatureFlags,
  updateFeatureFlagEnabledStatus,
  deleteFeatureFlag,
} from "../../services/FeatureFlagService";
import ToggleSwitch from "../../components/common/input/toggle/ToggleSwitch";
import "./FeatureFlagsWidget.scss";

const FeatureFlagsWidget = () => {
  const [flags, setFlags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeatureFlags();
  }, []);

  const loadFeatureFlags = async () => {
    try {
      const data = await fetchFeatureFlags();
      setFlags(data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch feature flags:", error);
      setLoading(false);
    }
  };

  const handleToggle = async (id, isEnabled) => {
    try {
      console.log("Toggling feature flag:", id, { is_enabled: !isEnabled });
      const updatedFlag = await updateFeatureFlagEnabledStatus(id, !isEnabled);
      console.log("Updated feature flag response:", updatedFlag);
      // Update the flag state based on successful backend confirmation
      setFlags(flags.map((flag) => 
        flag.id === id ? { ...flag, ...updatedFlag } : flag
      ));
    } catch (error) {
      console.error("Failed to toggle feature flag:", error);
      // If toggle fails, revert the UI toggle to reflect actual state
      setFlags(flags.map((flag) =>
        flag.id === id ? { ...flag, is_enabled: isEnabled } : flag
      ));
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteFeatureFlag(id);
      setFlags(flags.filter((flag) => flag.id !== id)); // Update the UI optimistically
    } catch (error) {
      console.error("Failed to delete feature flag:", error);
      // If delete fails, consider re-fetching the flags or notify the user
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="feature-flags-widget">
      <h2>Feature Flags</h2>
      {flags.map((flag) => (
        <div key={flag.id} className="flag">
          <span>{flag.feature_name}</span>
          <span>{flag.description}</span>
          <span>Created By: {flag.created_by || "Unknown"}</span>
          <ToggleSwitch
            id={`toggle-${flag.id}`}
            checked={flag.is_enabled}
            onChange={() => handleToggle(flag.id, flag.is_enabled)}
          />
          <button onClick={() => handleDelete(flag.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default FeatureFlagsWidget;